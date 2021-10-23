import { TypeType } from '../support/ic';
import $u from '../support/utils';
import Type from '../type';

class UnionType extends Type {

  constructor(candidates, metadata) {
    super(metadata);
    this.candidates = candidates;
    $u.each(this.candidates, (c) => {
      if (!(c instanceof Type)) {
        return $u.argumentError('Finitio.Type expected, got:', c);
      }
    });
  }

  _mDress(value, Monad) {

    const callback = candidate => candidate.mDress(value, Monad);

    const onFailure = causes => {
      const params = ['value', value];
      return Monad.failure(this, ['Invalid ${typeName}: `${value}`', params], causes);
    };

    return Monad.find(this.candidates, callback, onFailure);
  }

  _undress(value, as) {
    let using;
    if (this === as) { return value; }

    // find a candidate which is a subtype of as
    using = $u.find(this.candidates, c => as.isSuperTypeOf(c));
    if (using) {
      return using.undress(value, as);
    }

    // find candidate that includes value
    using = $u.find(this.candidates, c => c.include(value));
    if (using) {
      return using.undress(value, as);
    }
    return $u.undressError(`Unable to undress \`${value}\` to \`${as}\``);
  }

  _include(value) {
    const found = $u.find(this.candidates, c => c.include(value));
    return (found != null);
  }

  _isSuperTypeOf(other) {
    return (this === other) ||
    ($u.any(this.candidates, c => c.isSuperTypeOf(other))) ||
    (other instanceof UnionType &&
    $u.every(other.candidates, d => {
      return $u.any(this.candidates, c => c.isSuperTypeOf(d));
    })) ||
    super._isSuperTypeOf(...arguments);
  }

  _equals(other) {
    return (this === other) ||
    (other instanceof UnionType && this.candidatesEquals(other, true)) ||
    super._equals(...arguments);
  }

  candidatesEquals(other, andback) {
    const ok = $u.every(this.candidates, c => $u.any(other.candidates, c2 => c.equals(c2)));
    return ok && (!andback || other.candidatesEquals(this, false));
  }

  low() {
    throw 'UnionType#low is not defined yet, sorry!';
  }

  resolveProxies(system) {
    return $u.each(this.candidates, c => c.resolveProxies(system));
  }

  toString() {
    return $u.map(this.candidates, c => c.toString()).join('|');
  }
}

TypeType(UnionType, 'union', ['candidates', 'metadata']);

export default UnionType;
