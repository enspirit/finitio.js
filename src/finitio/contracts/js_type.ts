export default {

  name: {

    dress: function(name, world) {
      let resolved = null;
      if (world) {
        resolved = (new Function('world', `return world.${name};`))(world);
      } else {
        resolved = (new Function(`return ${name};`))();
      }
      if (resolved) {
        return resolved;
      } else {
        let msg = `Unknown javascript type: \`${name}\` (`;
        msg += Object.keys(world).toString();
        msg += ')';
        throw new Error(msg);
      }
    },

    undress: function(_fn) {
      throw new Error('Unimplemented');
    },

  },

};
