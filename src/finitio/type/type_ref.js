import { TypeType } from '../support/ic';
import $u from '../support/utils';
import Type from '../type';

class TypeRef extends Type {

  constructor(typeName, metadata, target) {
    super(metadata);
    this.typeName = typeName;
    this.target = target;

    if (!this.typeName) {
      $u.argumentError('Proxied ref cannot be null on TypeRef');
    }
  }

  fetch() {
    const r = this.resolved();
    return r.fetch.apply(r, arguments);
  }

  _include(value) {
    return this.resolved().include(value);
  }

  _mDress(value, Monad) {
    return this.resolved().mDress(value, Monad);
  }

  _undress(value, as) {
    return this.resolved().undress(value, as);
  }

  _isSuperTypeOf(child) {
    return this.resolved().isSuperTypeOf(child);
  }

  _isSubTypeOf(sup) {
    return this.resolved()._isSubTypeOf(sup);
  }

  _equals(other) {
    return this.resolved().equals(other);
  }

  // private API

  isFake() {
    return true;
  }

  trueOne() {
    return this.resolved().trueOne();
  }

  low() {
    return this.resolved().low();
  }

  resolve(system) {
    return this.target != null ? this.target : (this.target = system.resolve(this.typeName).fetchType());
  }

  resolveProxies(system) {
    return this.resolve(system);
  }

  resolved() {
    if (!this.target) {
      throw new Error('Proxy is not resolved');
    }
    return this.target;
  }

  toString() {
    return this.typeName;
  }
}

TypeType(TypeRef, 'ref', ['typeName', 'metadata']);

//
export default TypeRef;
