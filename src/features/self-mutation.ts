import type { Project, javascript } from 'projen';
import { SelfMutationOnForks } from '../components';
import type { FeatureMiddleware } from '../utils';

export interface BuildWorkflowOptions {
  readonly buildWorkflowOptions?: javascript.NodeProjectOptions['buildWorkflowOptions'];
  readonly automationEnvironment?: string;
}

export const featureMiddleware: FeatureMiddleware<Project, BuildWorkflowOptions> = (project, options) => {
  if (options.buildWorkflowOptions?.mutableBuild ?? true) {
    new SelfMutationOnForks(project, {
      environment: options.automationEnvironment,
    });
  }

  return project;
};
