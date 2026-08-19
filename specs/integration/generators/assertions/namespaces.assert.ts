import type { Contact, FinitioInputs, Main } from '../.generated/namespaces';
import type { Equals, Expect } from './expect';

// A namespaced type name becomes a TypeScript namespace, on both sides.
export type _email = Expect<Equals<Contact.Email, string>>
export type _emailIn = Expect<Equals<FinitioInputs.Contact._Email, string>>
export type _mainEmail = Expect<Equals<Main['email'], Contact.Email>>

// Optional attributes stay optional.
export type _phone = Expect<Equals<Main['phone'], Contact.Phone | undefined>>

// A qualified import resolves into the imported system.
export type _address = Expect<Equals<Main['address']['city'], string>>
export type _addressIn = Expect<Equals<FinitioInputs._Main['address']['street'], string>>
