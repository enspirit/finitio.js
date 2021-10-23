import { TypeType } from '../support/ic';
import $u from '../support/utils';
import CollectionType from '../support/collection_type';

class SetType extends CollectionType {

  _include(value) {
    if (!(value instanceof Array)) { return false; }
    if (!$u.every(value, v => this.elmType.include(v))) { return false; }
    return $u.uniq(value).length === value.length;
  }

  _mDress(value, Monad) {
    if (!(value instanceof Array)) {
      return Monad.failure(this, ['Array expected, got: `${value}`', [value]]);
    }

    const mapper = elm => {
      return this.elmType.mDress(elm, Monad);
    };

    const onFailure = causes => {
      return Monad.failure(this, ['Invalid ${typeName}', ['Set']], causes);
    };

    const m = Monad.map(value, mapper, onFailure);

    const findDuplicate = set => $u.find(set, (elm, i) => set.indexOf(elm) !== i);

    return m.onSuccess(set => {
      let d;
      if (!(d = findDuplicate(set))) { return m; }
      const err = Monad.failure(this, ['Duplicate value: `${value}`', [d]]);
      return err.onFailure(cause => {
        return Monad.failure(this, 'Invalid Set', [cause]);
      });
    });
  }

  _undress(value, as) {
    if (!(as instanceof CollectionType)) {
      $u.undressError(`Unable to undress \`${value}\` to \`${as}\``);
    }
    return super._undress(...arguments);
  }

  low() {
    return new SetType(this.elmType.low());
  }

  resolveProxies(system) {
    return this.elmType.resolveProxies(system);
  }

  toString() {
    return `{${this.elmType.toString()}}`;
  }
}

TypeType(SetType, 'set', ['elmType', 'metadata']);

//
export default SetType;
