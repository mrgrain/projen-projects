
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

/**
 * Deep merge a user provided options object with defaults.
 * User options take precedence.
 */
export function deepDefaults<T>(options: Partial<T> = {} as any, defaults: Partial<T> = {} as any): T {
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
      } else {
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
