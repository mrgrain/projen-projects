import path from 'path';
import { ProjenStruct, Struct } from '@mrgrain/jsii-struct-builder';
import { Component, typescript } from 'projen';


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

