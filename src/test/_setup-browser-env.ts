// @ts-ignore
import browserEnv from 'browser-env';
// @ts-ignore
import {JSDOM, ResourceLoader} from 'jsdom';

const JSDOM_CONFIG = {
  resources: new (class extends ResourceLoader {
    fetch(url: string, options: Object) {
      if (url.startsWith('https://empty.example/')) {
        return Promise.resolve(Buffer.from(''));
      }
      return super.fetch(url, options);
    }
  })(),
};

function load() {
  const window = new JSDOM('', JSDOM_CONFIG).window;
  window.crypto = {
    getRandomValues: (bytes: any) => {},
  };
  for (const prop of Object.getOwnPropertyNames(window)) {
    if (typeof (global as any)[prop] !== 'undefined') {
      continue;
    }
    Object.defineProperty(global, prop, {
      configurable: true,
      get: () => window[prop],
    });
  }
}

load();
