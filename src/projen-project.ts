import { cdk } from 'projen';
import { automation, dependencies, ensureDependencies, eslint, forceOptions, logo, nodeVersion, packageInfo, preventSelfDependency, release } from './features';
import type { SvgFile, Wordmark } from './logo';
import type { ProjenProjectOptions } from './projen-project-options';
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
        projenVersion: options.projenVersion ?? '0.x >=0.75.0',
        devDeps: ['@mrgrain/jsii-struct-builder', '@jsii/spec', 'jsii-docgen@^10'],
        peerDeps: ['constructs@^10.0.0'],
        peerDependencyOptions: {
          pinnedDevDependency: false,
        },
      }),
      forceOptions({
        author: options.authorName,
        authorUrl: undefined,
        sampleCode: false,
        projenrcTs: true,
        jsiiVersion: '5.8.x',
        typescriptVersion: '5.8.x',
        projenVersion: undefined,
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
