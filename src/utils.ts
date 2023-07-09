import { Project } from 'projen';

/**
 * Return a value if the check value is truthy, undefined otherwise.
 */
export function ifSet(check: any, then: any): any {
  if (check) {
    return then;
  }
  return undefined;
}

/**
 * Return the list without undefined or null elements.
 */
export function noEmpties(list: any[]): any[] {
  return list.filter(e => e !== undefined && e !== null);
}

type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;

/**
 * Deep merge a user provided options object with defaults.
 * User options take precedence.
 */
export function deepDefaults<T>(options: DeepPartial<T> = {} as any, defaults: DeepPartial<T> = {} as any): T {
  return deepMerge(defaults, options);
}

/**
 * Immutable deep merging objects.
 */
export function deepMerge(...data: any[]): any {
  return [{}, ...data].reduce((result, current) => {
    Object.keys(current).forEach(key => {
      const resultValue = result[key];
      const currentValue = current[key];

      if (Array.isArray(resultValue) && Array.isArray(currentValue)) {
        result[key] = resultValue.concat(...currentValue);
      } else if (Array.isArray(currentValue)) {
        result[key] = [...currentValue];
      } else if (isPlainObject(resultValue) && isPlainObject(currentValue)) {
        result[key] = deepMerge(resultValue, currentValue);
      } else if (isPlainObject(currentValue)) {
        result[key] = deepMerge({}, currentValue);
      } else if (currentValue != null) {
        result[key] = currentValue;
      };
    });

    return result;
  }, {});
}


/**
 * Is this thing an object
 */
export function isObject(x: any): x is object {
  return Boolean(x && typeof x === 'object' && !Array.isArray(x));
}

/**
 * Is this thing a plain object (i.e. `{a: 1}`)
 */
export function isPlainObject(x: any): x is object {
  return Boolean(isObject(x) && Object.getPrototypeOf(x) === Object.prototype);
}

/**
 * Middleware stack to set default options
 */
export function defaultOptions<T>(...middleware: OptionsMiddleware<T>[]): OptionsMiddleware<T> {
  return (options: T) => middleware.reduce((opts, mw) => mw(opts), options);
}
export type OptionsMiddleware<T> = (options: T) => any;

/**
 * Middleware stack to configure features
 */
export function configureFeatures<T extends Project = Project>(...middleware: FeatureMiddleware<T>[]): FeatureMiddleware<T> {
  return (project: T, options: any) => middleware.reduce((p, mw) => mw(p, options), project);
}
export type FeatureMiddleware<T extends Project = Project> = (project: T, options: any) => T;


export type Mutable<T> = {
  -readonly[P in keyof T]: T[P]
};
