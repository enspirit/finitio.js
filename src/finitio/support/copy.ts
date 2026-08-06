/**
 * Structural copy of a type tree, leaving every proxy unresolved.
 *
 * Instantiating a generic binds its parameters by resolving the proxies in
 * its body, and `TypeRef` caches whatever it resolves to. A generic used more
 * than once therefore needs a copy of its body per instantiation, otherwise
 * the second instantiation silently reuses the first one's bindings:
 *
 *     Page<T> = { items: [T] }
 *     { a: Page<Person>, b: Page<Product> }   # b would see Person
 *
 * Nodes describe themselves through `toInfo()` and rebuild through their
 * class's `info()`, the same pair the Meta level uses to dress a system from
 * its AST. Neither carries `target`, so proxies come back out unresolved,
 * which is exactly what a fresh instantiation needs.
 *
 * Natives are shared rather than copied: functions, regexps and host classes
 * carry behaviour, not structure, and a constraint must stay the very same
 * function it was compiled to.
 */

const isRebuildable = (node): boolean =>
  typeof node?.toInfo === 'function' &&
  typeof node?.constructor?.info === 'function';

const isPlainObject = (node): boolean => {
  if (node === null || typeof node !== 'object') { return false; }
  if (Array.isArray(node) || node instanceof RegExp || node instanceof Date) {
    return false;
  }
  const proto = Object.getPrototypeOf(node);
  return proto === Object.prototype || proto === null;
};

const copy = (node) => {
  if (Array.isArray(node)) {
    return node.map(copy);
  }

  // Types, headings, attributes, contracts, constraints: everything the Meta
  // level knows how to dress and undress.
  if (isRebuildable(node)) {
    const info = node.toInfo();
    const copied = {};
    for (const key of Object.keys(info)) {
      copied[key] = copy(info[key]);
    }
    return node.constructor.info(copied);
  }

  // Bags of options, such as a heading's `allowExtra`, and metadata.
  if (isPlainObject(node)) {
    const copied = {};
    for (const key of Object.keys(node)) {
      copied[key] = copy(node[key]);
    }
    return copied;
  }

  return node;
};

export default copy;
