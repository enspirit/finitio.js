import type { FinitioInputs, Main, Page, Person } from '../.generated/generics';
import type { Equals, Expect } from './expect';

export type _people = Expect<Equals<Main['people'], Page<Person>>>
export type _peopleIn = Expect<Equals<
  FinitioInputs._Main['people'],
  FinitioInputs._Page<FinitioInputs._Person>
>>

// A type parameter is never renamed, not even in the inputs namespace.
export type _param = Expect<Equals<FinitioInputs._Page<string>['items'], Array<string>>>

// ... and instantiating it carries the input side all the way down.
export type _dates = Expect<Equals<
  FinitioInputs._Main['dates']['items'],
  Array<Date | string | number>
>>
export type _datesDressed = Expect<Equals<Main['dates']['items'], Array<Date>>>

export type _pair = Expect<Equals<Main['labelled'], [string, number]>>

// A type parameter shadows a system type of the same name, as it does in the
// schema itself.
export type _boxed = Expect<Equals<Main['boxed']['value'], string>>
export type _boxedIn = Expect<Equals<FinitioInputs._Main['boxed']['value'], string>>
