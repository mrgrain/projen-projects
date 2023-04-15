import { Project, SourceCode, SourceCodeOptions } from 'projen';

/**
 * Options for SvgFile
 */
export interface SvgFileOptions extends SourceCodeOptions {
  readonly width: number;
  readonly height: number;
  readonly scale?: number;
  readonly style?: string;
  readonly content?: string;
}

/**
 * A SVG file
 */
export class SvgFile extends SourceCode {
  public constructor(project: Project, filePath: string, options: SvgFileOptions) {
    super(project, filePath, {
      indent: 4,
      ...options,
    });

    const { width, height, scale = 1 } = options;

    this.line(`<!-- ${this.marker} -->`);
    this.open(`<svg xmlns="http://www.w3.org/2000/svg" width="${width * scale}" height="${height * scale}" viewBox="0 0 ${width} ${height}">`);
    if (options.style) {
      this.open('<style>');
      this.lines(options.style);
      this.close('</style>');
      this.line();
    }
    this.lines(options.content ?? '');
    this.close('</svg>');
  }

  /**
   * Adds text as lines to the text file.
   * @param lines the text with line breaks to add
   */
  lines(lines: string) {
    for (const line of lines.split('\n')) {
      this.line(line);
    }
  }
}
