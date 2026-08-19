import type { FinitioImports, Main } from '../.generated/collisions';
import type { Equals, Expect } from './expect';

// The schema's own definitions shadow the imported ones, as they do at runtime.
export type _id = Expect<Equals<Main['id'], string>>
export type _when = Expect<Equals<Main['when'], number>>

// ... and the shadowed ones survive, under their own system's namespace.
export type _stdInteger = Expect<Equals<FinitioImports.Data.Integer, number>>
export type _stdDate = Expect<Equals<FinitioImports.Data.Date, Date>>
