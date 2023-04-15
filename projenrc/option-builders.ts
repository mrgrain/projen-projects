import path from 'path';
import { PrimitiveType } from '@jsii/spec';
import { ProjenStruct, Struct } from '@mrgrain/jsii-struct-builder';
import { Component, typescript } from 'projen';

export class ProjenProjectOptionsBuilder extends Component {
  public constructor(project: typescript.TypeScriptProject) {
    super(project);

    const struct = new ProjenStruct(project, {
      name: 'ProjenProjectOptions',
      filePath: path.join(project.srcdir, 'projen-project-options.ts'),
    });

    struct.mixin(Struct.fromFqn('projen.cdk.JsiiProjectOptions')).withoutDeprecated()
      // Forced defaults
      .omit('projenrcTs', 'jsiiVersion', 'typescriptVersion', 'sampleCode')

      // Repo Info
      .add({
        name: 'repo',
        type: { primitive: PrimitiveType.String },
      })
      .update('name', { optional: true })
      .update('repositoryUrl', { optional: true })
      .update('authorAddress', { optional: true })
      .update('license', { docs: { default: '"MIT"' } })

      // Release config
      .update('defaultReleaseBranch', { optional: true })
      .update('release', { docs: { default: 'false' } })
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
          default: 'UpgradeDependenciesSchedule.DAILY',
        },
      })

      // footer
      .omit('foobar');
  }
}

export class TypeScriptProjectOptionsBuilder extends Component {
  public constructor(project: typescript.TypeScriptProject) {
    super(project);

    const struct = new ProjenStruct(project, {
      name: 'TypeScriptProjectOptions',
      filePath: path.join(project.srcdir, 'typescript-project-options.ts'),
    });

    struct.mixin(Struct.fromFqn('projen.typescript.TypeScriptProjectOptions').withoutDeprecated());
  }
}

export class ConstructProjectOptionsBuilder extends Component {
  public constructor(project: typescript.TypeScriptProject) {
    super(project);

    const struct = new ProjenStruct(project, {
      name: 'ConstructProjectOptions',
      filePath: path.join(project.srcdir, 'construct-project-options.ts'),
    });

    struct.mixin(Struct.fromFqn('projen.awscdk.AwsCdkConstructLibraryOptions').withoutDeprecated());
  }
}
