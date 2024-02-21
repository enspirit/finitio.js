import type Finitio from './finitio'
import type { System, Type } from './finitio'
import type { Resolver } from './finitio/resolver';
import { notImplemented } from './finitio/support/utils'
export * from './finitio/parser';
export type JsType<T> = { new(): T }

export type Scalar = boolean|number|string|Date|undefined|null;
export type TypeMetadata = Record<string, Scalar>

export type World = {
  Finitio: typeof Finitio
  failfast?: boolean,
  JsTypes?: Record<string, unknown>
  sourceUrl?: string,
  importResolver: Resolver,
  [k: string]: unknown
}

export type Import = {
  system: System
  qualifier?: string
}

export class InformationContract {
  static info(_from: unknown, _world?: World): Type {
    return notImplemented(InformationContract, 'info');
  }
  static toInfo(): unknown {
    return notImplemented(InformationContract, 'toInfo');
  }
}
