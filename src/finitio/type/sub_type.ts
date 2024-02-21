import { TypeType } from '../support/ic';
import * as $u from '../support/utils';
import Fetchable from '../support/fetchable';
import Type from '../type';
import Constraint from '../support/constraint';
import type { TypeMetadata } from '../../types';

class SubType extends Type {

  constructor(public superType: Type, public constraints, metadata?: TypeMetadata) {
    super(metadata);

    if (!(this.superType instanceof Type)) {
      $u.argumentError('Finitio.Type expected, got', this.superType);
    }

    if (this.constraints.constructor !== Array) {
      $u.argumentError('Array expected for constraints, got', this.constraints);
    }

    if (!(this.constraints.length > 0)) {
      $u.argumentError('Empty constraints not allowed on SubType');
    }

    if (!$u.every(this.constraints, c => c instanceof Constraint)) {
      $u.argumentError('Array of constraints expected, got', this.constraints);
    }
  }

  _mDress(value, Monad) {
    const success = this.superType.mDress(value, Monad);

    const callback = function(_, constraint) {
      if (constraint.accept(success.result)) {
        return success;
      } else {
        let msg, params;
        if (constraint.name != null) {
          msg = 'Invalid ${typeName} (not ${cName}): `${value}`';
          params = ['value', constraint.name, value];
        } else {
          msg = 'Invalid ${typeName}: `${value}`';
          params = ['value', value];
        }
        return Monad.failure(constraint, [msg, params]);
      }
    };

    const onFailure = causes => {
      return Monad.failure(this, causes[0].error);
    };

    return Monad.refine(success, this.constraints, callback, onFailure);
  }

  _include(value) {
    return this.superType.include(value) && $u.every(this.constraints, c => c.accept(value));
  }

  _isSubTypeOf(other) {
    // if my supertype is itself a subtype of other, then its ok
    // otherwise, we just know nothing unless the constraint can be analyzed.
    return other.isSuperTypeOf(this.superType);
  }

  _equals(other) {
    return (this === other) ||
      (other instanceof SubType &&
        this.superTypeEquals(other) && this.constraintsEquals(other)) ||
      super._equals(other);
  }

  low() {
    return this.superType.low();
  }

  toString() {
    return `${this.superType.toString()}( x | ... )`;
  }

  // private

  superTypeEquals(other) {
    return this.superType.equals(other.superType);
  }

  constraintsEquals(other) {
    return (this.constraints.length === other.constraints.length) &&
    $u.every($u.zip(this.constraints, other.constraints), pair => pair[0].equals(pair[1]));
  }

  resolveProxies(system) {
    return this.superType.resolveProxies(system);
  }
}

TypeType(SubType, 'sub', ['superType', 'constraints', 'metadata']);
Fetchable(SubType, 'constraints', 'constraint', function(name) {
  return $u.find(this.constraints, c => c.name === name);
});

export default SubType;
