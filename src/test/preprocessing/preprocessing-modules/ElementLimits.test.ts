import { module as ElementLimits } from '../../../preprocessing/preprocessing-modules/ElementLimits';
import { JSDOM } from 'jsdom';

declare global {
  namespace NodeJS {
    interface Global {
      DOMParser: typeof DOMParser;
    }
  }
}

describe('SizeCheck module', () => {
  // tslint:disable:no-any
  const config = {} as any;

  beforeAll(() => {
    const dom = new JSDOM();
    global.DOMParser = dom.window.DOMParser;
  });

  afterAll(() => {
    delete global.DOMParser;
  });

  test('has correct name', () => {
    expect(ElementLimits.name).toBe('ElementLimits');
  });

  test('works when within limits', () => {
    const code = `
    <amp-state></amp-state>
    <amp-img></amp-img>
    `;

    const out = ElementLimits.process(code, config);
    expect(code).toBe(out);
  });

  test('throws if limit exceeded', () => {
    const code = `
    <amp-state></amp-state>
    <amp-state></amp-state>
    <amp-state></amp-state>
    <amp-state></amp-state>
    <amp-state></amp-state>
    <amp-state></amp-state>
    <amp-img></amp-img>
    `;
    expect(() => {
      ElementLimits.process(code, config);
    }).toThrow();
  });
});
