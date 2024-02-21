import * as $u from './utils';
import Type from '../type';
import type { TypeMetadata } from '../../types';

// mixin
class CollectionType extends Type {

  constructor(public elmType: Type, metadata?: TypeMetadata, public name?: string) {
    super(metadata);

    if (!(this.elmType instanceof Type)) {
      $u.argumentError('Finitio.Type expected, got:', this.elmType);
    }
  }

  _equals(other) {
    return (this === other) ||
    (other instanceof (this.constructor) &&
      this.elmType.equals((other as CollectionType).elmType)) ||
    super._equals(other);
  }

  _isSuperTypeOf(other: CollectionType|Type) {
    return (this === other) ||
    (other instanceof (this.constructor) &&
      this.elmType.isSuperTypeOf((other as CollectionType).elmType)) ||
    super._isSuperTypeOf(other);
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
