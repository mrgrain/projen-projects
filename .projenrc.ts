import { cdk } from 'projen';
import { UpgradeDependenciesSchedule } from 'projen/lib/javascript';
const project = new cdk.JsiiProject({
  // Repo info
  name: '@mrgrain/projen-projects',
  description: '',
  author: 'Momo Kornher',
  authorAddress: 'mail@moritzkornher.de',
  repositoryUrl: 'git@github.com:mrgrain/projen-projects.git',
  homepage: 'https://github.com/mrgrain/projen-projects',
  projenrcTs: true,

  // Release & Automation
  defaultReleaseBranch: 'main',
  depsUpgradeOptions: {
    workflowOptions: {
      schedule: UpgradeDependenciesSchedule.WEEKLY,
    },
  },

  // Config
  jsiiVersion: '5.0.x',
  typescriptVersion: '5.0.x',
});

project.synth();