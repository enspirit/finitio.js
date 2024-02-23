import { default as Parser } from './parser';

export const enum Type {
  Any = 'any',
  Ad = 'adt',
  Builtin = 'builtin',
  Relation = 'relation',
  Seq = 'seq',
  Set = 'set',
  Struct = 'struct',
  Sub = 'sub',
  Tuple = 'tuple',
  TypeRef = 'ref',
  Union = 'union',
  TypeInstantiation = 'instantiate',
}

export const enum TypeDef {
  Normal,
  Generic
}

export type WithMetadata<T> = T & {
  metadata?: Record<string, unknown>
}

export type InfoTypeAst = {
  builtin: {
    jsType: string,
  }
}

export type AnyAst = {
  [Type.Any]: WithMetadata<Record<string, never>>
}

export type AdTypeAst = {
  [Type.Ad]: WithMetadata<{
    jsType: string,
    contracts: Array<WithMetadata<{
      name: string,
      infoType: InfoTypeAst
      identity: unknown,
      internal?: string
      external?: string
      explicit?: {
        dress: [string, string]
        undress: [string, string]
      }
    }>>
  }>
}

export type BuiltinTypeAst = {
  [Type.Builtin]: WithMetadata<{
    jsType: string
  }>
}

export type AttributeAst = WithMetadata<{
  name: string,
  type: TypeAst,
  required?: boolean,
}>

export type HeadingAst = {
  attributes: Array<AttributeAst>
  options?: {
    allowExtra?: TypeAst
  }
}

export type RelationTypeAst = {
  [Type.Relation]: WithMetadata<{
    relation: {
      heading: HeadingAst
    }
  }>
}

export type SeqTypeAst = {
  [Type.Seq]: WithMetadata<{
    elmType: TypeAst
  }>
}

export type SetTypeAst = {
  [Type.Set]: WithMetadata<{
    elmType: TypeAst
  }>
}

export type StructTypeAst = {
  [Type.Struct]: WithMetadata<{
    componentTypes: Array<TypeAst>
  }>
}

export type BaseConstraintAst = {
  name?: string
}

export type NativeConstraint = BaseConstraintAst & {
native: [string, string]
}

export type RegexpConstraint = BaseConstraintAst & {
  regexp: string
}

export type SetConstraint = BaseConstraintAst & {
  set: Array<unknown>
}

export type RangeConstraintAst = BaseConstraintAst & {
  min: number,
  max: number,
  min_inclusive?: boolean
  max_inclusive?: boolean
}

export type ConstraintAst =
  NativeConstraint
  | RegexpConstraint
  | SetConstraint
  | RangeConstraintAst

export type SubTypeAst = {
  [Type.Sub]: WithMetadata<{
    superType: TypeAst,
    constraints: Array<ConstraintAst>
  }>
}

export type TupleTypeAst = {
  [Type.Tuple]: WithMetadata<{
    heading: HeadingAst
  }>
}

export type TypeRefTypeAst = {
  [Type.TypeRef]: {
    typeName: string
  }
}

export type UnionTypeAst = {
  [Type.Union]: WithMetadata<{
    candidates: Array<TypeAst>
  }>
}

export type TypeInstantiationAst = {
  [Type.TypeInstantiation]: {
    typeName: string
    instantiation: Array<string>
  }
}

export type ImportAst = {
  from: string
}

export type TypeAst =
  AnyAst |
  AdTypeAst |
  BuiltinTypeAst |
  RelationTypeAst |
  SeqTypeAst |
  SetTypeAst |
  StructTypeAst |
  SubTypeAst |
  TupleTypeAst |
  TypeRefTypeAst |
  UnionTypeAst |
  TypeInstantiationAst

export type TypeDefAst = {
  name: string,
  type: TypeAst,
  generics?: Array<string>
}

export type SystemAst = {
  imports?: Array<ImportAst>
  types: Array<TypeDefAst>
}

export default Parser as {
  parse: (input: string, options: unknown) => SystemAst
};
