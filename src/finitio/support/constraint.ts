import * as $u from './utils';
import { AbstractType } from './ic';
import { InformationContract } from '../../types';

//
// Helper class for constraints.
//
class Constraint<T> extends InformationContract {

  constructor(public name: string, public native: T, public metadata?: unknown) {
    super();

    if ((this.name != null) && (typeof(this.name) !== 'string')) {
      $u.argumentError('String expected for constraint name, got: ', this.name);
    }
  }

  isAnonymous() {
    return (this.name == null);
  }

  accept(_arg: unknown) {
    throw new Error('Constraint is an abstract class');
  }

  equals(other) {
    return (this === other) ||
    (other instanceof Constraint && (this.native === other.native));
  }

  toString() {
    let str = this.nativeToString();
    if (!this.isAnonymous()) { str = `${this.name}: ${str}`; }
    return str;
  }

  nativeToString() {
    return this.native.toString();
  }
}

export type Native = {
  finitioSourceCode: string
} & ((arg: unknown) => boolean)
class NativeConstraint extends Constraint<Native> {
  get kind() {
    return 'native';
  }

  accept(arg) {
    return this.native(arg);
  }

  nativeToString() {
    return this.native.finitioSourceCode || '...';
  }
}

class RegexpConstraint extends Constraint<RegExp> {
  get kind() {
    return 'regexp';
  }

  accept(arg) {
    return this.native.test(arg);
  }
}

type Range = {
  min: number,
  max: number,
  min_inclusive?: boolean,
  max_inclusive?: boolean,
}
class RangeConstraint extends Constraint<Range> {
  get kind() {
    return 'range';
  }

  accept(arg) {
    return (this.native.min_inclusive ? arg >= this.native.min : arg > this.native.min) &&
    ((this.native.max === undefined) ||
    (this.native.max_inclusive ? (arg <= this.native.max) : (arg < this.native.max)));
  }

  equals(other) {
    if (this === other) { return true; }
    if (!(other instanceof RangeConstraint)) { return false; }
    return ((this.native.min === other.native.min) && (this.native.min_inclusive === other.native.min_inclusive)) &&
    (((this.native.max === undefined) && (other.native.max === undefined)) ||
     ((this.native.max === other.native.max) && (this.native.max_inclusive === other.native.max_inclusive)));
  }

  nativeToString() {
    if (!this.native.max) { return `${this.native.min}..`; }
    if (!this.native.max_inclusive) { return `${this.native.min}...${this.native.max}`; }
    return `${this.native.min}..${this.native.max}`;
  }
}

class SetConstraint extends Constraint<Array<unknown>> {
  get kind() {
    return 'set';
  }

  accept(arg) {
    return $u.contains(this.native, arg);
  }

  equals(other) {
    if (this === other) { return true; }
    if (!(other instanceof SetConstraint)) { return false; }
    if (this.native.length !== other.native.length) { return false; }
    return $u.difference(this.native, other.native).length === 0;
  }

  nativeToString() {
    return `{ ${this.native.join(' ')} }`;
  }
}

AbstractType(Constraint,
  [NativeConstraint, RegexpConstraint, RangeConstraint, SetConstraint],
  ['name', 'native', 'metadata'], 1);

//

export {
  NativeConstraint,
  RegexpConstraint,
  RangeConstraint,
  SetConstraint,
}

export default Constraint;
