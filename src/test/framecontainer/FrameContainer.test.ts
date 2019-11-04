import anyTest, {TestInterface} from 'ava';
import {FrameContainer} from '../../framecontainer/FrameContainer';

const test = anyTest as TestInterface<{
  parentDiv: HTMLElement;
}>;

test.beforeEach(t => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  t.context = {
    parentDiv: div,
  };
});

test('render() creates iframe', async t => {
  const {parentDiv} = t.context;
  const viewer = new FrameContainer(parentDiv, 'https://empty.example/');
  try {
    await viewer.render('');
  } catch (_) {
  }
  t.assert(parentDiv.querySelector('iframe'));
});

test('render() removes old iframe', async t => {
  const {parentDiv} = t.context;
  const viewer = new FrameContainer(parentDiv, 'https://empty.example/');
  await viewer.render('');
  const oldIframe = parentDiv.querySelector('iframe');
  await viewer.render('');
  t.assert(oldIframe !== parentDiv.querySelector('iframe'));
});
