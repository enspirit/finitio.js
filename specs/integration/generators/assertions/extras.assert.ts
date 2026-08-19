import type { Closed, FinitioInputs, Loose, Relational, Typed } from '../.generated/extras';
import type { Equals, Expect } from './expect';

// A typed `...` guarantees the extra attributes' type, and they survive
// dressing, so they show on both sides. A declared attribute keeps its own
// type; an undeclared key could be either, since the index signature has to
// admit the declared attributes to stay inhabitable.
export type _typed = Expect<Equals<Typed['name'], string>>
export type _typedExtra = Expect<Equals<Typed['whatever'], string | number>>
export type _typedIn = Expect<Equals<FinitioInputs._Typed['whatever'], string | number>>

// A bare `...` guarantees nothing: extras are accepted on the way in, and
// dropped when dressing.
export type _loose = Expect<Equals<keyof Loose, 'name'>>
export type _looseIn = Expect<Equals<FinitioInputs._Loose['whatever'], unknown>>

// No `...` at all, no index signature.
export type _closed = Expect<Equals<keyof Closed, 'name'>>

export type _relational = Expect<Equals<Relational[number]['whatever'], string>>

//
// Constructing a value, not merely reading one out of the type.
//
// These are what a caller of `system.dress()` has to be able to write, and
// what the assertions above cannot see: an index signature intersected onto
// the object rather than declared within it reads back fine while making the
// type uninhabitable.
//
export const typedIn: FinitioInputs._Typed = { name: 'a', age: 42 };
export const typed: Typed = { name: 'a', age: 42 };
export const looseIn: FinitioInputs._Loose = { name: 'a', whatever: 'anything' };
export const loose: Loose = { name: 'a' };
export const closed: Closed = { name: 'a' };
export const relational: Relational = [{ name: 'a', lead: 'b', extra: 'c' }];
