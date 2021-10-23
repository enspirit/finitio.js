import $u from './utils';
import { AbstractType } from './ic';

//
// Helper class for constraints.
//
class Constraint {

  constructor(name, native1, metadata) {
    this.name = name;
    this.native = native1;
    this.metadata = metadata;
    if ((this.name != null) && (typeof(this.name) !== 'string')) {
      $u.argumentError('String expected for constraint name, got: ', this.name);
    }
  }

  isAnonymous() {
    return (this.name == null);
  }

  accept(arg) {
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

class NativeConstraint extends Constraint {
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

class RegexpConstraint extends Constraint {
  get kind() {
    return 'regexp';
  }

  accept(arg) {
    return this.native.test(arg);
  }
}

class RangeConstraint extends Constraint {
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
    if (!(other instanceof Constraint.Range)) { return false; }
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

class SetConstraint extends Constraint {
  get kind() {
    return 'set';
  }

  accept(arg) {
    return $u.contains(this.native, arg);
  }

  equals(other) {
    if (this === other) { return true; }
    if (!(other instanceof Constraint.Set)) { return false; }
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
  Constraint,
  NativeConstraint,
  RegexpConstraint,
  RangeConstraint,
  SetConstraint,
};

Constraint.Native = NativeConstraint;
Constraint.Regexp = RegexpConstraint;
Constraint.Range = RangeConstraint;
Constraint.Set = SetConstraint;

export default Constraint;
