import type { System, Type } from './finitio'
import type { Resolver } from './finitio/resolver';
import { notImplemented } from './finitio/support/utils'
export * from './finitio/parser';

export type TypeCollection = {
  Main?: Type
  [k: string]: Type
}

export type AcceptedInput<T extends Type> = T extends Type<infer X, unknown> ? X : never
export type DressedType<T extends Type> = T extends Type<unknown, infer X> ? X : never

export type JsType<T> = { new(): T }

export type Scalar = boolean|number|string|Date|undefined|null;
export type TypeMetadata = Record<string, Scalar>

export type World = {
  failfast?: boolean,
  JsTypes?: Record<string, unknown>
  sourceUrl?: string,
  importResolver?: Resolver,
  [k: string]: unknown
}

export type Import<T extends TypeCollection> = {
  system: System<T>
  qualifier?: string
}

export class InformationContract {
  static info(_from: unknown, _world?: World): Type<unknown, unknown> {
    return notImplemented(InformationContract, 'info');
  }
  static toInfo(): unknown {
    return notImplemented(InformationContract, 'toInfo');
  }
}
