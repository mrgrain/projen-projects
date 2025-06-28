import * as path from 'path';
import type { Project } from 'projen';
import { Component } from 'projen';
import type { LogoInfo } from './Logo';
import { Logo } from './Logo';
import { logoToPngTask } from './private.ts/logo-task';
import { SvgFile } from './SvgFile';
import { deepDefaults, deepMerge } from '../utils';

export interface WordmarkOptions {
  readonly fileBaseName?: string;
  readonly dirName?: string;
  readonly raw?: string;
  readonly text?: string;
  readonly textPosition?: TranslateOptions;
  readonly font?: FontOptions;
  readonly colorScheme?: ColorScheme;
  readonly size?: SizeOptions;
  readonly logo?: LogoInfo;
  readonly logoPosition?: TranslateOptions;
  readonly logoScale?: number;
}

export interface ColorScheme {
  readonly dark?: FontOptions;
  readonly light?: FontOptions;
}

export interface FontOptions {
  readonly family?: string;
  readonly size?: number;
  readonly weight?: string;
  readonly color?: string;
};

export interface SizeOptions {
  readonly width?: number;
  readonly height?: number;
  readonly scale?: number;
}

export interface TranslateOptions {
  readonly dx?: number;
  readonly dy?: number;
}

/**
 * @internal
 */
type FullWordmarkOptions = Omit<Required<WordmarkOptions>, 'raw' | 'colorScheme' | 'logoPosition'> & WordmarkOptions & {
  readonly size: Required<SizeOptions>;
  readonly textPosition: Required<TranslateOptions>;
};

export class Wordmark extends Component {
  private readonly options: FullWordmarkOptions;

  public constructor(project: Project, options: WordmarkOptions = {}) {
    super(project);

    this.options = deepDefaults<FullWordmarkOptions>({
      ...options,
      colorScheme: {},
    }, {
      dirName: 'images',
      fileBaseName: 'wordmark',
      text: this.project.name,
      textPosition: {
        dx: 35,
        dy: 0,
      },
      font: {
        family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
        weight: '700',
        size: 90,
        color: '#6F7174',
      },
      logo: Logo.placeholder(),
      logoScale: 2,
      size: {
        width: 720,
        height: 200,
        scale: 1,
      },
    });

    // Default variant
    new WordmarkVariant(project, this.options);

    // Allow colorScheme to be disabled
    const colorScheme = options.colorScheme ?? {
      dark: { color: '#f0f6fc' },
      light: { color: '#191919' },
    };

    // Add variants
    if (colorScheme.dark) {
      this.variant('dark', {
        font: colorScheme.dark,
        colorScheme: {},
      });
    }

    if (colorScheme.light) {
      this.variant('light', {
        font: colorScheme.light,
        colorScheme: {},
      });
    }

    if (colorScheme.dark && colorScheme.light) {
      this.variant('dynamic', {
        colorScheme: {
          dark: colorScheme.dark,
          light: colorScheme.light,
        },
      });
    }
  }

  private variant(name: string, options: WordmarkOptions): WordmarkVariant {
    const variant = {
      ...options,
      fileBaseName: `${this.options.fileBaseName}-${name}`,
    };
    return new WordmarkVariant(this.project, deepMerge(this.options, variant));
  }

}

class WordmarkVariant extends Component {
  public constructor(project: Project, private readonly options: FullWordmarkOptions) {
    super(project);

    const halfHeight = this.options.size.height/2;
    const expectedLogoScale = this.options.size.height/this.options.logo.height;
    const logoScale = this.options.logoScale ?? expectedLogoScale;
    const logoTranslate = {
      x: 0 + (this.options.logoPosition?.dx ?? 0),
      y: this.options.logoPosition?.dy ?? (logoScale/expectedLogoScale * -1 * halfHeight + halfHeight),
    };

    const wordmark = this.options.raw ?? this.wordmark(this.options.text, {
      x: logoScale * this.options.logo.width + this.options.textPosition.dx,
      y: this.options.size.height/2 + this.options.textPosition.dy,
    });

    const indent = 4;
    const content = `
<g transform="translate(${logoTranslate.x} ${logoTranslate.y}) scale(${logoScale})">
${this.options.logo.content.split('\n').map(l => ' '.repeat(indent) + l).join('\n')}
</g>
`;

    // Render Wordmark
    const file = new SvgFile(project, path.join(this.options.dirName, this.options.fileBaseName) + '.svg', {
      ...this.options.size,
      content: content + '\n' + wordmark,
      style: this.style(),
      indent,
    });
    project.addPackageIgnore(file.filePath);

    // Conversion task
    logoToPngTask(project, file.filePath);
  }

  private wordmark(text: string, { x, y }: {
    x: number;
    y: number;
  }): string {
    return `<text x="${x}" y="${y}"><tspan dy="0.5ex">${text}</tspan></text>`;
  }

  private style() {
    const makeCSS = (opt: FontOptions, indent = 0, spaces = 4): string => {
      const outer = ' '.repeat(indent*spaces);
      const inner = ' '.repeat((indent+1)*spaces);

      const css = [outer + 'text {'];
      if (opt.family) {
        css.push(inner + `font-family: ${opt.family};`);
      }
      if (opt.weight) {
        css.push(inner + `font-weight: ${opt.weight};`);
      }
      if (opt.size) {
        css.push(inner + `font-size: ${opt.size}px;`);
      }
      if (opt.color) {
        css.push(inner + `fill: ${opt.color};`);
      }
      css.push(outer + '}');

      return css.join('\n');
    };

    const statements = [makeCSS(this.options.font)];

    if (this.options.colorScheme?.dark) {
      statements.push(`@media (prefers-color-scheme: dark) {\n${makeCSS(this.options.colorScheme?.dark, 1)}\n}`);
    }

    if (this.options.colorScheme?.light) {
      statements.push(`@media (prefers-color-scheme: light) {\n${makeCSS(this.options.colorScheme?.light, 1)}\n}`);
    }

    return statements.join('\n\n');
  }
}
