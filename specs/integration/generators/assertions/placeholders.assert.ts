import type { FinitioInputs, Main, Price, URL } from '../.generated/placeholders';
import type { Equals, Expect } from './expect';

// A type named after a bundle placeholder is emitted, and referenced, as-is.
export type _url = Expect<Equals<URL, string>>
export type _home = Expect<Equals<Main['home'], URL>>

// A `ts:` override carrying a literal `$` survives into the bundle: a
// replacement *string* would have read the `$$` as an escape and eaten one.
export type _price = Expect<Equals<Price, `$${number}`>>
export type _priceIn = Expect<Equals<FinitioInputs._Price, `$${number}`>>
