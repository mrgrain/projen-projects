import path from 'path';
import { Stability } from '@jsii/spec';
import { Struct } from '@mrgrain/jsii-struct-builder';
import { Component, typescript } from 'projen';
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
      .forcedDefaults('projenrcTs', 'jsiiVersion', 'typescriptVersion', 'sampleCode')
      .packageInfo({
        isJsii: true,
      })
      .releaseConfig()
      .automationConfig()
      .logoSystem()
      .withoutDeprecated()
      .withStability(Stability.Stable);
  }
}
