import type { TypeMetadata } from '../../types';
import { TypeType } from '../support/ic';
import Type from '../type';

//
class AnyType extends Type {

  constructor(metadata?: TypeMetadata) {
    super(metadata);
  }

  _mDress(value, Monad) {
    return Monad.success(value);
  }

  _include(_value) {
    return true;
  }

  _isSuperTypeOf(_other) {
    return true;
  }

  _equals(other) {
    return (other instanceof AnyType) || super._equals(other);
  }

  low(): Type {
    return this;
  }

  resolveProxies(_system) {

  }

  toString() {
    return '.';
  }
}

TypeType(AnyType, 'any', ['metadata']);

export default AnyType;
