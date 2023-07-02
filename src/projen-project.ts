import { ReleasableCommits, cdk, github, javascript } from 'projen';
import { SvgFile, Wordmark } from './logo';
import { ProjenProjectOptions } from './projen-project-options';
import { deepDefaults, ifSet, noEmpties } from './utils';

/**
 * A project to create new projen projects & components
 * @pjid projen
 */
export class ProjenProject extends cdk.JsiiProject {
  public readonly logo?: SvgFile;
  public readonly wordmark?: Wordmark;

  public constructor(options: ProjenProjectOptions) {
    const pkgInfo = packageInfo(options.repo);
    const commitOptions = commitTypes(options) ;

    super({
      // Improved defaults
      ...deepDefaults<cdk.JsiiProjectOptions>(options, {
        ...pkgInfo,
        ...commitOptions,
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
          ...commitOptions.githubOptions,
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
            schedule: options.upgradesSchedule ?? javascript.UpgradeDependenciesSchedule.WEEKLY,
          },
        },
      },
      ),

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

    if (options.logo) {
      options.logo.synth(this);
      this.wordmark = new Wordmark(this, {
        logo: options.logo,
        ...options.wordmarkOptions,
      });
    }
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

function commitTypes({
  allowedCommitTypes = ['feat', 'fix', 'chore', 'revert', 'docs', 'ci'],
  releasableCommitTypes = ['feat', 'fix', 'chore', 'revert'],
}: {
  allowedCommitTypes?: string[];
  releasableCommitTypes?: string[];
}) {
  return {
    githubOptions: {
      pullRequestLintOptions: {
        semanticTitleOptions: {
          types: Array.from(new Set([...allowedCommitTypes, ...releasableCommitTypes])).sort(),
        },
      },
    },
    releasableCommits: ReleasableCommits.ofType(releasableCommitTypes.sort(), '.'),
  };
}
