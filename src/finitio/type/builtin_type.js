import { TypeType } from '../support/ic';
import Type from '../type';

//
class BuiltinType extends Type {

  constructor(jsType, metadata) {
    super(metadata);
    this.jsType = jsType;
  }

  _equals(other) {
    return this === other ||
      (other instanceof BuiltinType && (other.jsType === this.jsType)) ||
      super._equals(other);
  }

  _mDress(value, Monad) {
    if (this.include(value)) {
      return Monad.success(value);
    } else {
      const params = [this.jsType.name, value];
      return Monad.failure(this, ['Invalid ${typeName}: `${value}`', params]);
    }
  }

  _include(value) {
    return value instanceof this.jsType || ((value != null) && (value.constructor === this.jsType));
  }

  low() {
    return this;
  }

  toString() {
    return `.${this.jsType.name.toString()}`;
  }

  resolveProxies(system) {}
}

TypeType(BuiltinType, 'builtin', ['jsType', 'metadata']);

export default BuiltinType;
