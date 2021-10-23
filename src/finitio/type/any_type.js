import { TypeType } from '../support/ic';
import Type from '../type';

//
class AnyType extends Type {

  constructor(metadata) {
    super(metadata);
  }

  _mDress(value, Monad) {
    return Monad.success(value);
  }

  _include(value) {
    return true;
  }

  _isSuperTypeOf(other) {
    return true;
  }

  _equals(other) {
    return (other instanceof AnyType) || super._equals(...arguments);
  }

  low() {
    return this;
  }

  resolveProxies(system) {}

  toString() {
    return '.';
  }
}

TypeType(AnyType, 'any', ['metadata']);

export default AnyType;
