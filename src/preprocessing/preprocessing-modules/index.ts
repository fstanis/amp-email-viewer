import { Config } from '../../config';

interface PreprocessingModule {
  name: string;
  process: (amp: string, config: Config) => string | Promise<string>;
}

import { module as Validator } from './Validator';
import { module as SizeCheck } from './SizeCheck';
import { module as ElementLimits } from './ElementLimits';

export const modules: PreprocessingModule[] = [
  SizeCheck,
  Validator,
  ElementLimits,
];
