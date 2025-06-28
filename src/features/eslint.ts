import type { Project, javascript } from 'projen';
import type { FeatureMiddleware } from '../utils';

export interface ProjectTrait {
  readonly eslint?: javascript.Eslint;
}

export const featureMiddleware: FeatureMiddleware<Project & ProjectTrait> = (project) => {
  project.eslint?.addRules({
    '@stylistic/eol-last': ['error', 'always'],
    '@stylistic/space-in-parens': ['error', 'never'],
    '@typescript-eslint/consistent-type-imports': 'error',
  });

  return project;
};
