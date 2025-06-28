import { deepMerge, type OptionsMiddleware } from '../utils';

export function makeMiddleware<T>(defaults: Partial<T>): OptionsMiddleware<Partial<T>> {
  return (options) => deepMerge(defaults, options);
}
