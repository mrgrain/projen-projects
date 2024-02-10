import { DependencyType, Project, javascript } from 'projen';
import { TypeScriptProjectOptions } from '../typescript-project-options';
import { FeatureMiddleware, OptionsMiddleware, deepMerge } from '../utils';

export interface UpgradeDependenciesTrait {
  readonly upgradesSchedule?: TypeScriptProjectOptions['upgradesSchedule'];
}

export type DependenciesTrait = Pick<TypeScriptProjectOptions, 'deps' | 'devDeps' | 'peerDeps'>;

export function makeMiddleware({
  deps = [],
  devDeps = [],
  peerDeps = [],
}: DependenciesTrait = {}): OptionsMiddleware<UpgradeDependenciesTrait> {
  return (options) => deepMerge({
    deps: [...deps],
    devDeps: ['mrpj', ...devDeps],
    peerDeps: ['projen', ...peerDeps],
    depsUpgradeOptions: {
      types: [
        DependencyType.RUNTIME,
        DependencyType.BUILD,
        DependencyType.OPTIONAL,
      ],
      workflowOptions: {
        schedule: options.upgradesSchedule ?? javascript.UpgradeDependenciesSchedule.WEEKLY,
      },
    },
  }, options);
};

export const ensureDependencies: FeatureMiddleware<Project, DependenciesTrait> = (project, options) => {
  const {
    deps = [],
    devDeps = [],
    peerDeps = [],
  } = options;

  const all: Array<[string, DependencyType]> = [
    ...deps.map((name): [string, DependencyType] => [name, DependencyType.RUNTIME]),
    ...devDeps.map((name): [string, DependencyType] => [name, DependencyType.BUILD]),
    ...peerDeps.map((name): [string, DependencyType] => [name, DependencyType.PEER]),
  ];

  for (const [name, type] of all) {
    project.deps.addDependency(name, type);
  }

  return project;
};

export const preventSelfDependency: FeatureMiddleware<Project> = (project) => {
  project.deps.removeDependency(project.name);

  return project;
};
