import * as $u from '../support/utils';

export default {

  /**
   * Information contract for javascript function references.
   *
   * Those references are qualified names that will be resolved
   * on the world at dressing time. E.g.,
   *
   * ```
   *   var world = { _: { isEven: function(i){...} } };
   *   var func = Function.reference("_.isEven")
   * ```
   *
   * There is not guarantee that the returned function is exactly
   * the one the world. In practice, it is wrapped in a decorator
   * to keep track of how the function was obtained; this is done
   * for undressing purposes.
   */
  reference: {

    /*
      * Resolves `source` using the `world` to initiate the
      * qualified name resolution.
      *
      * Return (a wrapper over) the function found. Raises an error
      * if the function cannot be found or is not a function.
      */
    dress: function(source, world) {
      // resolve the function
      const identifiers = source.split('.');
      const original = $u.reduce(identifiers, world, (acc, id, _idx) => {
        if (acc[id] === undefined || acc[id] === null) {
          throw new Error(`${source} is undefined`);
        }
        return acc[id];
      });

      if (typeof(original) !== 'function') {
        throw new Error(`${source} must resolve to a Function`);
      }

      // Decorate, keep track of reference and return it
      const func = function(...args) {
        return original.apply(this, [...args]);
      };
      func.nativeToString = function() {
        return source;
      };
      return func;
    },

    /**
     * Undresses function `fn` to a function reference.
     *
     * This method only works if `fn` has been previously obtained
     * through `dress`. It raises an error otherwise.
     */
    undress: function(fn) {
      if (fn.nativeToString) {
        return fn.nativeToString();
      }
      throw new Error('Unimplemented');
    },

  },

};
