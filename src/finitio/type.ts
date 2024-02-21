import * as $u from './support/utils';
import DressMonad from './support/dress_monad';
import type { TypeMetadata } from '../types';
import { InformationContract } from '../types';

//
// 'Abstract' class for Finitio types
//
class Type extends InformationContract {

  // TODO
  generator!: string

  constructor(public metadata: TypeMetadata) {
    super();
  }

  static factor(from) {
    return from[Object.keys(from)[0]];
  }

  toFactor() {
    const to = { };
    to[this.generator] = this;
    return to;
  }

  //
  // Returns true if `value` is valid member of this type, false otherwise.
  //
  include(value: unknown) {
    return this._include(value);
  }

  _include(_value: unknown): boolean {
    return $u.notImplemented(this, 'include');
  }

  low(): Type {
    return $u.notImplemented(this, 'low');
  }

  //
  // Dress `value` with this information type and returns the result.
  //
  // @return the dressing result
  // @pre    true
  // @post   this.include(output)
  // @throws `TypeError` if the dressing fails
  //
  dress<T>(value, world): T {
    const monad = this.mDress<T>(value, new DressMonad<T>(world));
    if (monad.isSuccess()) {
      return monad.result;
    } else {
      return $u.dressError(monad.error);
    }
  }

  mDress<T>(value, Monad): DressMonad<T> {
    return this._mDress<T>(value, Monad);
  }

  _mDress<T>(_value, _Monad): DressMonad<T> {
    return $u.notImplemented(this, '_mDress');
  }

  //
  // Undress `value` as a member of `as` type.
  //
  // @param  `as` another Type instance
  // @return the undressed result
  // @pre    this.include(value)
  // @post   as.include(output)
  // @throw  `TypeError` if undressing fails
  //
  undress(value, as) {
    return this._undress(value, as.trueOne());
  }

  _undress(value, as) {
    // if `as` is a supertype of myself, then
    //   pre                 => post
    //   this.include(value) => as.include(value)
    if (as.isSuperTypeOf(this)) { return value; }

    // Fall back to checking post condition explicitely
    if (as.include(value)) { return value; }

    // otherwise, just fail
    return $u.undressError(`Unable to undress \`${value}\` from ${this} to \`${as}\``);
  }

  //
  // Returns true of `this` is a super type of `other`, false otherwise.
  //
  isSuperTypeOf(other) {
    return this._isSuperTypeOf(other.trueOne());
  }

  _isSuperTypeOf(other) {
    return this.equals(other) || other._isSubTypeOf(this);
  }

  //
  // Returns true if `this` is known to be a subtype of `other`, false
  // otherwise.
  //
  // This method is private and should not be called directly. It is a fallback
  // strategy for isSuperTypeOf.
  //
  // The implementation MAY NOT call `isSuperTypeOf` to meet the contract. So
  // if you wonder whether `x.isSubTypeOf(y)`, use `y.isSuperTypeOf(x)`
  // instead.
  //
  _isSubTypeOf(_other: unknown) {
    return false;
  }

  //
  // Returns this
  //
  fetchType() {
    return this;
  }

  //
  // Returns true for fake types, false otherwise.
  //
  // Fake types are Alias and Proxy.
  //
  isFake() {
    return false;
  }

  //
  // Returns the true type to be used in comparisons and hierachy queries
  //
  trueOne(): Type {
    return this;
  }

  //
  // Returns true if `other` is structurally equivalent to this type, false
  // otherwise.
  //
  equals(other) {
    return (other instanceof Type) && this._equals(other.trueOne());
  }

  _equals(other) {
    return this === other;
  }

  resolveProxies(_system): Type|void {
    return $u.notImplemented(this, 'resolveProxies');
  }
}

export default Type;
