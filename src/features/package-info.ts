import type { OptionsMiddleware } from '../utils';
import { deepMerge } from '../utils';

export interface RepoInfoTrait {
  readonly repo: string;
}

export function makeMiddleware(license: string = 'MIT'): OptionsMiddleware<RepoInfoTrait> {
  return (options) => {
    const user = githubUser(options);

    return deepMerge({
      name: `@${options.repo}`,
      repositoryUrl: `git@github.com:${options.repo}.git`,
      repository: `git@github.com:${options.repo}.git`,
      homepage: `https://github.com/${options.repo}`,
      authorAddress: `https://github.com/${user}`,
      authorUrl: `https://github.com/${user}`,
      license,
    }, options);
  };
}

export function githubUser(options: RepoInfoTrait): string {
  return options.repo.split('/')[0];
}
