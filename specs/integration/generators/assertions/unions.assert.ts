import type { Circle, Main, Shape } from '../.generated/unions';
import type { Equals, Expect } from './expect';

// Nil is null, so a union with it reads as one.
export type _note = Expect<Equals<Main['note'], string | null>>

// Any is unknown under `anyAs: 'unknown'`.
export type _any = Expect<Equals<Main['any'], unknown>>

// A union whose candidates share a literal-typed attribute is a discriminated
// union, and narrows.
export type _narrow = Expect<Equals<Extract<Shape, { kind: 'circle' }>, Circle>>
export type _radius = Expect<Equals<Extract<Shape, { kind: 'circle' }>['radius'], number>>
