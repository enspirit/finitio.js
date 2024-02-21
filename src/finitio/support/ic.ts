import * as $u from './utils';

const invokeConstructor = (c, args) => {
  // create a fake constructor
  const T = function() {};
  T.prototype = c.prototype;

  // create an instance
  const inst = new T();

  // call the real constructor now
  const ret = new c(...args);

  // return the instance
  return Object(ret) === ret ? ret : inst;
};

const AbstractType = (base, subs, properties, rawindex) => {

  base.info = function(from) {
    const sub = $u.find(subs, (s) => { return !!from[s.prototype.kind]; });
    if (sub) {
      const args = [];
      for (let i = 0; i < properties.length; i++) {
        const propname = (i === rawindex ? sub.prototype.kind : properties[i]);
        const propval = from[propname];
        if (propval) {
          args[i] = propval;
        }
      }
      return invokeConstructor(sub, args);
    } else {
      const dump = JSON.stringify(from);
      $u.argumentError(`Unrecognized ${base.name} info: `, dump);
    }
  };

  base.prototype.toInfo = function() {
    const to = {};
    for (let i = 0; i < properties.length; i++) {
      const name = (i === rawindex ? this.kind : properties[i]);
      const value = this[properties[i]];
      if (value !== undefined) {
        to[name] = value;
      }
    }
    return to;
  };

};

const ObjectType = (base, properties, onDressed?: (inst, world) => void) => {

  base.info = function(from, world) {
    const args = [];
    for (let i = 0; i < properties.length; i++) {
      const propval = from[properties[i]];
      if (propval !== undefined) {
        args[i] = propval;
      }
    }
    const inst = invokeConstructor(base, args);
    if (onDressed) {
      onDressed(inst, world);
    }
    return inst;
  };

  base.prototype.toInfo = function() {
    const to = {};
    for (let i = 0; i < properties.length; i++) {
      const name = properties[i];
      const value = this[name];
      if (value !== undefined) {
        to[name] = value;
      }
    }
    return to;
  };

};

const TypeType = (base, generator, properties) => {
  base.prototype.generator = generator;
  ObjectType(base, properties);
};

export {
  AbstractType,
  ObjectType,
  TypeType,
};
