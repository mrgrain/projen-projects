import { synthSnapshot } from 'projen/lib/util/synth';
import { TypeScriptProject } from '../src';

test('default snapshot', () => {
  const project = new TypeScriptProject({
    authorName: 'Test Author',
    repo: 'mrgrain/test',
    release: true,
  });

  expect(synthSnapshot(project)).toMatchSnapshot();
});

test('can set dependency with version constraint', () => {
  const project = new TypeScriptProject({
    authorName: 'Test Author',
    repo: 'mrgrain/test',
    release: true,
    devDeps: ['jest@27'],
  });

  expect(synthSnapshot(project)).toMatchSnapshot();
});

test('can set custom workflow version', () => {
  const project = new TypeScriptProject({
    authorName: 'Test Author',
    repo: 'mrgrain/test',
    workflowNodeVersion: 'lts/-1',
  });

  expect(synthSnapshot(project)['.github/workflows/build.yml']).toContain('lts/-1');
});

test('does not have a projen peer dep', () => {
  const project = new TypeScriptProject({
    authorName: 'Test Author',
    repo: 'mrgrain/test',
  });

  expect(synthSnapshot(project)['package.json'].peerDependencies?.projen).toBeUndefined();
});

