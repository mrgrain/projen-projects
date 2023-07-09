import { CollectionKind, PrimitiveType, Stability } from '@jsii/spec';
import { ProjenStruct } from '@mrgrain/jsii-struct-builder';

export interface PackageInfoOptions {
  license?: string;
  isJsii?: boolean;
}

/**
 * An extended projen struct that sets options for commonly used components
 */
export class ExtendedStruct extends ProjenStruct {
  public withStability(stability: Stability) {
    return this.updateAll({
      docs: {
        stability,
      },
    });
  }

  /**
   * Upstream options that are forced (unchangeable) in this project type
   */
  public forcedDefaults(...defaults: string[]) {
    return this.omit(...defaults);
  }

  /**
   * Options for the PackageInfo component
   */
  public packageInfo({
    license = 'MIT',
    isJsii = false,
  }: PackageInfoOptions = {}) {
    const result = this
      .add({
        name: 'repo',
        type: { primitive: PrimitiveType.String },
      })
      .update('name', { optional: true })
      .update('license', { docs: { default: `"${license}"` } })
      .update('authorName', { optional: false });

    // JsiiProject
    if (isJsii) {
      return result
        .omit('author', 'repositoryUrl')
        .update('authorAddress', { optional: true });
    }

    // TypeScriptProject
    return result;
  }

  /**
   * Options for the streamlined release config
   */
  public releaseConfig(enableReleaseByDefault = false) {
    return this
      .update('defaultReleaseBranch', { optional: true })
      .update('release', { docs: { default: enableReleaseByDefault.toString() } })
      .add({
        name: 'releasableCommitTypes',
        optional: true,
        type: {
          collection: {
            kind: CollectionKind.Array,
            elementtype: { primitive: PrimitiveType.String },
          },
        },
        docs: {
          summary: 'Which conventional commit types should be released',
          default: "['feat', 'fix', 'chore', 'revert']",
        },
      })
      .omit('releasableCommits');
  }

  /**
   * Options for the streamlined automation config
   */
  public automationConfig() {
    return this
      .add({
        name: 'allowedCommitTypes',
        optional: true,
        type: {
          collection: {
            kind: CollectionKind.Array,
            elementtype: { primitive: PrimitiveType.String },
          },
        },
        docs: {
          summary: 'Which conventional commit types are allowed to be used',
          remarks: 'Types listed in `releasableCommitTypes` are always allowed',
          default: "['feat', 'fix', 'chore', 'revert', 'docs', 'ci']",
        },
      })
      .add({
        name: 'automationAppName',
        optional: true,
        type: { primitive: PrimitiveType.String },
        docs: {
          summary: 'Use this app for workflow automation. Remember to install the app and to configure credentials.',
          default: '- tokens will be used',
        },
      })
      .add({
        name: 'ownerCanSelfApprovePRs',
        optional: true,
        type: { primitive: PrimitiveType.Boolean },
        docs: {
          summary: 'Allow the repo owner to self approve PRs by putting a label on it.',
          default: 'true',
        },
      })
      .add({
        name: 'upgradesSchedule',
        optional: true,
        type: { fqn: 'projen.javascript.UpgradeDependenciesSchedule' },
        docs: {
          default: 'UpgradeDependenciesSchedule.WEEKLY',
        },
      });
  }

  /**
   * Options for the LogoSystem component
   */
  public logoSystem() {
    return this
      .add({
        name: 'logo',
        optional: true,
        type: { fqn: 'mrpj.logo.ILogo' },
        docs: {
          summary: 'Add a logo.',
          remarks: 'Use `Logo.placeholder()` to get started.',
          example: 'Logo.fromFile("images/my-logo.svg", { width: 100, height: 100 })',
        },
      })
      .add({
        name: 'wordmarkOptions',
        optional: true,
        type: { fqn: 'mrpj.logo.WordmarkOptions' },
        docs: {
          summary: 'Configure how the wordmark is created from a logo.',
          remarks: 'Wordmarks are only created when a logo is available.',
          default: '- derived from logo and project',
        },
      });
  }
}

