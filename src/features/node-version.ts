import type { Project } from 'projen';
import { TextFile } from 'projen';
import { jsonResource } from '../util/resources';
import type { FeatureMiddleware } from '../utils';

export interface ProjectTrait {
  readonly minNodeVersion?: string;
}

export interface NodeVersionSpec {
  readonly major: string;
  readonly version: string;
  readonly stable?: boolean;
  readonly lts?: string;
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

export const featureMiddleware: FeatureMiddleware<Project & ProjectTrait> = (project, options) => {
  const versionSpec = options.workflowNodeVersion ?? project.minNodeVersion ?? 'lts/*';
  const version = isAlias(versionSpec) ? convertAliasToVersion(versionSpec) : versionSpec;

  const lines = [`v${version}`, ''];

  new TextFile(project, '.nvmrc', { lines });
  project.addPackageIgnore('.nvmrc');
  new TextFile(project, '.node-version', { lines });
  project.addPackageIgnore('.node-version');

  return project;
};
