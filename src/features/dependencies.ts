import { javascript } from 'projen';
import { TypeScriptProjectOptions } from '../typescript-project-options';
import { OptionsMiddleware, deepMerge } from '../utils';

export interface DependenciesOptionsTrait {
  readonly upgradesSchedule?: TypeScriptProjectOptions['upgradesSchedule'];
}

export const optionsMiddleware: OptionsMiddleware<DependenciesOptionsTrait> = (options) => deepMerge({
  devDeps: ['@mrgrain/jsii-struct-builder', '@jsii/spec'],
  peerDeps: ['projen'],
  depsUpgradeOptions: {
    workflowOptions: {
      schedule: options.upgradesSchedule ?? javascript.UpgradeDependenciesSchedule.WEEKLY,
    },
  },
}, options);
