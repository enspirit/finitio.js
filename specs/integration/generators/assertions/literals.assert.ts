import type { Colour, Falsy, Flag, Priority, Ranged } from '../.generated/literals';
import type { Equals, Expect } from './expect';

// A set constraint is the one constraint that maps exactly onto TypeScript.
export type _colour = Expect<Equals<Colour, 'red' | 'green' | 'blue'>>
export type _priority = Expect<Equals<Priority, 0 | 1 | 2>>
export type _flag = Expect<Equals<Flag, true>>

// Including when its members are falsy.
export type _falsy = Expect<Equals<Falsy, 0 | false | ''>>

// Any other constraint is not expressible, and leaves the super type alone.
export type _ranged = Expect<Equals<Ranged, number>>
