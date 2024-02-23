import type { TypeMetadata } from '../../types';
import { TypeType } from '../support/ic';
import * as $u from '../support/utils';
import Type from '../type';

class TypeRef extends Type {

  constructor(public typeName: string, metadata?: TypeMetadata, public target?: Type) {
    super(metadata);

    if (!this.typeName) {
      $u.argumentError('Proxied ref cannot be null on TypeRef');
    }
  }

  fetch(...args) {
    const r = this.resolved();
    // @ts-expect-error improve Fetchable to be an actual interface/trait
    return r.fetch.apply(r, [...args]);
  }

  _include(value) {
    return this.resolved().include(value);
  }

  _mDress<T>(value, Monad) {
    return this.resolved().mDress<T>(value, Monad);
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
    if (this.target != null) {
      return this.target;
    }

    this.target = system.resolve(this.typeName).fetchType();
    return this.target;
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
