import type { Project } from 'projen';
import type { SvgFile } from '../logo';
import { Wordmark } from '../logo';
import type { ProjenProjectOptions } from '../projen-project-options';
import type { FeatureMiddleware, Mutable } from '../utils';

export interface ProjectTrait {
  readonly logo?: SvgFile;
  readonly wordmark?: Wordmark;
}

export const featureMiddleware: FeatureMiddleware<Project & Mutable<ProjectTrait>> = (project, options: Pick<ProjenProjectOptions, 'logo' | 'wordmarkOptions'>) => {
  if (options.logo) {
    options.logo.synth(project);
    project.wordmark = new Wordmark(project, {
      logo: options.logo,
      ...options.wordmarkOptions,
    });
  }

  return project;
};
