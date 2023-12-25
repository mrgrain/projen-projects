// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import type { awscdk, cdk, github, GitOptions, GroupRunnerOptions, IgnoreFileOptions, javascript, LoggerOptions, Project, ProjenrcJsonOptions, ReleasableCommits, release, RenovatebotOptions, SampleReadmeProps, typescript } from 'projen';

/**
 * ConstructProjectOptions
 */
export interface ConstructProjectOptions {
  /**
   * Common options for all AWS Lambda functions.
   * @default - default options
   * @stability stable
   */
  readonly lambdaOptions?: awscdk.LambdaFunctionCommonOptions;
  /**
   * Automatically adds an `awscdk.LambdaExtension` for each `.lambda-extension.ts` entrypoint in your source tree. If this is disabled, you can manually add an `awscdk.AutoDiscover` component to your project.
   * @default true
   * @stability stable
   */
  readonly lambdaExtensionAutoDiscover?: boolean;
  /**
   * Automatically adds an `aws_lambda.Function` for each `.lambda.ts` handler in your source tree. If this is disabled, you either need to explicitly call `aws_lambda.Function.autoDiscover()` or define a `new aws_lambda.Function()` for each handler.
   * @default true
   * @stability stable
   */
  readonly lambdaAutoDiscover?: boolean;
  /**
   * Automatically discovers and creates integration tests for each `.integ.ts` file in under your test directory.
   * @default true
   * @stability stable
   */
  readonly integrationTestAutoDiscover?: boolean;
  /**
   * Enable experimental support for the AWS CDK integ-runner.
   * @default false
   * @stability stable
   */
  readonly experimentalIntegRunner?: boolean;
  /**
   * Automatically adds an `cloudfront.experimental.EdgeFunction` for each `.edge-lambda.ts` handler in your source tree. If this is disabled, you can manually add an `awscdk.AutoDiscover` component to your project.
   * @default true
   * @stability stable
   */
  readonly edgeLambdaAutoDiscover?: boolean;
  /**
   * Minimum version of the `constructs` library to depend on.
   * @default - for CDK 1.x the default is "3.2.27", for CDK 2.x the default is
"10.0.5".
   * @stability stable
   */
  readonly constructsVersion?: string;
  /**
   * Use pinned version instead of caret version for CDK.
   * You can use this to prevent mixed versions for your CDK dependencies and to prevent auto-updates.
   * If you use experimental features this will let you define the moment you include breaking changes.
   * @stability stable
   */
  readonly cdkVersionPinning?: boolean;
  /**
   * Install the assertions library?
   * Only needed for CDK 1.x. If using CDK 2.x then
   * assertions is already included in 'aws-cdk-lib'
   * @default - will be included by default for AWS CDK >= 1.111.0 < 2.0.0
   * @stability stable
   */
  readonly cdkAssertions?: boolean;
  /**
   * Minimum version of the AWS CDK to depend on.
   * @default "2.1.0"
   * @stability stable
   */
  readonly cdkVersion: string;
  /**
   * Libraries will be picked up by the construct catalog when they are published to npm as jsii modules and will be published under:.
   * https://awscdk.io/packages/[@SCOPE/]PACKAGE@VERSION
   *
   * The catalog will also post a tweet to https://twitter.com/awscdkio with the
   * package name, description and the above link. You can disable these tweets
   * through `{ announce: false }`.
   *
   * You can also add a Twitter handle through `{ twitter: 'xx' }` which will be
   * mentioned in the tweet.
   * @default - new version will be announced
   * @stability stable
   */
  readonly catalog?: cdk.Catalog;
  /**
   * @default "."
   * @stability stable
   */
  readonly rootdir?: string;
  /**
   * Publish to pypi.
   * @default - no publishing
   * @stability stable
   */
  readonly publishToPypi?: cdk.JsiiPythonTarget;
  /**
   * Publish to NuGet.
   * @default - no publishing
   * @stability stable
   */
  readonly publishToNuget?: cdk.JsiiDotNetTarget;
  /**
   * Publish to maven.
   * @default - no publishing
   * @stability stable
   */
  readonly publishToMaven?: cdk.JsiiJavaTarget;
  /**
   * Publish Go bindings to a git repository.
   * @default - no publishing
   * @stability stable
   */
  readonly publishToGo?: cdk.JsiiGoTarget;
  /**
   * Version of the jsii compiler to use.
   * Set to "*" if you want to manually manage the version of jsii in your
   * project by managing updates to `package.json` on your own.
   *
   * NOTE: The jsii compiler releases since 5.0.0 are not semantically versioned
   * and should remain on the same minor, so we recommend using a `~` dependency
   * (e.g. `~5.0.0`).
   * @default "1.x"
   * @stability stable
   * @pjnew "~5.0.0"
   */
  readonly jsiiVersion?: string;
  /**
   * Accepts a list of glob patterns.
   * Files matching any of those patterns will be excluded from the TypeScript compiler input.
   *
   * By default, jsii will include all *.ts files (except .d.ts files) in the TypeScript compiler input.
   * This can be problematic for example when the package's build or test procedure generates .ts files
   * that cannot be compiled with jsii's compiler settings.
   * @stability stable
   */
  readonly excludeTypescript?: Array<string>;
  /**
   * File path for generated docs.
   * @default "API.md"
   * @stability stable
   */
  readonly docgenFilePath?: string;
  /**
   * Emit a compressed version of the assembly.
   * @default false
   * @stability stable
   */
  readonly compressAssembly?: boolean;
  /**
   * Name of the ignore file for API compatibility tests.
   * @default ".compatignore"
   * @stability stable
   */
  readonly compatIgnore?: string;
  /**
   * Automatically run API compatibility test against the latest version published to npm after compilation.
   * - You can manually run compatibility tests using `yarn compat` if this feature is disabled.
   * - You can ignore compatibility failures by adding lines to a ".compatignore" file.
   * @default false
   * @stability stable
   */
  readonly compat?: boolean;
  /**
   * Git repository URL.
   * @default $GIT_REMOTE
   * @stability stable
   */
  readonly repositoryUrl: string;
  /**
   * Email or URL of the library author.
   * @default $GIT_USER_EMAIL
   * @stability stable
   */
  readonly authorAddress: string;
  /**
   * The name of the library author.
   * @default $GIT_USER_NAME
   * @stability stable
   */
  readonly author: string;
  /**
   * TypeScript version to use.
   * NOTE: Typescript is not semantically versioned and should remain on the
   * same minor, so we recommend using a `~` dependency (e.g. `~1.2.3`).
   * @default "latest"
   * @stability stable
   */
  readonly typescriptVersion?: string;
  /**
   * The name of the development tsconfig.json file.
   * @default "tsconfig.dev.json"
   * @stability stable
   */
  readonly tsconfigDevFile?: string;
  /**
   * Custom tsconfig options for the development tsconfig.json file (used for testing).
   * @default - use the production tsconfig options
   * @stability stable
   */
  readonly tsconfigDev?: javascript.TypescriptConfigOptions;
  /**
   * Custom TSConfig.
   * @default - default options
   * @stability stable
   */
  readonly tsconfig?: javascript.TypescriptConfigOptions;
  /**
   * Jest tests directory. Tests files should be named `xxx.test.ts`.
   * If this directory is under `srcdir` (e.g. `src/test`, `src/__tests__`),
   * then tests are going to be compiled into `lib/` and executed as javascript.
   * If the test directory is outside of `src`, then we configure jest to
   * compile the code in-memory.
   * @default "test"
   * @stability stable
   */
  readonly testdir?: string;
  /**
   * Typescript sources directory.
   * @default "src"
   * @stability stable
   */
  readonly srcdir?: string;
  /**
   * Generate one-time sample in `src/` and `test/` if there are no files there.
   * @default true
   * @stability stable
   */
  readonly sampleCode?: boolean;
  /**
   * Options for .projenrc.ts.
   * @stability stable
   */
  readonly projenrcTsOptions?: typescript.ProjenrcOptions;
  /**
   * Use TypeScript for your projenrc file (`.projenrc.ts`).
   * @default false
   * @stability stable
   * @pjnew true
   */
  readonly projenrcTs?: boolean;
  /**
   * Typescript  artifacts output directory.
   * @default "lib"
   * @stability stable
   */
  readonly libdir?: string;
  /**
   * Eslint options.
   * @default - opinionated default options
   * @stability stable
   */
  readonly eslintOptions?: javascript.EslintOptions;
  /**
   * Setup eslint.
   * @default true
   * @stability stable
   */
  readonly eslint?: boolean;
  /**
   * The .d.ts file that includes the type declarations for this module.
   * @default - .d.ts file derived from the project's entrypoint (usually lib/index.d.ts)
   * @stability stable
   */
  readonly entrypointTypes?: string;
  /**
   * Docs directory.
   * @default "docs"
   * @stability stable
   */
  readonly docsDirectory?: string;
  /**
   * Docgen by Typedoc.
   * @default false
   * @stability stable
   */
  readonly docgen?: boolean;
  /**
   * Do not generate a `tsconfig.dev.json` file.
   * @default false
   * @stability stable
   */
  readonly disableTsconfigDev?: boolean;
  /**
   * Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler).
   * @default false
   * @stability stable
   */
  readonly disableTsconfig?: boolean;
  /**
   * Enable Node.js package cache in GitHub workflows.
   * @default false
   * @stability stable
   */
  readonly workflowPackageCache?: boolean;
  /**
   * The node version to use in GitHub workflows.
   * @default - same as `minNodeVersion`
   * @stability stable
   */
  readonly workflowNodeVersion?: string;
  /**
   * The git identity to use in workflows.
   * @default - GitHub Actions
   * @stability stable
   */
  readonly workflowGitIdentity?: github.GitIdentity;
  /**
   * Workflow steps to use in order to bootstrap this repo.
   * @default "yarn install --frozen-lockfile && yarn projen"
   * @stability stable
   */
  readonly workflowBootstrapSteps?: Array<github.workflows.JobStep>;
  /**
   * Automatically release to npm when new versions are introduced.
   * @default false
   * @stability stable
   */
  readonly releaseToNpm?: boolean;
  /**
   * Add release management to this project.
   * @default - true (false for subprojects)
   * @stability stable
   */
  readonly release?: boolean;
  /**
   * The contents of the pull request template.
   * @default - default content
   * @stability stable
   */
  readonly pullRequestTemplateContents?: Array<string>;
  /**
   * Include a GitHub pull request template.
   * @default true
   * @stability stable
   */
  readonly pullRequestTemplate?: boolean;
  /**
   * Version of projen to install.
   * @default - Defaults to the latest version.
   * @stability stable
   */
  readonly projenVersion?: string;
  /**
   * Options for .projenrc.js.
   * @default - default options
   * @stability stable
   */
  readonly projenrcJsOptions?: javascript.ProjenrcOptions;
  /**
   * Generate (once) .projenrc.js (in JavaScript). Set to `false` in order to disable .projenrc.js generation.
   * @default - true if projenrcJson is false
   * @stability stable
   */
  readonly projenrcJs?: boolean;
  /**
   * Indicates of "projen" should be installed as a devDependency.
   * @default true
   * @stability stable
   */
  readonly projenDevDependency?: boolean;
  /**
   * Prettier options.
   * @default - default options
   * @stability stable
   */
  readonly prettierOptions?: javascript.PrettierOptions;
  /**
   * Setup prettier.
   * @default false
   * @stability stable
   */
  readonly prettier?: boolean;
  /**
   * Defines a `package` task that will produce an npm tarball under the artifacts directory (e.g. `dist`).
   * @default true
   * @stability stable
   */
  readonly package?: boolean;
  /**
   * Configuration options for .npmignore file.
   * @stability stable
   */
  readonly npmIgnoreOptions?: IgnoreFileOptions;
  /**
   * Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.
   * @default true
   * @stability stable
   */
  readonly npmignoreEnabled?: boolean;
  /**
   * Automatically update files modified during builds to pull-request branches.
   * This means
   * that any files synthesized by projen or e.g. test snapshots will always be up-to-date
   * before a PR is merged.
   *
   * Implies that PR builds do not have anti-tamper checks.
   * @default true
   * @stability stable
   */
  readonly mutableBuild?: boolean;
  /**
   * Jest options.
   * @default - default options
   * @stability stable
   */
  readonly jestOptions?: javascript.JestOptions;
  /**
   * Setup jest unit tests.
   * @default true
   * @stability stable
   */
  readonly jest?: boolean;
  /**
   * Additional entries to .gitignore.
   * @stability stable
   */
  readonly gitignore?: Array<string>;
  /**
   * Options for `UpgradeDependencies`.
   * @default - default options
   * @stability stable
   */
  readonly depsUpgradeOptions?: javascript.UpgradeDependenciesOptions;
  /**
   * Use tasks and github workflows to handle dependency upgrades.
   * Cannot be used in conjunction with `dependabot`.
   * @default true
   * @stability stable
   */
  readonly depsUpgrade?: boolean;
  /**
   * Options for dependabot.
   * @default - default options
   * @stability stable
   */
  readonly dependabotOptions?: github.DependabotOptions;
  /**
   * Use dependabot to handle dependency upgrades.
   * Cannot be used in conjunction with `depsUpgrade`.
   * @default false
   * @stability stable
   */
  readonly dependabot?: boolean;
  /**
   * The copyright years to put in the LICENSE file.
   * @default - current year
   * @stability stable
   */
  readonly copyrightPeriod?: string;
  /**
   * License copyright owner.
   * @default - defaults to the value of authorName or "" if `authorName` is undefined.
   * @stability stable
   */
  readonly copyrightOwner?: string;
  /**
   * Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories.
   * @default - if this option is not specified, only public repositories are supported
   * @stability stable
   */
  readonly codeCovTokenSecret?: string;
  /**
   * Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v3 A secret is required for private repos. Configured with `@codeCovTokenSecret`.
   * @default false
   * @stability stable
   */
  readonly codeCov?: boolean;
  /**
   * Configure which licenses should be deemed acceptable for use by dependencies.
   * This setting will cause the build to fail, if any prohibited or not allowed licenses ares encountered.
   * @default - no license checks are run during the build and all licenses will be accepted
   * @stability stable
   */
  readonly checkLicenses?: javascript.LicenseCheckerOptions;
  /**
   * Options for `Bundler`.
   * @stability stable
   */
  readonly bundlerOptions?: javascript.BundlerOptions;
  /**
   * Build workflow triggers.
   * @default "{ pullRequest: {}, workflowDispatch: {} }"
   * @stability stable
   */
  readonly buildWorkflowTriggers?: github.workflows.Triggers;
  /**
   * Define a GitHub workflow for building PRs.
   * @default - true if not a subproject
   * @stability stable
   */
  readonly buildWorkflow?: boolean;
  /**
   * Automatically approve deps upgrade PRs, allowing them to be merged by mergify (if configued).
   * Throw if set to true but `autoApproveOptions` are not defined.
   * @default - true
   * @stability stable
   */
  readonly autoApproveUpgrades?: boolean;
  /**
   * A directory which will contain build artifacts.
   * @default "dist"
   * @stability stable
   */
  readonly artifactsDirectory?: string;
  /**
   * The name of the main release branch.
   * @default "main"
   * @stability stable
   */
  readonly defaultReleaseBranch: string;
  /**
   * Github Runner Group selection options.
   * @stability stable
   * @description Defines a target Runner Group by name and/or labels
   * @throws {Error} if both `runsOn` and `runsOnGroup` are specified
   */
  readonly workflowRunsOnGroup?: GroupRunnerOptions;
  /**
   * Github Runner selection labels.
   * @default ["ubuntu-latest"]
   * @stability stable
   * @description Defines a target Runner by labels
   * @throws {Error} if both `runsOn` and `runsOnGroup` are specified
   */
  readonly workflowRunsOn?: Array<string>;
  /**
   * Container image to use for GitHub workflows.
   * @default - default image
   * @stability stable
   */
  readonly workflowContainerImage?: string;
  /**
   * Custom configuration used when creating changelog with standard-version package.
   * Given values either append to default configuration or overwrite values in it.
   * @default - standard configuration applicable for GitHub repositories
   * @stability stable
   */
  readonly versionrcOptions?: Record<string, any>;
  /**
   * A set of workflow steps to execute in order to setup the workflow container.
   * @stability stable
   */
  readonly releaseWorkflowSetupSteps?: Array<github.workflows.JobStep>;
  /**
   * The name of the default release workflow.
   * @default "Release"
   * @stability stable
   */
  readonly releaseWorkflowName?: string;
  /**
   * The release trigger to use.
   * @default - Continuous releases (`ReleaseTrigger.continuous()`)
   * @stability stable
   */
  readonly releaseTrigger?: release.ReleaseTrigger;
  /**
   * Automatically add the given prefix to release tags. Useful if you are releasing on multiple branches with overlapping version numbers.
   * Note: this prefix is used to detect the latest tagged version
   * when bumping, so if you change this on a project with an existing version
   * history, you may need to manually tag your latest release
   * with the new prefix.
   * @default "v"
   * @stability stable
   */
  readonly releaseTagPrefix?: string;
  /**
   * The label to apply to issues indicating publish failures.
   * Only applies if `releaseFailureIssue` is true.
   * @default "failed-release"
   * @stability stable
   */
  readonly releaseFailureIssueLabel?: string;
  /**
   * Create a github issue on every failed publishing task.
   * @default false
   * @stability stable
   */
  readonly releaseFailureIssue?: boolean;
  /**
   * Defines additional release branches.
   * A workflow will be created for each
   * release branch which will publish releases from commits in this branch.
   * Each release branch _must_ be assigned a major version number which is used
   * to enforce that versions published from that branch always use that major
   * version. If multiple branches are used, the `majorVersion` field must also
   * be provided for the default branch.
   * @default - no additional branches are used for release. you can use
`addBranch()` to add additional branches.
   * @stability stable
   */
  readonly releaseBranches?: Record<string, release.BranchOptions>;
  /**
   * Find commits that should be considered releasable Used to decide if a release is required.
   * @default ReleasableCommits.everyCommit()
   * @stability stable
   */
  readonly releasableCommits?: ReleasableCommits;
  /**
   * Define publishing tasks that can be executed manually as well as workflows.
   * Normally, publishing only happens within automated workflows. Enable this
   * in order to create a publishing task for each publishing activity.
   * @default false
   * @stability stable
   */
  readonly publishTasks?: boolean;
  /**
   * Instead of actually publishing to package managers, just print the publishing command.
   * @default false
   * @stability stable
   */
  readonly publishDryRun?: boolean;
  /**
   * Bump versions from the default branch as pre-releases (e.g. "beta", "alpha", "pre").
   * @default - normal semantic versions
   * @stability stable
   */
  readonly prerelease?: string;
  /**
   * Steps to execute after build as part of the release workflow.
   * @default []
   * @stability stable
   */
  readonly postBuildSteps?: Array<github.workflows.JobStep>;
  /**
   * The npmDistTag to use when publishing from the default branch.
   * To set the npm dist-tag for release branches, set the `npmDistTag` property
   * for each branch.
   * @default "latest"
   * @stability stable
   */
  readonly npmDistTag?: string;
  /**
   * Minimal Major version to release.
   * This can be useful to set to 1, as breaking changes before the 1.x major
   * release are not incrementing the major version number.
   *
   * Can not be set together with `majorVersion`.
   * @default - No minimum version is being enforced
   * @stability stable
   */
  readonly minMajorVersion?: number;
  /**
   * Major version to release from the default branch.
   * If this is specified, we bump the latest version of this major version line.
   * If not specified, we bump the global latest version.
   * @default - Major version is not enforced.
   * @stability stable
   */
  readonly majorVersion?: number;
  /**
   * Version requirement of `publib` which is used to publish modules to npm.
   * @default "latest"
   * @stability stable
   */
  readonly jsiiReleaseVersion?: string;
  /**
   * Options for Yarn Berry.
   * @default - Yarn Berry v4 with all default options
   * @stability stable
   */
  readonly yarnBerryOptions?: javascript.YarnBerryOptions;
  /**
   * Package's Stability.
   * @stability stable
   */
  readonly stability?: string;
  /**
   * Options for privately hosted scoped packages.
   * @default - fetch all scoped packages from the public npm registry
   * @stability stable
   */
  readonly scopedPackagesOptions?: Array<javascript.ScopedPackagesOptions>;
  /**
   * If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives.
   * @stability stable
   */
  readonly repositoryDirectory?: string;
  /**
   * The repository is the location where the actual code for your package lives.
   * See https://classic.yarnpkg.com/en/docs/package-json/#toc-repository
   * @stability stable
   */
  readonly repository?: string;
  /**
   * The version of PNPM to use if using PNPM as a package manager.
   * @default "7"
   * @stability stable
   */
  readonly pnpmVersion?: string;
  /**
   * Peer dependencies for this module.
   * Dependencies listed here are required to
   * be installed (and satisfied) by the _consumer_ of this library. Using peer
   * dependencies allows you to ensure that only a single module of a certain
   * library exists in the `node_modules` tree of your consumers.
   *
   * Note that prior to npm@7, peer dependencies are _not_ automatically
   * installed, which means that adding peer dependencies to a library will be a
   * breaking change for your customers.
   *
   * Unless `peerDependencyOptions.pinnedDevDependency` is disabled (it is
   * enabled by default), projen will automatically add a dev dependency with a
   * pinned version for each peer dependency. This will ensure that you build &
   * test your module against the lowest peer version required.
   * @default []
   * @stability stable
   */
  readonly peerDeps?: Array<string>;
  /**
   * Options for `peerDeps`.
   * @stability stable
   */
  readonly peerDependencyOptions?: javascript.PeerDependencyOptions;
  /**
   * The "name" in package.json.
   * @default - defaults to project name
   * @stability stable
   * @featured true
   */
  readonly packageName?: string;
  /**
   * The Node Package Manager used to execute scripts.
   * @default NodePackageManager.YARN_CLASSIC
   * @stability stable
   */
  readonly packageManager?: javascript.NodePackageManager;
  /**
   * GitHub secret which contains the NPM token to use when publishing packages.
   * @default "NPM_TOKEN"
   * @stability stable
   */
  readonly npmTokenSecret?: string;
  /**
   * The base URL of the npm package registry.
   * Must be a URL (e.g. start with "https://" or "http://")
   * @default "https://registry.npmjs.org"
   * @stability stable
   */
  readonly npmRegistryUrl?: string;
  /**
   * Access level of the npm package.
   * @default - for scoped packages (e.g. `foo@bar`), the default is
`NpmAccess.RESTRICTED`, for non-scoped packages, the default is
`NpmAccess.PUBLIC`.
   * @stability stable
   */
  readonly npmAccess?: javascript.NpmAccess;
  /**
   * Minimum Node.js version to require via package.json `engines` (inclusive).
   * @default - no "engines" specified
   * @stability stable
   */
  readonly minNodeVersion?: string;
  /**
   * Minimum node.js version to require via `engines` (inclusive).
   * @default - no max
   * @stability stable
   */
  readonly maxNodeVersion?: string;
  /**
   * Indicates if a license should be added.
   * @default true
   * @stability stable
   */
  readonly licensed?: boolean;
  /**
   * License's SPDX identifier.
   * See https://github.com/projen/projen/tree/main/license-text for a list of supported licenses.
   * Use the `licensed` option if you want to no license to be specified.
   * @default "Apache-2.0"
   * @stability stable
   */
  readonly license?: string;
  /**
   * Keywords to include in `package.json`.
   * @stability stable
   */
  readonly keywords?: Array<string>;
  /**
   * Package's Homepage / Website.
   * @stability stable
   */
  readonly homepage?: string;
  /**
   * Module entrypoint (`main` in `package.json`).
   * Set to an empty string to not include `main` in your package.json
   * @default "lib/index.js"
   * @stability stable
   */
  readonly entrypoint?: string;
  /**
   * Build dependencies for this module.
   * These dependencies will only be
   * available in your build environment but will not be fetched when this
   * module is consumed.
   *
   * The recommendation is to only specify the module name here (e.g.
   * `express`). This will behave similar to `yarn add` or `npm install` in the
   * sense that it will add the module as a dependency to your `package.json`
   * file with the latest version (`^`). You can specify semver requirements in
   * the same syntax passed to `npm i` or `yarn add` (e.g. `express@^2`) and
   * this will be what you `package.json` will eventually include.
   * @default []
   * @stability stable
   * @featured true
   */
  readonly devDeps?: Array<string>;
  /**
   * The description is just a string that helps people understand the purpose of the package.
   * It can be used when searching for packages in a package manager as well.
   * See https://classic.yarnpkg.com/en/docs/package-json/#toc-description
   * @stability stable
   * @featured true
   */
  readonly description?: string;
  /**
   * Runtime dependencies of this module.
   * The recommendation is to only specify the module name here (e.g.
   * `express`). This will behave similar to `yarn add` or `npm install` in the
   * sense that it will add the module as a dependency to your `package.json`
   * file with the latest version (`^`). You can specify semver requirements in
   * the same syntax passed to `npm i` or `yarn add` (e.g. `express@^2`) and
   * this will be what you `package.json` will eventually include.
   * @default []
   * @stability stable
   * @featured true
   */
  readonly deps?: Array<string>;
  /**
   * Options for npm packages using AWS CodeArtifact.
   * This is required if publishing packages to, or installing scoped packages from AWS CodeArtifact
   * @default - undefined
   * @stability stable
   */
  readonly codeArtifactOptions?: javascript.CodeArtifactOptions;
  /**
   * List of dependencies to bundle into this module.
   * These modules will be
   * added both to the `dependencies` section and `bundledDependencies` section of
   * your `package.json`.
   *
   * The recommendation is to only specify the module name here (e.g.
   * `express`). This will behave similar to `yarn add` or `npm install` in the
   * sense that it will add the module as a dependency to your `package.json`
   * file with the latest version (`^`). You can specify semver requirements in
   * the same syntax passed to `npm i` or `yarn add` (e.g. `express@^2`) and
   * this will be what you `package.json` will eventually include.
   * @stability stable
   */
  readonly bundledDeps?: Array<string>;
  /**
   * The url to your project's issue tracker.
   * @stability stable
   */
  readonly bugsUrl?: string;
  /**
   * The email address to which issues should be reported.
   * @stability stable
   */
  readonly bugsEmail?: string;
  /**
   * Binary programs vended with your module.
   * You can use this option to add/customize how binaries are represented in
   * your `package.json`, but unless `autoDetectBin` is `false`, every
   * executable file under `bin` will automatically be added to this section.
   * @stability stable
   */
  readonly bin?: Record<string, string>;
  /**
   * Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.
   * @default true
   * @stability stable
   */
  readonly autoDetectBin?: boolean;
  /**
   * Author's URL / Website.
   * @stability stable
   */
  readonly authorUrl?: string;
  /**
   * Is the author an organization.
   * @stability stable
   */
  readonly authorOrganization?: boolean;
  /**
   * Author's name.
   * @stability stable
   */
  readonly authorName?: string;
  /**
   * Author's e-mail.
   * @stability stable
   */
  readonly authorEmail?: string;
  /**
   * Allow the project to include `peerDependencies` and `bundledDependencies`.
   * This is normally only allowed for libraries. For apps, there's no meaning
   * for specifying these.
   * @default true
   * @stability stable
   */
  readonly allowLibraryDependencies?: boolean;
  /**
   * Enable VSCode integration.
   * Enabled by default for root projects. Disabled for non-root projects.
   * @default true
   * @stability stable
   */
  readonly vscode?: boolean;
  /**
   * Auto-close stale issues and pull requests.
   * To disable set `stale` to `false`.
   * @default - see defaults in `StaleOptions`
   * @stability stable
   */
  readonly staleOptions?: github.StaleOptions;
  /**
   * Auto-close of stale issues and pull request.
   * See `staleOptions` for options.
   * @default false
   * @stability stable
   */
  readonly stale?: boolean;
  /**
   * The README setup.
   * @default - { filename: 'README.md', contents: '# replace this' }
   * @stability stable
   */
  readonly readme?: SampleReadmeProps;
  /**
   * Choose a method of providing GitHub API access for projen workflows.
   * @default - use a personal access token named PROJEN_GITHUB_TOKEN
   * @stability stable
   */
  readonly projenCredentials?: github.GithubCredentials;
  /**
   * Add a Gitpod development environment.
   * @default false
   * @stability stable
   */
  readonly gitpod?: boolean;
  /**
   * Options for GitHub integration.
   * @default - see GitHubOptions
   * @stability stable
   */
  readonly githubOptions?: github.GitHubOptions;
  /**
   * Enable GitHub integration.
   * Enabled by default for root projects. Disabled for non-root projects.
   * @default true
   * @stability stable
   */
  readonly github?: boolean;
  /**
   * Add a VSCode development environment (used for GitHub Codespaces).
   * @default false
   * @stability stable
   */
  readonly devContainer?: boolean;
  /**
   * Add a `clobber` task which resets the repo to origin.
   * @default - true, but false for subprojects
   * @stability stable
   */
  readonly clobber?: boolean;
  /**
   * Configure options for automatic merging on GitHub.
   * Has no effect if
   * `github.mergify` or `autoMerge` is set to false.
   * @default - see defaults in `AutoMergeOptions`
   * @stability stable
   */
  readonly autoMergeOptions?: github.AutoMergeOptions;
  /**
   * Enable automatic merging on GitHub.
   * Has no effect if `github.mergify`
   * is set to false.
   * @default true
   * @stability stable
   */
  readonly autoMerge?: boolean;
  /**
   * Enable and configure the 'auto approve' workflow.
   * @default - auto approve is disabled
   * @stability stable
   */
  readonly autoApproveOptions?: github.AutoApproveOptions;
  /**
   * Options for renovatebot.
   * @default - default options
   * @stability stable
   */
  readonly renovatebotOptions?: RenovatebotOptions;
  /**
   * Use renovatebot to handle dependency upgrades.
   * @default false
   * @stability stable
   */
  readonly renovatebot?: boolean;
  /**
   * Options for .projenrc.json.
   * @default - default options
   * @stability stable
   */
  readonly projenrcJsonOptions?: ProjenrcJsonOptions;
  /**
   * Generate (once) .projenrc.json (in JSON). Set to `false` in order to disable .projenrc.json generation.
   * @default false
   * @stability stable
   */
  readonly projenrcJson?: boolean;
  /**
   * The shell command to use in order to run the projen CLI.
   * Can be used to customize in special environments.
   * @default "npx projen"
   * @stability stable
   */
  readonly projenCommand?: string;
  /**
   * The parent project, if this project is part of a bigger project.
   * @stability stable
   */
  readonly parent?: Project;
  /**
   * The root directory of the project.
   * Relative to this directory, all files are synthesized.
   *
   * If this project has a parent, this directory is relative to the parent
   * directory and it cannot be the same as the parent or any of it's other
   * subprojects.
   * @default "."
   * @stability stable
   */
  readonly outdir?: string;
  /**
   * Configure logging options such as verbosity.
   * @default {}
   * @stability stable
   */
  readonly logging?: LoggerOptions;
  /**
   * Configuration options for git.
   * @stability stable
   */
  readonly gitOptions?: GitOptions;
  /**
   * Configuration options for .gitignore file.
   * @stability stable
   */
  readonly gitIgnoreOptions?: IgnoreFileOptions;
  /**
   * Whether to commit the managed files by default.
   * @default true
   * @stability stable
   */
  readonly commitGenerated?: boolean;
  /**
   * This is the name of your project.
   * @default $BASEDIR
   * @stability stable
   * @featured true
   */
  readonly name: string;
}
