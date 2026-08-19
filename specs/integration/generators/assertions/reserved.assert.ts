import type { Array, Main, System, Type, World } from '../.generated/reserved';
import type { Equals, Expect } from './expect';

//
// A schema is free to name a type after anything the generated file uses for
// itself. The file's own imports live behind one `Finitio`-prefixed namespace,
// and the `Array` the generator emits is spelled `globalThis.Array` as soon as
// the bare name means something else.
//
export type _type = Expect<Equals<Type, string>>
export type _system = Expect<Equals<System, string>>
export type _world = Expect<Equals<World, string>>
export type _array = Expect<Equals<Array, string>>

export type _seq = Expect<Equals<Main['xs'], globalThis.Array<number>>>
export type _set = Expect<Equals<Main['set'], globalThis.Array<number>>>
