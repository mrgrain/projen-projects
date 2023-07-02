import { synthSnapshot } from 'projen/lib/util/synth';
import { ProjenProject } from '../src';

test('default snapshot', () => {
  const project = new ProjenProject({
    author: 'Test Author',
    repo: 'mrgrain/test',
    release: true,
  });

  expect(synthSnapshot(project)).toMatchSnapshot();
});
