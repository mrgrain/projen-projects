import { cdk, github, javascript } from 'projen';
import { ProjenProjectOptions } from './projen-project-options';
import { deepDefaults, ifSet, noEmpties } from './utils';

/**
 * A project to create new projen projects & components
 * @pjid projen
 */
export class ProjenProject extends cdk.JsiiProject {
  public constructor(options: ProjenProjectOptions) {
    const pkgInfo = packageInfo(options.repo);

    super({
      // Improved defaults
      ...deepDefaults<cdk.JsiiProjectOptions>(options, {
        // Package info
        ...pkgInfo,
        license: 'MIT',

        // Releases
        release: false,
        defaultReleaseBranch: 'main',
        releaseToNpm: true,
        npmAccess: javascript.NpmAccess.PUBLIC,
        npmignore: noEmpties([
          options.projenrcTsOptions?.filename ?? '.projenrc.ts',
          options.projenrcTsOptions?.projenCodeDir ?? 'projenrc',
          '.gitattributes',
        ]),

        // Automation
        githubOptions: {
          projenCredentials: ifSet(options.automationAppName, github.GithubCredentials.fromApp()),
          pullRequestLintOptions: {
            semanticTitleOptions: {
              types: ['feat', 'fix', 'chore', 'docs', 'ci', 'revert'],
            },
          },
        },
        autoApproveUpgrades: true,
        autoApproveOptions: {
          allowedUsernames: noEmpties([
            ifSet(options.automationAppName, `${options.automationAppName}[bot]`),
            ifSet(options.ownerCanSelfApprovePRs ?? true, pkgInfo.githubUser),
          ]),
        },

        // Deps
        devDeps: ['@mrgrain/jsii-struct-builder', '@jsii/spec'],
        peerDeps: ['projen'],
        depsUpgradeOptions: {
          workflowOptions: {
            schedule: options.upgradesSchedule,
          },
        },
      }),

      // Forced options
      sampleCode: false,
      projenrcTs: true,
      jsiiVersion: '5.0.x',
      typescriptVersion: '5.0.x',
    });

    this.eslint?.addRules({
      'eol-last': ['error', 'always'],
      'space-in-parens': ['error', 'never'],
    });
  }
}

function packageInfo(repo: string) {
  const githubUser = repo.split('/')[0];

  return {
    githubUser,
    name: `@${repo}`,
    repositoryUrl: `git@github.com:${repo}.git`,
    homepage: `https://github.com/${repo}`,
    authorAddress: `https://github.com/${githubUser}`,
  };
}
