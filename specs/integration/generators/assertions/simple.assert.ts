import type { AcceptedInput, DressedType, System } from 'finitio';
import type { FinitioInputs, Main, System0 } from '../.generated/simple';
import type { Equals, Expect } from './expect';

// Builtins map to TypeScript primitives on both sides.
export type _name = Expect<Equals<Main['name'], string>>
export type _nameIn = Expect<Equals<FinitioInputs._Main['name'], string>>

// An ADT dresses to its JS type, and accepts its contracts' information types.
export type _date = Expect<Equals<Main['releasedAt'], Date>>
export type _dateIn = Expect<Equals<FinitioInputs._Main['releasedAt'], Date | string | number>>

// The collection ties the two together, which is what `System#dress` reads.
export type _dressed = Expect<Equals<DressedType<System0['Main']>, Main>>
export type _input = Expect<Equals<AcceptedInput<System0['Main']>, FinitioInputs._Main>>

// Resolving a name from the collection types the definition that comes back,
// and therefore what dressing through it takes and returns.
declare const system: System<System0>;
type Resolved = ReturnType<typeof system.resolve<'Main'>>

export type _resolvedDress = Expect<Equals<ReturnType<Resolved['dress']>, Main>>
export type _resolvedInput = Expect<Equals<Parameters<Resolved['dress']>[0], FinitioInputs._Main>>
