import { TypeType } from '../support/ic';
import $u from '../support/utils';
import Type from '../type';

class StructType extends Type {

  constructor(componentTypes, metadata) {
    super(metadata);

    this.componentTypes = componentTypes;

    if (!$u.isArray(this.componentTypes)) {
      $u.argumentError('[Finitio::Type] expected, got:', this.componentTypes);
    }

    const wrongType = $u.find(this.componentTypes, t => !(t instanceof Type));
    if (wrongType != null) {
      $u.argumentError('[Finitio::Type] expected, got:', wrongType);
    }
  }

  size() {
    return $u.size(this.componentTypes);
  }

  _include(value) {
    return $u.isArray(value) &&
    ($u.size(value) === $u.size(this.componentTypes)) &&
    $u.every($u.zip(value, this.componentTypes), (valueAndKey) => {
      let type;
      [value, type] = Array.from(valueAndKey);
      return type.include(value);
    });
  }

  _mDress(value, Monad) {
    if (!(value instanceof Array)) {
      return Monad.failure(this, ['Array expected, got: `${value}`', [value]]);
    }

    if (value.length !== this.size()) {
      return Monad.failure(this,
        ['Struct size mismatch: ${a} for ${b}', [value.length, this.size()]]);
    }

    const mapper = (type, index) => {
      return type.mDress(value[index], Monad);
    };

    const onFailure = causes => {
      const params = ['Struct', value];
      return Monad.failure(this, ['Invalid ${typeName}: `${value}`', params], causes);
    };

    return Monad.map(this.componentTypes, mapper, onFailure);
  }

  _undress(value, as) {
    if (!(as instanceof StructType)) {
      $u.undressError(`Unable to undress \`${value}\` to \`${as}\``);
    }

    if (as.size() !== this.size()) {
      $u.undressError(`Unable to undress \`${value}\` to \`${as}\``);
    }

    const from = this.componentTypes;
    const to = as.componentTypes;
    return $u.map(value, (v, i) => from[i].undress(v, to[i]));
  }

  _isSuperTypeOf(other) {
    return (this === other) ||
    (other instanceof StructType &&
    ($u.size(this.componentTypes) === $u.size(other.componentTypes)) &&
    $u.every($u.zip(this.componentTypes, other.componentTypes), cs => cs[0].isSuperTypeOf(cs[1])));
  }

  _equals(other) {
    return (this === other) ||
    (other instanceof StructType && this.headingEquals(other)) ||
    super._equals(...arguments);
  }

  headingEquals(other) {
    return ($u.size(this.componentTypes) === $u.size(other.componentTypes)) &&
    $u.every(this.componentTypes, (t, i) => other.componentTypes[i].equals(t));
  }

  low() {
    const remapped = $u.map(this.componentTypes, t => t.low());
    return new StructType(remapped);
  }

  resolveProxies(system) {
    return $u.each(this.componentTypes, c => c.resolveProxies(system));
  }

  toString() {
    return `<${$u.map(this.componentTypes, t => t.toString()).join(',')}>`;
  }
}

TypeType(StructType, 'struct', ['componentTypes', 'metadata']);

export default StructType;
