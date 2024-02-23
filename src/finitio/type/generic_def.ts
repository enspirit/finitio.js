import type { TypeMetadata } from '../../types';
import { ObjectType } from '../support/ic';
import * as $u from '../support/utils';
import type System from '../system';
import TypeDef from './type_def';
import type TypeRef from './type_ref';

class GenericDef extends TypeDef {

  private system?: System

  constructor(
    public type: TypeRef,
    public name: string,
    public generics: Array<string>,
    metadata?: TypeMetadata,
  ) {
    super(type, name, metadata);

    if (!generics?.length) {
      $u.argumentError('Generics expected got:', generics);
    }
  }

  resolveProxies(_system) {
    // the resolution will take place at instantiation time
    return this;
  }

  instantiate(system: System) {
    this.type.resolveProxies(system);

    return this;
  }

  toString() {
    return this.name + `<${this.generics.join(', ')}>`;
  }
}

ObjectType(GenericDef, ['type', 'name', 'generics', 'metadata']);

//
export default GenericDef;
