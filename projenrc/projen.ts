import path from 'path';
import { Struct } from '@mrgrain/jsii-struct-builder';
import { Component, typescript } from 'projen';
import { ExtendedStruct } from './extended-struct';

export class ProjenProjectOptionsBuilder extends Component {
  public constructor(project: typescript.TypeScriptProject) {
    super(project);

    new ExtendedStruct(project, {
      name: 'ProjenProjectOptions',
      filePath: path.join(project.srcdir, 'projen-project-options.ts'),
    })
      .mixin(Struct.fromFqn('projen.cdk.JsiiProjectOptions'))
      .forcedDefaults('projenrcTs', 'jsiiVersion', 'typescriptVersion', 'sampleCode')
      .repoInfo()
      .releaseConfig()
      .automationConfig()
      .logoSystem()
      .withoutDeprecated();
  }
}
