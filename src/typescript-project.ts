import { typescript } from 'projen';
import { automation, defaultOptions, dependencies, ensureDependencies, eslint, forceOptions, logo, nodeVersion, packageInfo, preventSelfDependency, release, trustedPublisherFix } from './features';
import type { SvgFile, Wordmark } from './logo';
import type { TypeScriptProjectOptions } from './typescript-project-options';
import { configureFeatures, mergeOptions } from './utils';

/**
 * @pjid ts
 */
export class TypeScriptProject extends typescript.TypeScriptProject {
  public readonly logo?: SvgFile;
  public readonly wordmark?: Wordmark;

  public constructor(options: TypeScriptProjectOptions) {
    const opts = mergeOptions<TypeScriptProjectOptions>(
      packageInfo(),
      release,
      automation,
      dependencies(),
      defaultOptions<typescript.TypeScriptProjectOptions>({
        workflowNodeVersion: 'lts/-2',
        typescriptVersion: '5.8.x',
      }),
      forceOptions<typescript.TypeScriptProjectOptions>({
        sampleCode: false,
        projenrcTs: true,
      }),
    )(options);

    super(opts);

    configureFeatures(
      eslint,
      logo,
      nodeVersion,
      ensureDependencies,
      preventSelfDependency,
      trustedPublisherFix,
    )(this, opts);
  }
}
