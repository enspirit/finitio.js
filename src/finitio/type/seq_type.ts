import { TypeType } from '../support/ic';
import * as $u from '../support/utils';
import CollectionType from '../support/collection_type';

class SeqType extends CollectionType {

  _include(value) {
    return value instanceof Array && $u.every(value, v => this.elmType.include(v));
  }

  _mDress<T>(value, Monad) {
    if (!(value instanceof Array)) {
      return Monad.failure(this, ['Array expected, got: `${value}`', [value]]);
    }

    const mapper = elm => {
      return this.elmType.mDress<T>(elm, Monad);
    };

    const onFailure = causes => {
      return Monad.failure(this, ['Invalid ${typeName}', ['Sequence']], causes);
    };

    return Monad.map(value, mapper, onFailure);
  }

  _undress(value, as) {
    if (!(as instanceof SeqType)) {
      $u.undressError(`Unable to undress \`${value}\` to \`${as}\``);
    }
    return super._undress(value , as);
  }

  low() {
    return new SeqType(this.elmType.low());
  }

  resolveProxies(system) {
    return this.elmType.resolveProxies(system);
  }

  toString() {
    return `[${this.elmType.toString()}]`;
  }
}

TypeType(SeqType, 'seq', ['elmType', 'metadata']);

//
export default SeqType;
