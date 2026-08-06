import type { TypeCollection, TypeMetadata } from '../../types';
import { ObjectType } from '../support/ic';
import * as $u from '../support/utils';
import copy from '../support/copy';
import type System from '../system';
import TypeDef from './type_def';
import type TypeRef from './type_ref';

class GenericDef extends TypeDef {

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

  // Binds the parameters, in `system`, of a fresh copy of this definition.
  //
  // The copy matters: binding resolves the proxies in the body, and a
  // resolved proxy stays resolved. Instantiating the shared definition would
  // make `Page<Product>` reuse whatever `Page<Person>` bound first.
  instantiate<T extends TypeCollection>(system: System<T>) {
    const instance = new GenericDef(
      copy(this.type),
      this.name,
      this.generics,
      this.metadata,
    );
    instance.type.resolveProxies(system);

    return instance;
  }

  toString() {
    return this.name + `<${this.generics.join(', ')}>`;
  }
}

ObjectType(GenericDef, ['type', 'name', 'generics', 'metadata']);

//
export default GenericDef;
