import TypeError from '../errors'

//******* Utilities

/**
  * Returns whether or not the parameter is an array
  *
  * Uses native `isArray` if present
  */
export const isArray = function(obj) {
  if (Array.isArray) {
    return Array.isArray(obj);
  } else {
    return toString.call(obj) === '[object Array]';
  }
};

/**
  * Detects whether the javascript environment is a browser or not (node)
  * (naive approach)
  */
export const isBrowser = function() {
  return typeof(window) === 'object';
};

/**
  * Returns wheter or not the parameter is an object
  */
export const isObject = function(obj) {
  return Object(obj) === obj;
};

/**
  * Returns wheter or not the parameter is a string
  */
export const isString = function(arg) {
  return Object.prototype.toString.call(arg) === '[object String]';
};

/**
  * Returns wheter or not the parameter is a function
  */
export const isFunction = function(arg) {
  return Object.prototype.toString.call(arg) === '[object Function]';
};

/**
  * Returns a new copy of an object (array, object or string supported)
  * !! Performs a deep copy
  */
export const deepClone = function(obj) {
  if (obj === null || obj === undefined) {
    argumentError('Object expected, got', obj);
  }

  if (!isObject(obj)) {
    return obj;
  }

  else if (obj instanceof Function) {
    return obj;
  }

  else if (isArray(obj)) {
    return obj.slice();
  }

  else {
    const copy = {};
    each(obj, (v, k) => {
      copy[k] = deepClone(v);
    });
    return copy;
  }
};

/**
  * Returns a new copy of an object (array, object or string supported)
  * !! Performs a shallow copy
  */
export const clone = function(obj) {
  if (obj === null || obj === undefined) {
    argumentError('Object expected, got', obj);
  }

  if (!isObject(obj)) {
    return obj;
  }

  return isArray(obj) ? obj.slice() : extend({}, obj);
};

/**
  * Extends the given object with all the properties of the passsed-in obejct(s)
  */
export const extend = function(obj, ...args) {
  each(args, (source) => {
    if (source) {
      for (const prop in source) {
        obj[prop] = source[prop];
      }
    }
  });
  return obj;
};

export const triSplit = function(x, y) {
  let attrs = null;
  let cur = null;
  const shared = {},
    left = {},
    right = {};

  // start with x
  attrs = keys(x);
  for (let i = 0; i < attrs.length; i++) {
    cur = attrs[i];
    if (y[cur] === undefined) {
      left[cur] = x[cur];
    } else {
      shared[cur] = [x[cur], y[cur]];
    }
  }

  // continue with y
  attrs = keys(y);
  for (let i = 0; i < attrs.length; i++) {
    cur = attrs[i];
    if (shared[cur] === undefined) {
      right[cur] = y[cur];
    }
  }

  return [shared, left, right];
};

//******* ARRAY

export const zip = function(dest, ...args) {
  if (!(isArray(dest))) {
    argumentError('Array expected, got', dest);
  }

  //
  const sources = args

  // Check validity first
  each(sources, (source) => {
    if (!(isArray(source))) {
      argumentError('Array expected, got', source);
    }
    if (size(source) !== size(dest)) {
      argumentError('Source(s) and destination Arrays must have same size');
    }
  });

  // Zip!
  const result = map(dest, (v, i) => {
    const array = [];
    array.push(v);
    each(sources, (source) => {
      array.push(source[i]);
    });
    return array;
  });

  return result;
};

export const difference = function(objA, objB) {
  if (!(isArray(objA))) {
    argumentError('Array expected, got', objA);
  }

  if (!(isArray(objB))) {
    argumentError('Array expected, got', objB);
  }

  return filter(objA, (v) => {
    return !contains(objB, v);
  });
};

export const uniq = function(array, isSorted?: boolean) {
  if (!(isArray(array))) {
    argumentError('Array expected, got', array);
  }
  if (typeof(isSorted) === 'undefined') {
    isSorted = false;
  }
  const result = [];
  let seen = [];
  for (let i = 0, length = array.length; i < length; i++) {
    const value = array[i];
    if (isSorted ? (!i || seen !== value) : !contains(seen, value)) {
      if (isSorted) {
        seen = value;
      } else {
        seen.push(value);
      }
      result.push(array[i]);
    }
  }
  return result;
};

export const inject = function(obj, start, callback) {
  // no date, regexp, undefined or null please
  if (!(obj instanceof Array)) {
    argumentError('Array expected, got', obj);
  }
  let res = start;
  for (let i = 0; i < obj.length; i++) {
    res = callback(res, obj[i]);
  }
  return res;
};

//******* ENUMERABLE

/**
  * Returns whether or not a given object is enumerable
  */
export const isEnumerable = function(obj) {
  if (obj === undefined || obj === null || obj instanceof RegExp ||
      obj instanceof Date || typeof(obj) === 'boolean') {
    return false;
  }
  return true;
};

/**
  * Iterates over an Enumerable (String, Array, Object)
  * ! warning: Doesn't iterates RegExp, Date, Boolean, undefined, null
  *
  * On String:  callback(character, position)
  * On Array:   callback(value, position)
  * On Objects: callback(value, key)
  *
  * TODO: use *forEach* if present
  */
export const each = function(obj, callback) {
  // callback can be undefined, but can't be null
  if (callback === null) {
    throw new Error('Function expected, got null');
  }
  if (callback === undefined) {
    callback = function() {};
  }

  // no date, regexp, undefined or null please
  if (!(isEnumerable(obj))) {
    throw new Error(`Enumerable (Array, Object, String) expected, got ${obj}`);
  }

  // Strings
  if (typeof(obj) === 'string') {
    return each(obj.split(''), callback);
  }

  // Arrays
  if (obj instanceof Array) {
    for (let i = 0; i < obj.length; i++) {
      callback(obj[i], i);
    }
    return;
  }

  // Objects
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      callback(obj[key], key);
    }
  }
};

/**
  * Returns true if all of the iteration over the enumerable pass the predicate truth test
  *
  * Uses #each to iterate
  * TODO: delegate to *every* if present
  */
export const every = function(obj, callback) {
  // callback can be undefined, but can't be null
  if (callback === null || callback === undefined) {
    argumentError('Function expected, got', callback);
  }

  // TODO: review this. How can we stop iterating
  // as soon as possible? (other than using exceptions)
  try {
    each(obj, (v, k) => {
      const pass = callback(v, k);
      if (pass !== true) {
        throw 'fail';
      }
    });
  } catch (e) {
    // If a real exception was raised, forward it
    if (e !== 'fail') {
      throw e;
    }
    return false;
  }

  return true;
};

/**
  * Returns the first element that apsses a truth test
  *
  * Uses #each to iterate
  * TODO: use *every* if present
  */
export const find = function(obj, callback) {
  // callback can be undefined, but can't be null
  if (callback === null || callback === undefined) {
    argumentError('Function expected, got', callback);
  }

  // TODO: review this. How can we stop iterating
  // as soon as possible? (other than using exceptions)
  try {
    each(obj, (v, k) => {
      const pass = callback(v, k);
      if (pass) {
        throw { found: v };
      }
    });
  } catch (e) {
    // If a real exception was raised, forward it
    if (typeof(e.found) === 'undefined') {
      throw e;
    }
    return e.found;
  }

  return null;
};

/**
  * Returns true if any of the iteration over the enumerable pass the predicate truth test
  *
  * Uses #each to iterate
  */
export const any = function(obj, callback) {
  // callback can be undefined, but can't be null
  if (callback === null || callback === undefined) {
    argumentError('Function expected, got', callback);
  }

  // TODO: review this. How can we stop iterating
  // as soon as possible? (other than using exceptions)
  try {
    each(obj, (v, k) => {
      const pass = callback(v, k);
      if (pass === true) {
        throw 'gotcha';
      }
    });
  } catch (e) {
    // If a real exception was raised, forward it
    if (e !== 'gotcha') {
      throw e;
    }
    return true;
  }

  return false;
};

/**
  * Returns the values of an enumerable that pass a truth test
  *
  * Uses #each to iterate
  * TODO: use *every* if present
  */
export const filter = function(obj, callback) {
  // callback can be undefined, but can't be null
  if (callback === null || callback === undefined) {
    argumentError('Function expected, got', callback);
  }

  const values = [];
  each(obj, (v) => {
    if (callback(v)) {
      values.push(v);
    }
  });
  return values;
};

/**
  * Returns the values of an enumerable that don't pass the truth test
  * (the exact opposite as filter)
  *
  * Uses #each to iterate
  * TODO: use *every* if present
  */
export const reject = function(obj, callback) {
  // callback can be undefined, but can't be null
  if (callback === null || callback === undefined) {
    argumentError('Function expected, got', callback);
  }

  const values = [];
  each(obj, (v) => {
    if (!callback(v)) {
      values.push(v);
    }
  });
  return values;
};

/**
  * Produces a new array of values by mapping each value in list through a
  * transformation function
  *
  * Uses #each to iterate
  * TODO: use *map* if present
  */
export const map = function(obj, callback) {
  // callback can be undefined, but can't be null
  if (callback === null || callback === undefined) {
    argumentError('Function expected, got', callback);
  }
  const values = [];
  each(obj, (v, k) => {
    values.push(callback(v, k));
  });
  return values;
};

/**
  * Reduces collection to a value which is the accumulated result of running each element in collection through callback
  * where each successive invocation is supplied the return value of the previous
  * The iteratee is invoked with four arguments: (accumulator, value, index|key, collection).
  */
export const reduce = function(collection, accumulator, callback) {
  if (callback === null || callback === undefined) {
    argumentError('Function expected, got', callback);
  }
  each(collection, (v, k) => {
    accumulator = callback(accumulator, v, k, collection);
  });
  return accumulator;
};

/**
  * Returns the values of an Enumerable (Enumerable (String, Array, Object)
  *
  * ! warning: throws error if called for a non-enumerable
  *
  * Uses #each to iterate
  */
export const values = function(obj) {
  if (obj instanceof Array) {
    return obj;
  }
  const values = [];
  each(obj, (v) => {
    values.push(v);
  });
  return values;
};

/**
  * Returns the keys of an Enumerable (Enumerable (String, Array, Object)
  *
  * String: array of character positions
  * Array: array of indices
  * Objects: array of keys
  *
  * ! warning: throws error if called for a non-enumerable
  * ! warning: all keys will be strings, whatever is the enumerable
  *
  * Uses #each to iterate
  */
export const keys = function(obj) {
  const keys = [];
  each(obj, (v, k) => {
    keys.push(k);
  });
  return keys;
};

/**
  * Returns the number of values of an Enumerable (String, Array, Object)
  *
  * ! warning: throws error if called for a non-object (even Array)
  *
  * Uses #each to iterate
  */
export const size = function(obj) {
  return values(obj).length;
};

/**
  * Returns whether or not an enumerable is empty
  */
export const isEmpty = function(obj) {
  return size(obj) === 0;
};

// Determine if the array or object contains a given value (using `===`).
// Aliased as `include`.
export const contains = function(obj, target) {
  if (!isEnumerable(obj)) {
    argumentError('Enumerable (Array, Object, String) expected, got', obj);
  }
  const nativeIndexOf = Array.prototype.indexOf;
  if (nativeIndexOf && obj.indexOf === nativeIndexOf) {
    return obj.indexOf(target) !== -1;
  }
  const found = find(obj, (v) => {
    return v === target;
  });
  return found !== null;
};
export const include = contains;

//******* STRINGS

/**
  * Capitalizes a string
  *
  * foo => Foo
  * fooBar => FooBar
  * foo bar => FooBar
  * foo_bar => FooBar
  **/
export const capitalize = function(obj) {
  if (typeof(obj) !== 'string') {
    argumentError('String expected, got', obj);
  }
  if (obj.trim() === '') {
    return obj;
  }

  let string = obj,
    tokens = null,
    i = null;

  // Remove underscores
  if (string.indexOf('_') !== -1) {

    tokens = string.split('_');

    for (i = 0; i < tokens.length; i++) {
      tokens[i] = capitalize(tokens[i]);
    }

    string = tokens.join('');
  }

  // Remove spaces
  if (string.indexOf(' ') !== -1) {

    tokens = string.split(' ');

    for (i = 0; i < tokens.length; i++) {
      tokens[i] = capitalize(tokens[i]);
    }

    string = tokens.join('');
  }

  // Capitalize first letter
  string = string[0].toUpperCase() + string.slice(1);
  return string;
};

export const toString = function(value) {
  if (value === undefined) {
    return 'undefined';
  } else if (value === null) {
    return 'null';
  } else {
    let s = value.toString();
    if (s === '[object Object]') {
      s = JSON.stringify(value);
    }
    if (s.length > 30) {
      s = `${s.substring(0, 30)}...`;
    }
    if (value instanceof Array) {
      s = `[${s}]`;
    }
    return s;
  }
};

// ---------------------------------------------------------- Error Management

export const argumentError = function(...args) {
  let msg = '';
  const toString = function(arg) {
    if (arg === null) {
      return 'null';
    } else if (arg === undefined) {
      return 'undefined';
    } else {
      return arg.toString();
    }
  };
  each(args, (arg) => {
    if (msg.length !== 0) {
      msg += ' ';
    }
    msg += toString(arg);
  });
  throw new Error(msg);
};

export const notImplemented = function(obj, meth) {
  throw new Error(`${obj.constructor.name}#${meth}`);
};

export const dressError = function(failure) {
  throw new TypeError(failure);
};

export const undressError = function(msg, cause?: unknown, location?: unknown) {
  // @ts-expect-error are we sure this works as expected?
  throw new Error(msg, cause, location);
};

