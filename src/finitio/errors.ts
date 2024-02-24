import * as $u from './support/utils';

class TypeError extends Error {

  location?: number
  rootCausesCache?: unknown
  causesCache?: unknown
  children?: unknown

  constructor(info) {
    super(computeMessage(info));
    $u.extend(this, info);
  }

  get locatedMessage() {
    if (this.location != null) {
      return `[${this.location}] ${this.message}`;
    } else {
      return this.message;
    }
  }

  get causes(): Array<TypeError> {
    // @ts-expect-error refactor
    return this.causesCache != null
      ? this.causesCache
      : (this.causesCache = this.children && computeCauses(this));
  }

  get cause() {
    return this.causes && this.causes[0];
  }

  get rootCauses() {
    return this.rootCausesCache != null
      ? this.rootCausesCache
      : (this.rootCausesCache = computeRootCauses(this, []));
  }

  get rootCause() {
    return this.rootCauses[this.rootCauses.length - 1];
  }

  explain() {
    let str = `${this.locatedMessage}\n`;
    if (this.rootCauses) {
      for (const c of this.rootCauses) {
        str += `  ${c.locatedMessage}\n`;
      }
    }
    return str;
  }

  explainTree(depth?: number) {
    let str = '';
    if (depth == null) { depth = 0; }
    for (let i = 0, end = depth, asc = 0 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
      str += '  ';
    }
    str += `${this.locatedMessage}\n`;
    if (this.causes != null) {
      for (const c of this.causes) {
        str += c.explainTree(depth + 1);
      }
    }
    return str;
  }
}

const computeMessage = function(info) {
  let msg = info.error;
  if (msg instanceof Array) {
    let data;
    [msg, data] = msg;
    let i = -1;
    return msg.replace(/\$\{([a-zA-Z]+)\}/g, match => {
      i += 1;
      const param = match.slice(2, match.length - 1);
      return $u.toString(info[param] || data[i]);
    });
  } else if (typeof(msg) == 'string') {
    return msg;
  } else {
    return info.toString();
  }
};

const computeCauses = (error): Array<TypeError> => $u.map(error.children, (c) => {
  c.location = appendPath(error.location, c.location);
  if (c instanceof TypeError) {
    return c;
  } else if (c instanceof Error) {
    // @ts-expect-error are we sure `new Error()` with three args works?
    return new TypeError({ error: c.message, location: c.location });
  } else {
    return new TypeError(c);
  }
});

const computeRootCauses = function(error, cache) {
  if (error.causes) {
    $u.each(error.causes, cause => computeRootCauses(cause, cache));
  } else {
    cache.push(error);
  }
  return cache;
};

const appendPath = function(parent, child) {
  if (child == null) { return parent; }
  if (parent == null) { return child; }
  return `${parent}/${child}`;
};

export default TypeError;
