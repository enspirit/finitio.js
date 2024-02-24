import { ObjectType } from './support/ic';
import * as $u from './support/utils';
import Fetchable from './support/fetchable';
import type { AcceptedInput, DressedType, Import, TypeCollection, World } from '../types';
import type Type from './type';
import type { TypeRef } from '../finitio';
import Finitio, { Meta } from '../finitio'

type ResolveCallback = () => void

//
// A System is a collection of named Finitio types.
//
// @ts-expect-error TODO fix this
class System<T extends TypeCollection> implements T {

  static REF_RGX = /^(?:([a-z][a-z0-9]*)\.)?(.*?)$/;

  Main!: T['Main']

  constructor(public imports: Array<Import<T>> = [], public types: Array<Type> = []) {
    $u.each(this.types, t => { return this[t.name] = t.trueOne(); });
  }

  resolve(ref, callback?: ResolveCallback) {
    const match = ref.match(System.REF_RGX);
    if (match[1]) {
      return this._resolveQualified(match, callback);
    } else {
      const relevant = $u.filter(this.imports, i => !i.qualifier);
      return this._resolveImported([{ system: this }].concat(relevant), ref, callback);
    }
  }

  dress(value: AcceptedInput<T['Main']>, world?: World): DressedType<T['Main']> {
    if (!this.Main) {
      throw new Error('No main on System');
    }

    return this.Main.dress(value, world) as DressedType<T['Main']>;
  }

  undress(value: unknown, _world?: World) {
    if (!this.Main) {
      throw new Error('No main on System');
    }
    return this.Main.undress(value, this.Main.low());
  }

  clone() {
    return new System($u.clone(this.imports), $u.clone(this.types));
  }

  subsystem(source, world) {
    if (typeof(source) === 'string') { source = Finitio.parse(source); }
    const newsource = {
      types: [].concat(this.types, source.types).filter(Boolean),
      imports: [].concat(this.imports, source.imports).filter(Boolean),
    };
    return Meta.System.dress(newsource, Finitio.world(world));
  }

  // Private

  _resolveQualified(match, callback?: ResolveCallback) {
    let sub;
    if (callback == null) { callback = this._onResolveFailure(match[0]); }
    const imp = $u.find(this.imports, u => u.qualifier === match[1]);
    if ((sub = imp && imp.system)) {
      return this._resolveSingle(sub, match[2], callback);
    } else {
      return this._onResolveFailure(match[0])();
    }
  }

  _resolveImported(chain, ref, callback?: ResolveCallback) {
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

  _onResolveFailure(ref: TypeRef) {
    return function() {
      throw new Error(`No such type \`${ref}\``);
    };
  }
}

ObjectType(System, ['imports', 'types'], s => $u.each(s.types, t => t.resolveProxies(s)));

Fetchable(System, 'types', 'type', function(name) {
  return $u.find(this.types, t => t.name === name);
});

//
export default System;
