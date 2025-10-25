import { cdk } from 'projen';
import { automation, defaultOptions, dependencies, ensureDependencies, eslint, forceOptions, logo, nodeVersion, packageInfo, preventSelfDependency, release, selfMutationOnForks, trustedPublisherFix } from './features';
import { protectAutomationCredentials } from './features/automation';
import type { SvgFile, Wordmark } from './logo';
import type { ProjenProjectOptions } from './projen-project-options';
import { configureFeatures, mergeOptions } from './utils';

/**
 * A project to create new projen projects & components
 * @pjid projen
 */
export class ProjenProject extends cdk.JsiiProject {
  public readonly logo?: SvgFile;
  public readonly wordmark?: Wordmark;

  public constructor(options: ProjenProjectOptions) {
    const opts = mergeOptions<ProjenProjectOptions>(
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
      defaultOptions<cdk.JsiiProjectOptions>({ workflowNodeVersion: 'lts/-2' }),
      forceOptions<cdk.JsiiProjectOptions>({
        author: options.authorName,
        authorUrl: undefined,
        sampleCode: false,
        projenrcTs: true,
        jsiiVersion: '5.9.x',
        typescriptVersion: '5.9.x',
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
      selfMutationOnForks,
      protectAutomationCredentials,
    )(this, opts);
  }
}
