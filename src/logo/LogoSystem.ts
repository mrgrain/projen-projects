import { Component, Project, Task } from 'projen';
import { findLogo } from './private.ts/find-logo';
import { SizeOptions, TranslateOptions, Wordmark, WordmarkOptions } from './Wordmark';

export interface LogoOptions extends SizeOptions, TranslateOptions {
  readonly file?: string;
}

export interface LogoSystemOptions {
  readonly dirName?: string;
  readonly logo?: LogoOptions;
  readonly wordmark?: WordmarkOptions;
}

export class LogoSystem extends Component {
  public readonly convertTask?: Task;

  public constructor(project: Project, options: LogoSystemOptions = {}) {
    super(project);

    const { dirName, logo } = findLogo(options);

    this.convertTask = project.addTask('logo', {
      exec: `find ${dirName} -iname "*.svg" | xargs -L1 -I{} sh -c "rsvg-convert -h 1024 {} > ${dirName}/\\$(basename {} .svg).png"`,
    });

    const wordmark = new Wordmark(project, {
      dirName,
      size: options.wordmark?.size,
      text: options.wordmark?.text,
      raw: options.wordmark?.raw,
      font: options.wordmark?.font,
      logo: {
        ...options.logo,
        content: logo,
        translate: {
          dx: options.logo?.dx,
          dy: options.logo?.dy,
        },
      },
    });

    const colorScheme = options.wordmark?.colorScheme;
    if (colorScheme?.dark && colorScheme.light) {
      wordmark.dynamic({
        font: colorScheme?.dark,
      }, {
        font: colorScheme.light,
      });
    } else {
      if (colorScheme?.dark) {
        wordmark.variant('dark', {
          font: colorScheme?.dark,
        });
      }
      if (colorScheme?.light) {
        wordmark.variant('light', {
          font: colorScheme?.light,
        });
      }
    }
  }
}
