import { readFileSync } from 'fs';
import { Project } from 'projen';
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
  readonly outfile?: string;
}

interface LogoFromOptions extends LogoConfig {
  readonly sourceFile?: string;
  readonly outFile?: string;
}

/**
 *
 */
export interface ILogo {
  readonly info: LogoInfo;
  render(project: Project): string;
}


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


  public readonly info: LogoInfo;
  private readonly outFile?: string;
  private readonly sourceFile?: string;

  private constructor(content: string, options: LogoFromOptions) {
    this.info = {
      content,
      width: options.width,
      height: options.height,
      scale: options.scale,
    };

    this.sourceFile = options.sourceFile;
    this.outFile = options.outFile;
  }

  public render(project: Project) {
    if (!this.outFile) {
      return this.sourceFile!;
    }

    return new SvgFile(project, this.outFile, this.info).filePath;
  }
}
