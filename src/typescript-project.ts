import { typescript } from 'projen';
import { automation, dependencies, eslint, forceDefaults, logo, nodeVersion, packageInfo, preventSelfDependency, release } from './features';
import { SvgFile, Wordmark } from './logo';
import { TypeScriptProjectOptions } from './typescript-project-options';
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
      forceDefaults({
        sampleCode: false,
        projenrcTs: true,
      }),
    )(options);

    super(opts);

    configureFeatures(
      eslint,
      logo,
      nodeVersion,
      preventSelfDependency,
    )(this, opts);
  }
}
