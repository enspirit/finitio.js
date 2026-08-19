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

export type WithMetadata<T> = T & {
  metadata?: Record<string, unknown>
}

// The information type a contract is defined over. Any type is allowed here:
// `recursive.fio` defines a contract over a tuple, for instance.
export type InfoTypeAst = TypeAst

// `.` carries nothing but its metadata. `Record<string, never>` would make
// that metadata itself untypeable, its index signature swallowing the key.
export type AnyAst = {
  [Type.Any]: WithMetadata<Record<never, never>>
}

export type AdTypeAst = {
  [Type.Ad]: WithMetadata<{
    // Absent when the ADT carries no `.JsType` preamble, in which case the
    // parser makes every one of its contracts an identity.
    jsType?: string,
    contracts: Array<ContractAst>
  }>
}

// The parser emits exactly one of `identity`, `internal`, `external` or
// `explicit`, depending on how the contract is written.
export type ContractAst = WithMetadata<{
  name: string,
  infoType: InfoTypeAst
  identity?: unknown,
  internal?: string
  external?: string
  explicit?: {
    dress: [string, string]
    undress: [string, string]
  }
}>

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
    heading: HeadingAst
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

export type RangeAst = {
  min: number,
  max?: number,
  min_inclusive?: boolean
  max_inclusive?: boolean
}

export type RangeConstraintAst = BaseConstraintAst & {
  range: RangeAst
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
  qualifier?: string
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

export type TypeDefAst = WithMetadata<{
  name: string,
  type: TypeAst,
  generics?: Array<string>
}>

export type SystemAst = {
  imports?: Array<ImportAst>
  types: Array<TypeDefAst>
}

export default Parser as {
  parse: (input: string, options: unknown) => SystemAst
};
