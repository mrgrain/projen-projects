import type { IConstruct } from 'constructs';
import { Component, TextFile } from 'projen';
import type { NodeVersionSpec } from './private';
import { jsonResource } from '../util/resources';

export interface NodeVersionOptions {
  /**
   * The node version to use.
   * Supports aliases like `lts/*`, `lts/-1`, `current`, `latest`.
   * @default 'lts/*'
   */
  readonly versionSpec?: string;
  /**
   * Create a .nvmrc file.
   * @default true
   */
  readonly dotNvmrc?: boolean;
  /**
   * Create a .node-version file.
   * @default true
   */
  readonly dotNodeVersion?: boolean;
}

/**
 * A component that manages Node.js version files (.nvmrc, .node-version).
 */
export class NodeVersion extends Component {

  /**
   * Converts a version spec to a concrete version number.
   * Supports aliases like `lts/*`, `lts/-1`, `lts/iron`, `current`, `latest`, `node`.
   * @param versionSpec The version spec or alias to convert
   * @returns The resolved major version number
   */
  public static specToVersion(versionSpec: string): string {
    return isAlias(versionSpec) ? convertAliasToVersion(versionSpec) : versionSpec;
  }

  /**
   * The resolved Node.js major version
   * */
  public readonly version: string;

  public constructor(scope: IConstruct, options: NodeVersionOptions = {}) {
    super(scope);

    const versionSpec = options.versionSpec ?? 'lts/*';
    this.version = NodeVersion.specToVersion(versionSpec);

    const lines = [`v${this.version}`, ''];

    if (options.dotNvmrc ?? true) {
      new TextFile(this.project, '.nvmrc', { lines });
      this.project.addPackageIgnore('.nvmrc');
    }
    if (options.dotNodeVersion ?? true) {
      new TextFile(this.project, '.node-version', { lines });
      this.project.addPackageIgnore('.node-version');
    }
  }
}


function isAlias(versionSpec: string): boolean {
  return versionSpec.startsWith('lts/') || ['current', 'latest', 'node'].includes(versionSpec);
}

function getVersionFromAlias(versionSpec: string): string | undefined {
  const allVersions = jsonResource<NodeVersionSpec[]>('node-versions.json');

  if (['current', 'latest', 'node'].includes(versionSpec)) {
    return allVersions[allVersions.length -1]?.major;
  }

  const ltsVersions: Record<string, NodeVersionSpec> = Object.fromEntries(allVersions
    .filter(x => x.lts && x.stable === true)
    .map(x => [x.lts!.toLowerCase(), x]));

  const alias = versionSpec.split('lts/')[1]?.toLowerCase();

  const byMajor = Object.values(ltsVersions);
  if (alias === '*') {
    return byMajor[byMajor.length -1]?.major;
  }

  const n = Number(alias);
  if (n < 0) {
    return byMajor[byMajor.length -1 + n]?.major;
  }

  return ltsVersions[alias]?.major;
}

function convertAliasToVersion(versionSpec: string): string {
  const version = getVersionFromAlias(versionSpec);
  if (!version) {
    throw new Error(`Could not find Node.js version for alias: ${versionSpec}`);
  }

  return version;
}
