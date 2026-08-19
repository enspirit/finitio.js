import type { FinitioInputs, Id, Person } from '../.generated/documented';
import type { Equals, Expect } from './expect';

// A schema names its own TypeScript type through `ts` metadata, for what the
// generator cannot infer.
export type _id = Expect<Equals<Id, `${string}-${string}`>>
export type _idIn = Expect<Equals<FinitioInputs._Id, `${string}-${string}`>>

// Documenting a type does not change it.
export type _name = Expect<Equals<Person['name'], string>>
export type _age = Expect<Equals<Person['age'], number | undefined>>
