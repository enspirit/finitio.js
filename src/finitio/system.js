import { ObjectType } from './support/ic';
import $u from './support/utils';
import Fetchable from './support/fetchable';

//
// A System is a collection of named Finitio types.
//
class System {

  static REF_RGX = /^(?:([a-z][a-z0-9]*)\.)?(.*?)$/;

  constructor(imports, types) {
    this.imports = imports;
    this.types = types;
    if (this.imports == null) { this.imports = []; }
    if (this.types == null) { this.types = []; }
    $u.each(this.types, t => { return this[t.name] = t.trueOne(); });
  }

  resolve(ref, callback) {
    const match = ref.match(System.REF_RGX);
    if (match[1]) {
      return this._resolveQualified(match, callback);
    } else {
      const relevant = $u.filter(this.imports, i => !i.qualifier);
      return this._resolveImported([{ system: this }].concat(relevant), ref, callback);
    }
  }

  dress(value, world) {
    if (!this.Main) {
      throw new Error('No main on System');
    }
    return this.Main.dress(value, world);
  }

  undress(value, world) {
    if (!this.Main) {
      throw new Error('No main on System');
    }
    return this.Main.undress(value, this.Main.low());
  }

  clone() {
    return new System($u.clone(this.imports), $u.clone(this.types));
  }

  subsystem(source, world) {
    const Finitio = require('../finitio').default;
    if (typeof(source) === 'string') { source = Finitio.parse(source); }
    const newsource = {
      types: [].concat(this.types, source.types).filter(Boolean),
      imports: [].concat(this.imports, source.imports).filter(Boolean),
    };
    return Finitio.Meta.System.dress(newsource, Finitio.world(world));
  }

  // Private

  _resolveQualified(match, callback) {
    let sub;
    if (callback == null) { callback = this._onResolveFailure(match[0]); }
    const imp = $u.find(this.imports, u => u.qualifier === match[1]);
    if ((sub = imp && imp.system)) {
      return this._resolveSingle(sub, match[2], callback);
    } else {
      return this._onResolveFailure(match[0])();
    }
  }

  _resolveImported(chain, ref, callback) {
    if (callback == null) { callback = this._onResolveFailure(ref); }
    return chain[0].system.fetchPath(ref, () => {
      if (chain.length > 1) {
        return this._resolveImported(chain.slice(1), ref, callback);
      } else {
        return callback();
      }
    });
  }

  _resolveSingle(system, ref, callback) {
    return system.fetchPath(ref, callback);
  }

  _onResolveFailure(ref) {
    return function() { throw new Error(`No such type \`${ref}\``); };
  }
}

ObjectType(System, ['imports', 'types'], s => $u.each(s.types, t => t.resolveProxies(s)));

Fetchable(System, 'types', 'type', function(name) {
  return $u.find(this.types, t => t.name === name);
});

//
export default System;
