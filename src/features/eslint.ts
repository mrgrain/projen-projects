import { Project, javascript } from 'projen';
import { FeatureMiddleware } from '../utils';

export interface ProjectTrait {
  readonly eslint?: javascript.Eslint;
}

export const featureMiddleware: FeatureMiddleware<Project & ProjectTrait> = (project) => {
  project.eslint?.addRules({
    'eol-last': ['error', 'always'],
    'space-in-parens': ['error', 'never'],
  });

  return project;
};
