import { TypeType } from '../support/ic';
import * as $u from '../support/utils';
import Fetchable from '../support/fetchable';
import Contract from '../support/contract';
import Type from '../type';
import type { JsType } from '../../types';

class AdType extends Type {

  constructor(public jsType: JsType<unknown>, public contracts: Array<Contract<unknown>>, metadata) {
    super(metadata);

    this.jsType = jsType;
    this.contracts = contracts;

    if (this.jsType && !(this.jsType instanceof Function)) {
      $u.argumentError('Constructor (function) expected, got:', this.jsType);
    }

    if (!$u.isArray(this.contracts)) {
      $u.argumentError('[Contract] expected, got:', this.contracts);
    }

    if (!$u.every(this.contracts, c => c instanceof Contract)) {
      $u.argumentError('[Contract] expected, got:', this.contracts);
    }
  }

  contractNames() {
    return $u.map(this.contracts, c => c.name);
  }

  _include(value: unknown) {
    return value.constructor === this.jsType;
  }

  _mDress(value, Monad) {
    if (this.jsType && value instanceof this.jsType) {
      return Monad.success(value);
    }

    const callback = function(contract) {
      const m = contract.infoType.mDress(value, Monad);
      return m.onSuccess(result => {
        try {
          return Monad.success(contract.dress(result, Monad.world));
        } catch (e) {
          return Monad.failure(this, `Dresser failed: ${e.message}`, [e]);
        }
      });
    };

    const onFailure = causes => {
      const params = [(this.jsType && this.jsType.name) || 'value', value];
      return Monad.failure(this, ['Invalid ${typeName}: `${value}`', params], causes);
    };

    return Monad.find(this.contracts, callback, onFailure);
  }

  _undress(value, as) {
    if (!this.jsType) { return value; }

    let candidate = null;
    if ($u.size(this.contracts) === 1) {
      // if only one contract let it do its job
      candidate = this.contracts[0];
    } else {
      // otherwise, find the good one
      candidate = $u.find(this.contracts, c => c.infoType.isSuperTypeOf(as));
    }

    if (candidate !== null) {
      return candidate.infoType.undress(candidate.undress(value), as);
    } else {
      return super._undress(value, as);
    }
  }

  low() {
    return this.contracts[0].infoType.low();
  }

  resolveProxies(system) {
    return $u.each(this.contracts, c => c.resolveProxies(system));
  }

  toString() {
    return $u.map(this.contracts, c => c.toString()).join(', ');
  }
}

TypeType(AdType, 'adt', ['jsType', 'contracts', 'metadata']);
Fetchable(AdType, 'contracts', 'contract', function(name) {
  return $u.find(this.contracts, c => c.name === name);
});

//
export default AdType;
