import { AbstractType } from './ic';
import * as $u from './utils';
import Type from '../type';
import { InformationContract } from '../../types';

class Contract<T> extends InformationContract {

  constructor(public name: string, public infoType: Type, public native: T, public metadata: unknown) {
    super();

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
class ExplicitContract extends Contract<Type> {
  get kind() {
    return 'explicit';
  }

  dress(value, world) {
    return this.native.dress(value, world);
  }

  undress(value, to) {
    return this.native.undress(value, to);
  }
}
class ExternalContract extends Contract<Type> {
  get kind() {
    return 'external';
  }

  dress(value, world) {
    return this.native.dress(value, world);
  }

  undress(value, to) {
    return this.native.undress(value, to);
  }
}

class InternalContract extends Contract<Type> {
  get kind() {
    return 'internal';
  }

  dress(value, world) {
    return this.native[this.name](value, world);
  }

  undress(value, to) {
    return value[`to${$u.capitalize(this.name)}`](to);
  }
}
class IdentityContract extends Contract<unknown> {
  get kind() {
    return 'identity';
  }

  dress(value, _world) {
    return value;
  }

  undress(value, _to) {
    return value;
  }
}

AbstractType(Contract,
  [ExplicitContract, ExternalContract, InternalContract, IdentityContract],
  ['name', 'infoType', 'native', 'metadata'], 2);

export {
  ExplicitContract,
  ExternalContract,
  InternalContract,
  IdentityContract,
}

export default Contract;
