import { Project, javascript } from 'projen';
import { TypeScriptProjectOptions } from '../typescript-project-options';
import { FeatureMiddleware, OptionsMiddleware, deepMerge } from '../utils';

export interface DependenciesOptionsTrait {
  readonly upgradesSchedule?: TypeScriptProjectOptions['upgradesSchedule'];
}

export const optionsMiddleware: OptionsMiddleware<DependenciesOptionsTrait> = (options) => deepMerge({
  devDeps: ['@mrgrain/jsii-struct-builder', '@jsii/spec', 'mrpj'],
  peerDeps: ['projen'],
  depsUpgradeOptions: {
    workflowOptions: {
      schedule: options.upgradesSchedule ?? javascript.UpgradeDependenciesSchedule.WEEKLY,
    },
  },
}, options);

export const preventSelfDependency: FeatureMiddleware<Project> = (project) => {
  project.deps.removeDependency(project.name);

  return project;
};
