import path from 'path';
import { PrimitiveType, Stability } from '@jsii/spec';
import { Struct } from '@mrgrain/jsii-struct-builder';
import type { typescript } from 'projen';
import { Component } from 'projen';
import { ExtendedStruct } from './extended-struct';

export class ProjenProjectOptionsBuilder extends Component {
  public constructor(project: typescript.TypeScriptProject) {
    super(project);

    new ExtendedStruct(project, {
      name: 'ProjenProjectOptions',
      filePath: path.join(project.srcdir, 'projen-project-options.ts'),
      outputFileOptions: {
        useTypeImports: true,
      },
    })
      .mixin(Struct.fromFqn('projen.cdk.JsiiProjectOptions'))
      .forcedDefaults('author', 'authorUrl', 'sampleCode', 'projenrcTs', 'jsiiVersion', 'typescriptVersion')
      .packageInfo({
        isJsii: true,
      })
      .releaseConfig()
      .automationConfig()
      .logoSystem()
      .withoutDeprecated()
      .omit('projenVersion')
      .add({
        name: 'projenVersion',
        type: { primitive: PrimitiveType.String },
        optional: true,
        docs: {
          default: '"0.x >=0.75.0"',
          summary: 'The projen version constraint that is supported by this project',
        },
      })
      .withStability(Stability.Stable);
  }
}
