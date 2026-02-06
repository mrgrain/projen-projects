export interface NodeVersionSpec {
  /** The major version number */
  readonly major: string;
  /** The full version string */
  readonly version: string;
  /** Whether this version is stable */
  readonly stable?: boolean;
  /** The LTS codename, if applicable */
  readonly lts?: string;
}
