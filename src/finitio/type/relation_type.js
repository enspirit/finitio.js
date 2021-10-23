import { TypeType } from '../support/ic';
import Type from '../type';
import CollectionType from '../support/collection_type';
import TupleType from '../type/tuple_type';
import Heading from '../support/heading';
import $u from '../support/utils';

class RelationType extends Type {

  constructor(heading, metadata) {
    super(metadata);

    this.heading = heading;
    if (!(this.heading instanceof Heading)) {
      $u.argumentError('Heading expected, got:', this.heading);
    }
  }

  fetch() {
    return this.heading.fetch.apply(this.heading, arguments);
  }

  tupleType() {
    return this.tupleTypeCache != null ? this.tupleTypeCache : (this.tupleTypeCache = new TupleType(this.heading));
  }

  _include(value) {
    return value instanceof Array &&
      $u.every(value, (tuple) => this.tupleType().include(tuple));
  }

  _mDress(value, Monad) {
    if (!(value instanceof Array)) {
      return Monad.failure(this, ['Array expected, got: `${value}`', [value]]);
    }

    const tupleType = this.tupleType();
    const index = {};

    const mapper = function(elm) {
      const m = tupleType.mDress(elm, Monad);
      return m.onSuccess(function(tuple) {
        const h = JSON.stringify(tuple);
        if (index[h]) {
          return Monad.failure(this, ['Duplicate Tuple: `${value}`', [tuple]]);
        } else {
          index[h] = tuple;
          return m;
        }
      });
    };

    const onFailure = function(causes) {
      return Monad.failure(this, ['Invalid ${typeName}', ['Relation']], causes);
    };

    return Monad.map(value, mapper, onFailure);
  }

  _undress(value, as) {
    if (!(as instanceof RelationType) && !(as instanceof CollectionType)) {
      $u.undressError(`Unable to undress \`${value}\` to \`${as}\``);
    }

    const from = this.tupleType();
    const to = as instanceof RelationType ? as.tupleType() : as.elmType;
    return $u.map(value, val => from.undress(val, to));
  }

  _isSuperTypeOf(other) {
    return (this === other) ||
    (other instanceof RelationType && this.heading.isSuperHeadingOf(other.heading));
  }

  _equals(other) {
    return (this === other) ||
    (other instanceof RelationType && this.heading.equals(other.heading)) ||
    super._equals(...arguments);
  }

  low() {
    return new RelationType(this.heading.low());
  }

  resolveProxies(system) {
    return this.heading.resolveProxies(system);
  }

  toString() {
    return `{{ ${this.heading.toString()} }}`;
  }
}

TypeType(RelationType, 'relation', ['heading', 'metadata']);

//
export default RelationType;
