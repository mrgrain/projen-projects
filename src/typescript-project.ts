import { typescript } from 'projen';
import { automation, dependencies, ensureDependencies, eslint, forceOptions, logo, nodeVersion, packageInfo, preventSelfDependency, release } from './features';
import type { SvgFile, Wordmark } from './logo';
import type { TypeScriptProjectOptions } from './typescript-project-options';
import { configureFeatures, defaultOptions } from './utils';

/**
 * @pjid ts
 */
export class TypeScriptProject extends typescript.TypeScriptProject {
  public readonly logo?: SvgFile;
  public readonly wordmark?: Wordmark;

  public constructor(options: TypeScriptProjectOptions) {
    const opts = defaultOptions<TypeScriptProjectOptions>(
      packageInfo(),
      release,
      automation,
      dependencies(),
      forceOptions({
        sampleCode: false,
        projenrcTs: true,
        workflowNodeVersion: 'lts/-2',
      }),
    )(options);

    super(opts);

    configureFeatures(
      eslint,
      logo,
      nodeVersion,
      ensureDependencies,
      preventSelfDependency,
    )(this, opts);
  }
}
