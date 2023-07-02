import path from 'path';
import { ProjenStruct, Struct } from '@mrgrain/jsii-struct-builder';
import { Component, typescript } from 'projen';

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

