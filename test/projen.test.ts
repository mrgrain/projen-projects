import { synthSnapshot } from 'projen/lib/util/synth';
import { ProjenProject } from '../src';

test('default snapshot', () => {
  const project = new ProjenProject({
    authorName: 'Test Author',
    repo: 'mrgrain/test',
    release: true,
  });

  expect(synthSnapshot(project)).toMatchSnapshot();
});

test('does have a projen peer dep', () => {
  const project = new ProjenProject({
    authorName: 'Test Author',
    repo: 'mrgrain/test',
  });

  expect(synthSnapshot(project)['package.json'].peerDependencies).toHaveProperty('projen', '0.x >=0.75.0');
});
