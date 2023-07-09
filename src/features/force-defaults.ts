import { OptionsMiddleware } from '../utils';

export function makeMiddleware<T>(defaults: any): OptionsMiddleware<T> {
  return (options) => ({
    ...options,
    ...defaults,
  });
}
