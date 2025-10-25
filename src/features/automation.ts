import type { Project } from 'projen';
import { github, javascript, JsonPatch } from 'projen';
import type { RepoInfoTrait } from './package-info';
import { githubUser } from './package-info';
import { RELEASABLE_COMMIT_TYPES_DEFAULT } from './release';
import type { FeatureMiddleware, OptionsMiddleware } from '../utils';
import { deepMerge, ifSet, noEmpties } from '../utils';

export interface AutomationOptionsTrait extends RepoInfoTrait {
  readonly automationAppName?: string;
  readonly automationEnvironment?: string;
  readonly ownerCanSelfApprovePRs?: boolean;
  readonly allowedCommitTypes?: string[];
  readonly releasableCommitTypes?: string[];
}

export const optionsMiddleware: OptionsMiddleware<AutomationOptionsTrait> = (options) => deepMerge({
  automationEnvironment: options.automationEnvironment ?? 'automation',
  githubOptions: {
    projenCredentials: ifSet(options.automationAppName, github.GithubCredentials.fromApp()),
    pullRequestLintOptions: {
      semanticTitleOptions: {
        types: Array.from(new Set([
          ...options.allowedCommitTypes ?? ALLOWED_COMMIT_TYPES_DEFAULT,
          ...options.releasableCommitTypes ?? RELEASABLE_COMMIT_TYPES_DEFAULT,
        ])).sort(),
      },
    },
  },
  autoApproveUpgrades: true,
  autoApproveOptions: {
    allowedUsernames: noEmpties([
      ifSet(options.automationAppName, `${options.automationAppName}[bot]`),
      ifSet(options.ownerCanSelfApprovePRs ?? true, githubUser(options)),
    ]),
  },
}, options);

export const ALLOWED_COMMIT_TYPES_DEFAULT = ['feat', 'fix', 'chore', 'revert', 'docs', 'ci'];

export const protectAutomationCredentials: FeatureMiddleware<Project, AutomationOptionsTrait> = (project, options) => {
  if (options.automationEnvironment) {
    for (const wf of project.components.filter(c => c instanceof javascript.UpgradeDependencies).flatMap(c => c.workflows)) {
      wf.file?.patch(JsonPatch.add('/jobs/pr/environment', options.automationEnvironment));
    }
  }

  return project;
};
