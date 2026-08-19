import type { FinitioInputs, FinitioJsTypes, Main } from '../.generated/kitchen';
import type { Equals, Expect } from './expect';

export type _point = Expect<Equals<Main['point'], [number, number]>>
export type _team = Expect<Equals<Main['team'], Array<{ name: string, lead: string }>>>

// A set constraint maps onto a literal union...
export type _color = Expect<Equals<Main['colors'], Array<'red' | 'blue'>>>
// ... every other constraint is not expressible, and leaves the super type.
export type _score = Expect<Equals<Main['score'], number>>

// An ADT over a JS class finitio cannot name goes through `FinitioJsTypes`.
export type _root = Expect<Equals<Main['root'], FinitioJsTypes['Field']>>

// The input of an ADT is a union of its JS type and its contracts' information
// types -- which stay on the input side, recursively.
export type _rootIn = Expect<Equals<
  FinitioInputs._Main['root'],
  FinitioJsTypes['Field'] | { id: string, children?: Array<FinitioInputs._Node> }
>>

// A finitio set dresses to an Array whose elements are unique, not to a Set.
export type _tags = Expect<Equals<Main['person']['tags'], Array<string>>>
export type _tagsIn = Expect<Equals<FinitioInputs._Person['tags'], Array<string>>>

// Nil is null.
export type _nick = Expect<Equals<Main['person']['nick'], string | null>>
