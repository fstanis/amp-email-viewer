import { module as SizeCheck } from '../../../preprocessing/preprocessing-modules/SizeCheck';

describe('SizeCheck module', () => {
  test('has correct name', () => {
    expect(SizeCheck.name).toBe('SizeCheck');
  });

  test('works with no size limit', () => {
    const code = 'Hello world';
    // tslint:disable:no-any
    const out = SizeCheck.process(code, {} as any);
    expect(code).toBe(out);
  });

  test('works when within limit', () => {
    const code = 'Hello world';
    // tslint:disable:no-any
    const out = SizeCheck.process(code, { maximumAMPSize: 100 } as any);
    expect(code).toBe(out);
  });

  test('throws if limit exceeded', () => {
    const code = 'Hello world';
    expect(() => {
      // tslint:disable:no-any
      SizeCheck.process(code, { maximumAMPSize: 10 } as any);
    }).toThrow();
  });
});
