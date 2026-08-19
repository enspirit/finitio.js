import type { Coord, Either, Main } from '../.generated/identity';
import type { Equals, Expect } from './expect';

// An ADT with no `.JsType` preamble has no JS type on either side: it is
// exactly its information type.
export type _coord = Expect<Equals<Coord, [number, number]>>
export type _either = Expect<Equals<Either, string | number>>

export const coord: Main = { c: [1, 2], e: 'x' };
