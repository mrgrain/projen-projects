import type { Project } from 'projen';
import { NodeVersion } from '../components/NodeVersion';
import type { FeatureMiddleware } from '../utils';

export interface ProjectTrait {
  readonly minNodeVersion?: string;
}

export const featureMiddleware: FeatureMiddleware<Project & ProjectTrait> = (project, options) => {
  const node = new NodeVersion(project, {
    versionSpec: options.workflowNodeVersion ?? project.minNodeVersion,
  });

  if (project.minNodeVersion) {
    // @ts-ignore
    project.minNodeVersion = node.version;
  }

  return project;
};
