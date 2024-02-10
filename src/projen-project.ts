import { cdk } from 'projen';
import { automation, dependencies, ensureDependencies, eslint, forceDefaults, logo, nodeVersion, packageInfo, preventSelfDependency, release } from './features';
import { SvgFile, Wordmark } from './logo';
import { ProjenProjectOptions } from './projen-project-options';
import { configureFeatures, defaultOptions } from './utils';

/**
 * A project to create new projen projects & components
 * @pjid projen
 */
export class ProjenProject extends cdk.JsiiProject {
  public readonly logo?: SvgFile;
  public readonly wordmark?: Wordmark;

  public constructor(options: ProjenProjectOptions) {
    const opts = defaultOptions<ProjenProjectOptions>(
      packageInfo(),
      release,
      automation,
      dependencies({
        devDeps: ['@mrgrain/jsii-struct-builder', '@jsii/spec', 'jsii-docgen@^10'],
      }),
      forceDefaults({
        author: options.authorName,
        authorUrl: undefined,
        sampleCode: false,
        projenrcTs: true,
        jsiiVersion: '5.1.x',
        typescriptVersion: '5.1.x',
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

    this.addDevDeps('jsii-docgen@^10');
  }
}
