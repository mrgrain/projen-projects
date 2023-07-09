import { Project } from 'projen';
import { SvgFile, Wordmark } from '../logo';
import { ProjenProjectOptions } from '../projen-project-options';
import { FeatureMiddleware, Mutable } from '../utils';

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
