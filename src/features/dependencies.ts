import type { Project } from 'projen';
import { DependencyType, javascript } from 'projen';
import type { TypeScriptProjectOptions } from '../typescript-project-options';
import type { FeatureMiddleware, OptionsMiddleware } from '../utils';
import { deepMerge } from '../utils';

export interface UpgradeDependenciesTrait {
  readonly upgradesSchedule?: TypeScriptProjectOptions['upgradesSchedule'];
}

export interface DependenciesTrait extends Pick<TypeScriptProjectOptions, 'deps' | 'devDeps' | 'peerDeps' | 'peerDependencyOptions'> {
  projenVersion?: string;
}

export function makeMiddleware({
  deps = [],
  devDeps = [],
  peerDeps = [],
  projenVersion,
  peerDependencyOptions = {},
}: DependenciesTrait = {}): OptionsMiddleware<UpgradeDependenciesTrait> {
  const projenDep = projenVersion ? [`projen@${projenVersion}`] : [];

  return (options) => deepMerge({
    deps: [...deps],
    devDeps: ['mrpj', ...devDeps],
    peerDeps: [...projenDep, ...peerDeps],
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
    peerDependencyOptions: {
      ...peerDependencyOptions,
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
