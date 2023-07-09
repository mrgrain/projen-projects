import path from 'path';
import { Stability } from '@jsii/spec';
import { Struct } from '@mrgrain/jsii-struct-builder';
import { Component, typescript } from 'projen';
import { ExtendedStruct } from './extended-struct';

export class ConstructProjectOptionsBuilder extends Component {
  public constructor(project: typescript.TypeScriptProject) {
    super(project);

    new ExtendedStruct(project, {
      name: 'ConstructProjectOptions',
      filePath: path.join(project.srcdir, 'construct-project-options.ts'),
    })
      .mixin(Struct.fromFqn('projen.awscdk.AwsCdkConstructLibraryOptions'))
      .withoutDeprecated()
      .withStability(Stability.Stable);
  }
}

