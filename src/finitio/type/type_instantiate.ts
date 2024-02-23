import type { TypeMetadata } from '../../types';
import { TypeType } from '../support/ic';
import * as $u from '../support/utils';
import System from '../system';
import type Type from '../type';
import GenericDef from './generic_def';
import TypeDef from './type_def';
import TypeRef from './type_ref';

class TypeInstantiate extends TypeRef {

  constructor(public typeName: string, public instantiation: Array<string>, metadata?: TypeMetadata, public target?: Type) {
    super(typeName, metadata, target);

    if (!instantiation || !Array.isArray(instantiation) || !instantiation.length) {
      $u.argumentError('Instantiation required got', instantiation);
    }
  }

  // private API

  resolve(system) {
    if (this.target != null) {
      return this.target;
    }

    const generic = system.resolve(this.typeName).fetchType();

    if (!(generic instanceof GenericDef)) {
      $u.argumentError('Generic expected got', generic);
    }

    if (this.instantiation.length !== generic.generics.length) {
      $u.argumentError('Wrong generic instantiation:', this.instantiation);
    }

    const genToInst = $u.zip(generic.generics, this.instantiation);
    const resolved = genToInst.map(([g, t]) => {
      return TypeDef.info({
        name: g,
        type: TypeRef.info({
          typeName: t
        }).resolveProxies(system)
      })
    });

    const newSystem = new System(
      [...system.imports],
      [...system.types, ...resolved],
    )

    this.target = generic.instantiate(newSystem);
    return this.target;
  }

  resolveProxies(system) {
    return this.resolve(system);
  }

  toString() {
    return this.typeName + `<${this.instantiation.join(', ')}>`;
  }
}

TypeType(TypeInstantiate, 'instantiate', ['typeName', 'instantiation', 'metadata']);

//
export default TypeInstantiate;
