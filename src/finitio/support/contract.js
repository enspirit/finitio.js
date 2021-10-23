import { AbstractType } from './ic';
import $u from './utils';
import Type from '../type';

class Contract {

  constructor(name, infoType, native1, metadata) {
    this.name = name;
    this.infoType = infoType;
    this.native = native1;
    this.metadata = metadata;
    if (!$u.isString(this.name)) {
      $u.argumentError('String expected, got:', this.name);
    }

    if (!(this.infoType instanceof Type)) {
      $u.argumentError('Finitio.Type expected, got:', this.infoType);
    }
  }

  fetchType() {
    return this.infoType;
  }

  resolveProxies(system) {
    return this.infoType.resolveProxies(system);
  }

  toString() {
    return `<${this.name}> ${this.infoType.toString()}`;
  }
}
class ExplicitContract extends Contract {
  get kind() {
    return 'explicit';
  }

  dress(value, world) {
    return this.native.dress(value, world);
  }

  undress(value, to) {
    return this.native.undress(value);
  }
}
class ExternalContract extends Contract {
  get kind() {
    return 'external';
  }

  dress(value, world) {
    return this.native.dress(value, world);
  }

  undress(value, to) {
    return this.native.undress(value);
  }
}

class InternalContract extends Contract {
  get kind() {
    return 'internal';
  }

  dress(value, world) {
    return this.native[this.name](value, world);
  }

  undress(value, to) {
    return value[`to${$u.capitalize(this.name)}`]();
  }
}
class IdentityContract extends Contract {
  get kind() {
    return 'identity';
  }

  dress(value, world) {
    return value;
  }

  undress(value, to) {
    return value;
  }
}

AbstractType(Contract,
  [ExplicitContract, ExternalContract, InternalContract, IdentityContract],
  ['name', 'infoType', 'native', 'metadata'], 2);

Contract.Explicit = ExplicitContract;
Contract.External = ExternalContract;
Contract.Internal = InternalContract;
Contract.Identity = IdentityContract;

export default Contract;
