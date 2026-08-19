//
// Type-level assertions. These files are never executed: they are compiled by
// `typescript_spec.ts`, and any mismatch shows up as a compilation error.
//
export type Expect<T extends true> = T

export type Equals<A, B> =
  (<G>() => G extends A ? 1 : 2) extends (<G>() => G extends B ? 1 : 2) ? true : false
