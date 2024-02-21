import * as $u from './utils';
import { ObjectType } from './ic';
import Type from '../type';
import { InformationContract } from '../../types';

//
// Helper class for tuple and relation attributes.
//
// An attribute is simply a `(name: AttrName, type: Type)` pair, where the
// type is a Finitio type.
//
class Attribute extends InformationContract {

  constructor(public name: string, public type: Type, public required: boolean = true, public metadata?: unknown) {
    super();

    if (typeof this.name !== 'string') {
      $u.argumentError('String expected for attribute name, got:', this.name);
    }

    if (!(this.type instanceof Type)) {
      $u.argumentError('Type expected for attribute domain, got:', this.type);
    }

    if (typeof this.required !== 'boolean') {
      $u.argumentError('Boolean expected for required, got:', this.required);
    }
  }

  fetchType() {
    return this.type;
  }

  fetchOn(arg, callback) {
    if (typeof arg !== 'object') {
      $u.argumentError('Object expected, got:', arg);
    }

    if (arg[this.name] == null) {
      if (callback != null) {
        return callback();
      } else {
        throw new Error(`Key \`${this.name}\` not found`);
      }
    }

    return arg[this.name];
  }

  isSuperAttributeOf(other) {
    return (this === other) ||
    ((this.name === other.name) &&
     (!(this.required) || other.required) &&
     this.type.isSuperTypeOf(other.type));
  }

  equals(other) {
    return (this === other) ||
      (other instanceof Attribute &&
        this.name === other.name &&
        this.required === other.required &&
        this.type.equals(other.type)
      );
  }

  low() {
    return new Attribute(this.name, this.type.low(), this.required);
  }

  resolveProxies(system) {
    return this.type.resolveProxies(system);
  }

  toString() {
    if (this.required) {
      return `${this.name} : ${this.type}`;
    } else {
      return `${this.name} :? ${this.type}`;
    }
  }
}

ObjectType(Attribute, ['name', 'type', 'required', 'metadata']);

//
export default Attribute;
