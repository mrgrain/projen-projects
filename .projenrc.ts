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

  // Marketing
  logoOptions: {
    wordmark: {
      text: 'Mr. PJ',
      textPosition: {
        dx: 30,
        dy: 20,
      },
      size: {
        height: 180,
        width: 500,
      },
    },
    logo: {
      height: 88,
      width: 88,
    },
  },
});

new ConstructProjectOptionsBuilder(project);
new ProjenProjectOptionsBuilder(project);
new TypeScriptProjectOptionsBuilder(project);

project.synth();
