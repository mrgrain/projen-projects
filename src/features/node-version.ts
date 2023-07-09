import { Project, TextFile } from 'projen';
import { FeatureMiddleware } from '../utils';

export interface ProjectTrait {
  readonly minNodeVersion?: string;
}

export const featureMiddleware: FeatureMiddleware<Project & ProjectTrait> = (project, options) => {
  const version = options.workflowNodeVersion ?? project.minNodeVersion ?? '18';
  const lines = [`v${version}`, ''];

  new TextFile(project, '.nvmrc', { lines });
  project.addPackageIgnore('.nvmrc');
  new TextFile(project, '.node-version', { lines });
  project.addPackageIgnore('.node-version');

  return project;
};
