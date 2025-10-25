import type { Project } from 'projen';
import { JsonPatch, ReleasableCommits, javascript, github } from 'projen';
import type { TypeScriptProjectOptions } from '../typescript-project-options';
import type { FeatureMiddleware, OptionsMiddleware } from '../utils';
import { deepMerge, noEmpties } from '../utils';

export interface ReleaseOptionsTrait {
  readonly release?: TypeScriptProjectOptions['release'];
  readonly npmTrustedPublishing?: TypeScriptProjectOptions['npmTrustedPublishing'];
  readonly releaseEnvironment?: TypeScriptProjectOptions['releaseEnvironment'];
  readonly projenrcTsOptions?: TypeScriptProjectOptions['projenrcTsOptions'];
  readonly releasableCommitTypes?: string[];
}

export const optionsMiddleware: OptionsMiddleware<ReleaseOptionsTrait> = (options) => deepMerge({
  release: options.release ?? false,
  defaultReleaseBranch: 'main',
  releaseToNpm: options.release ?? false,
  npmTrustedPublishing: options.npmTrustedPublishing ?? true,
  releaseEnvironment: options.releaseEnvironment ?? 'release',
  npmAccess: javascript.NpmAccess.PUBLIC,
  npmignore: noEmpties([
    options.projenrcTsOptions?.filename ?? '.projenrc.ts',
    options.projenrcTsOptions?.projenCodeDir ?? 'projenrc',
    '.gitattributes',
  ]),
  releasableCommits: ReleasableCommits.ofType((options.releasableCommitTypes ?? RELEASABLE_COMMIT_TYPES_DEFAULT).sort(), '.'),
}, options);

export const RELEASABLE_COMMIT_TYPES_DEFAULT = ['feat', 'fix', 'revert'];

export const trustedPublisherFix: FeatureMiddleware<Project, ReleaseOptionsTrait> = (project, options) => {
  if (options.release && options.npmTrustedPublishing) {
    github.GitHub.of(project)?.tryFindWorkflow('release')?.file?.patch(
      JsonPatch.replace('/jobs/release_npm/steps/0/with/node-version', '24.x'),
    );
  }
  return project;
};
