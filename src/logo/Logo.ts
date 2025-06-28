import { readFileSync } from 'fs';
import type { Project } from 'projen';
import { logoToPngTask } from './private.ts/logo-task';
import { SvgFile } from './SvgFile';

/**
 * Provide additional configuration for the logo.
 */
export interface LogoConfig {
  /**
   * The width of the logo in px.
   */
  readonly width: number;
  /**
   * The height of the logo in px.
   */
  readonly height: number;
  /**
   * Scale the logo by a factor.
   * @default 1
   */
  readonly scale?: number;
}

/**
 * All required information to represent a logo.
 */
export interface LogoInfo extends LogoConfig {
  /**
   * The SVG content of the logo as a string.
   **/
  readonly content: string;
}

/**
 * Options to create a logo from an SVG string.
 */
export interface LogoFromContentOptions extends LogoConfig {
  /**
   * The path where the logo file will be created.
   */
  readonly outFile?: string;
}

/**
 * Options to create a logo from an SVG string.
 */
export interface LogoForProjenOptions {
  /**
   * The path where the logo file will be created.
   */
  readonly outFile?: string;
  /**
   * The hex code for the color of the parcel outline.
   * @default "#66200b"
   */
  readonly outlineColor?: string;
  /**
   * The hex code for the color of the packaging tape.
   * @default "#cbdada"
   */
  readonly tapeColor?: string;
  /**
   * The hex code for the color of the front of the box.
   * @default "#fa983c"
   */
  readonly frontColor?: string;
  /**
   * The hex code for the color of the top of the box.
   * @default "#fcc161"
   */
  readonly topColor?: string;
  /**
   * The icon in front of the parcel box.
   * @default - no icon
   */
  readonly icon?: string;
  /**
   * SVG transform for the icon.
   * Likely needed to position the icon correctly.
   */
  readonly iconTransform?: string;
}

interface LogoFromOptions extends LogoConfig {
  readonly sourceFile?: string;
  readonly outFile?: string;
}

/**
 * Implementation interface of a logo
 */
export interface ILogo {
  /**
   * The width of the logo in px.
   */
  readonly width: number;
  /**
   * The height of the logo in px.
   */
  readonly height: number;
  /**
   * Scale the logo by a factor.
   * @default 1
   */
  readonly scale?: number;
  /**
   * The SVG content of the logo as a string.
   **/
  readonly content: string;
  /**
   * Synth the logo.
   */
  synth(project: Project): void;
}

/**
 * Create a logo for the project.
 */
export class Logo implements ILogo {
  /**
   * Use an existing logo from a file.
   */
  public static fromFile(path: string, options: LogoConfig) {
    const content = readFileSync(path).toString().trim();
    return new Logo(content, {
      ...options,
      sourceFile: path,
    });
  }

  /**
   * Create the logo from this svg snippet.
   * Content should NOT include the outermost <svg> tag.
   */
  public static fromContent(content: string, options: LogoFromContentOptions) {
    return new Logo(content, {
      outFile: 'images/logo.svg',
      ...options,
    });
  }

  /**
   * An empty placeholder logo.
   * Can be used the get started before a logo is created.
   */
  public static placeholder(path: string = 'images/logo.svg') {
    const content = `<rect fill="#AAAAAA" width="80" height="80" />
    <line x1="0" x2="80" y1="0" y2="80" stroke="red" stroke-width="2" />
    <line x1="80" x2="0" y1="0" y2="80" stroke="red" stroke-width="2" />`;

    return new Logo(content, {
      outFile: path,
      width: 80,
      height: 80,
    });
  }

  /**
   * A logo for projen related projects.
   */
  public static forProjen(path: string = 'images/logo.svg', options: LogoForProjenOptions = {}) {
    const {
      topColor = '#fcc161',
      frontColor = '#fa983c',
      tapeColor = '#cbdada',
      outlineColor = '#66200b',
      icon,
      iconTransform,
    } = options;

    const iconGroupTransform = iconTransform ? ` transform="${iconTransform}"` : '';
    const iconGroup = icon ? `<g id="icon"${iconGroupTransform}>${icon}</g>` : '';

    const content = `<g transform="translate(4 19)" shape-rendering="crispEdges">
    <!-- fill -->
    <path d="m 0,0 l 10,-15.6 h 60 l 10,15.6 z" fill="${topColor}" />
    <path d="m 0,0 h 80 v 65 h -80 z" fill="${frontColor}" />

    <!-- lines -->
    <g stroke-width="2.5" stroke="${outlineColor}">
        <!-- outline -->
        <path d="m 0,0 l 10,-15.6 h 60 l 10,15.6 v 65 h -80 z" fill-opacity="0" />

        <!-- tape -->
        <path d="m 30,0 v 12 l 5,-3 5,3 5,-3 5,3 v -12 l -4.5,-15.6 -11,0 z" fill="${tapeColor}" stroke-linejoin="bevel" />

        <!-- front line -->
        <line x1="0" x2="80" y1="0" y2="0" />
    </g>

    <!-- Custom Icon -->
    ${iconGroup}
</g>`;

    return new Logo(content, {
      outFile: path,
      width: 88,
      height: 88,
    });
  }

  public readonly width: number;
  public readonly height: number;
  public readonly scale?: number;
  public readonly content: string;

  private readonly outFile?: string;
  private readonly sourceFile?: string;

  private constructor(content: string, options: LogoFromOptions) {
    this.content = content;
    this.width = options.width;
    this.height = options.height;
    this.scale= options.scale;

    this.sourceFile = options.sourceFile;
    this.outFile = options.outFile;
  }

  public synth(project: Project) {
    if (this.sourceFile) {
      project.addPackageIgnore(this.sourceFile);
    }
    if (this.outFile) {
      project.addPackageIgnore(this.outFile);
    }

    if (!this.outFile) {
      logoToPngTask(project, this.sourceFile!);
      return;
    }

    const svg = new SvgFile(project, this.outFile, this);
    logoToPngTask(project, svg.filePath);
  }
}
