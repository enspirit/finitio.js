import $u from './utils';
import Type from '../type';

// mixin
class CollectionType extends Type {

  constructor(elmType, name, metadata) {
    super(name, metadata);
    this.name = name;
    this.elmType = elmType;

    if (!(this.elmType instanceof Type)) {
      $u.argumentError('Finitio.Type expected, got:', this.elmType);
    }
  }

  _equals(other) {
    return (this === other) ||
    (other instanceof (this.constructor) &&
      this.elmType.equals(other.elmType)) ||
    super._equals(...arguments);
  }

  _isSuperTypeOf(other) {
    return (this === other) ||
    (other instanceof (this.constructor) &&
      this.elmType.isSuperTypeOf(other.elmType)) ||
    super._isSuperTypeOf(...arguments);
  }

  _undress(value, as) {
    const from = this.elmType;
    const to = as.elmType;

    if (to.isSuperTypeOf(from)) { return value; }

    return $u.map(value, v => from.undress(v, to));
  }
}

//
export default CollectionType;
