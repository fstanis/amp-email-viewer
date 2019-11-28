import { Config } from '../../config';

interface PreprocessingModule {
  name: string;
  process: (amp: string, config: Config) => string | Promise<string>;
}

import { module as Validator } from './Validator';
import { module as BrowserDetection } from './BrowserDetection';

export const modules: PreprocessingModule[] = [BrowserDetection, Validator];
