import { ReleasableCommits, javascript } from 'projen';
import type { TypeScriptProjectOptions } from '../typescript-project-options';
import type { OptionsMiddleware } from '../utils';
import { deepMerge, noEmpties } from '../utils';

export interface ReleaseOptionsTrait {
  readonly projenrcTsOptions?: TypeScriptProjectOptions['projenrcTsOptions'];
  readonly releasableCommitTypes?: string[];
}

export const optionsMiddleware: OptionsMiddleware<ReleaseOptionsTrait> = (options) => deepMerge({
  release: false,
  defaultReleaseBranch: 'main',
  releaseToNpm: true,
  npmAccess: javascript.NpmAccess.PUBLIC,
  npmignore: noEmpties([
    options.projenrcTsOptions?.filename ?? '.projenrc.ts',
    options.projenrcTsOptions?.projenCodeDir ?? 'projenrc',
    '.gitattributes',
  ]),
  releasableCommits: ReleasableCommits.ofType((options.releasableCommitTypes ?? RELEASABLE_COMMIT_TYPES_DEFAULT).sort(), '.'),
}, options);

export const RELEASABLE_COMMIT_TYPES_DEFAULT = ['feat', 'fix', 'chore', 'revert'];
