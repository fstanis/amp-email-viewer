import { Config } from '../../config';
import { getInstance as getValidatorInstance } from 'amphtml-validator';

const FORMAT = 'AMP4EMAIL';

/**
 * Throws if the given code is not valid AMP.
 *
 * @param {string} amp AMP code to validate
 * @param {Config} config Global config
 * @return {Promise<string>} Validated AMP code
 */
async function process(amp: string, config: Config): Promise<string> {
  const validator = await getValidatorInstance();
  const result = validator.validateString(amp, FORMAT);
  if (result.status !== 'PASS') {
    // TODO: add errors inside this object
    throw new Error('AMP validation failed');
  }
  return amp;
}

export const module = {
  name: 'Validator',
  process,
};
