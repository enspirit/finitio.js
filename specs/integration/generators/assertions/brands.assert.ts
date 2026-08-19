import type {
  Colour, Defined, FinitioInputs, Main, Plain, Positive, Small, Whatever,
} from '../.generated/brands';
import type { FinitioImports } from '../.generated/brands';
import type { Equals, Expect } from './expect';

type Assignable<A, B> = A extends B ? true : false

// A branded sub type is nominal: it flows to its super type, never the other
// way round, so a value can only come from dressing.
export type _toSuper = Expect<Assignable<Positive, number>>
export type _fromSuper = Expect<Equals<Assignable<number, Positive>, false>>

// Brands compose, and keep the sub typing direction between them.
export type _toBrand = Expect<Assignable<Small, Positive>>
export type _fromBrand = Expect<Equals<Assignable<Positive, Small>, false>>

// A set constraint is precise already, and is left unbranded.
export type _colour = Expect<Equals<Colour, 'red' | 'blue'>>

// So is a definition that constrains nothing.
export type _plain = Expect<Equals<Plain, { name: string }>>

// Inputs are never branded: they come from the outside, unvalidated.
export type _input = Expect<Equals<FinitioInputs._Positive, number>>
export type _inputSmall = Expect<Equals<FinitioInputs._Small, number>>

// `Nil` states its own TypeScript type through `ts:`, and is left alone: a
// brand is an intersection, `null & {...}` is `never`, and a `never` arm
// vanishes from the union it sits in. Branding it would have silently turned
// this nullable into a plain `string`.
export type _nil = Expect<Equals<FinitioImports.Data.Nil, null>>
export type _nullable = Expect<Equals<Main['nick'], string | null>>
export type _nullableIn = Expect<Equals<FinitioInputs._Main['nick'], string | null>>

// A sub type of Any is left alone too: `unknown & {...}` is an object type,
// which would let any object through, and `any & {...}` is just `any`. This
// fixture runs with `anyAs: 'unknown'`, the harder of the two.
export type _whatever = Expect<Equals<Whatever, unknown>>
export type _defined = Expect<Equals<Defined, unknown>>

// The brand of a definition is qualified by the namespace it is emitted under,
// so that two systems of a bundle defining the same name stay distinct.
export type _qualified = Expect<Equals<Assignable<Positive, { readonly __finitio: { Positive: true } }>, true>>

// A sub type of Any keeps accepting primitives, whether Any is reached inline
// or through a reference. A brand is an intersection, and intersecting
// `unknown` collapses to an object type that no primitive satisfies.
export const inlineAny: Whatever = 42;
export const referencedAny: Defined = 42;
