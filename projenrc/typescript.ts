import path from 'path';
import { Stability } from '@jsii/spec';
import { Struct } from '@mrgrain/jsii-struct-builder';
import { Component, typescript } from 'projen';
import { ExtendedStruct } from './extended-struct';


export class TypeScriptProjectOptionsBuilder extends Component {
  public constructor(project: typescript.TypeScriptProject) {
    super(project);

    new ExtendedStruct(project, {
      name: 'TypeScriptProjectOptions',
      filePath: path.join(project.srcdir, 'typescript-project-options.ts'),
    })
      .mixin(Struct.fromFqn('projen.typescript.TypeScriptProjectOptions'))
      .forcedDefaults('projenrcTs', 'sampleCode')
      .packageInfo()
      .releaseConfig()
      .automationConfig()
      .logoSystem()
      .withoutDeprecated()
      .withStability(Stability.Stable);
  }
}

