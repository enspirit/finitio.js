import { ObjectType } from '../support/ic';
import Type from '../type';
import $u from '../support/utils';

class TypeDef extends Type {

  constructor(type, name, metadata) {
    super(metadata);
    this.type = type;
    this.name = name;
    if (!this.name) {
      $u.argumentError('Name cannot be null on TypeDef');
    }
    this.generator = this.type.generator;
  }

  fetch() {
    return this.type.fetch.apply(this.type, arguments);
  }

  _include(value) {
    return this.type.include(value);
  }

  _mDress(value, Monad) {
    const m = this.type.mDress(value, Monad);
    return m.onFailure(cause => {
      if (this.name === 'Main') {
        cause.typeName = 'Data';
      } else {
        cause.typeName = this.name;
      }
      return m;
    });
  }

  _undress(value, as) {
    return this.type.undress(value, as);
  }

  _isSuperTypeOf(child) {
    return this.type.isSuperTypeOf(child);
  }

  _isSubTypeOf(sup) {
    return this.type._isSubTypeOf(sup);
  }

  _equals(other) {
    return this.type.equals(other);
  }

  isFake() {
    return true;
  }

  trueOne() {
    return this.type;
  }

  low() {
    return this.type.low();
  }

  resolveProxies(system) {
    return this.type.resolveProxies(system);
  }

  toString() {
    return this.name;
  }
}

ObjectType(TypeDef, ['type', 'name', 'metadata']);
//
export default TypeDef;
