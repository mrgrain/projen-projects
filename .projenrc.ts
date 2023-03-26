import { javascript } from 'projen';
import { ConstructProjectOptionsBuilder, ProjenProjectOptionsBuilder, TypeScriptProjectOptionsBuilder } from './projenrc/option-builders';
import { ProjenProject } from './src';

const project = new ProjenProject({
  // Repo info
  repo: 'mrgrain/projen-projects',
  name: 'mrpj',
  description: 'Opinionated projen project types. Just for me.',
  author: 'Momo Kornher',
  authorAddress: 'https://moritzkornher.de',

  // Release & Automation
  release: true,
  upgradesSchedule: javascript.UpgradeDependenciesSchedule.WEEKLY,
  automationAppName: 'projen-builder',
});

new ConstructProjectOptionsBuilder(project);
new ProjenProjectOptionsBuilder(project);
new TypeScriptProjectOptionsBuilder(project);

project.synth();