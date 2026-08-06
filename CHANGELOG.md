# 2.1.0 -- 6 August 2026

Broken APIs:

* Dressing no longer keeps extra attributes that carry no type guarantee.
  A heading with an untyped `...` accepts extra attributes but constrains
  them in no way, so Finitio can vouch for nothing about them; they are now
  dropped from the dressed value instead of being carried through unchecked.
  A typed `...: Age` does guarantee their type, and keeps them as before.
  The same applies to relations, and to an explicit `...: .`, which states no
  more than a bare `...` does.

  This aligns finitio.js with finitio-rb, which has always behaved this way.
  Note that the change is silent: such schemas keep dressing successfully,
  but attributes that used to reach the dressed value no longer do. Code
  relying on `...` to carry data through must now declare what those
  attributes are — individually, or with a typed `...: T` — or read them from
  the input document rather than from the dressed value.

Bug fixes:

* A generic instantiated more than once in the same system no longer reuses
  the arguments of its first instantiation. Given `Page<T> = { items: [T] }`,
  `{ a: Page<Person>, b: Page<Product> }` validated `b` against `Person`.
  Binding a generic's parameters resolves the proxies in its body, and a
  resolved proxy stays resolved, so each instantiation now binds its own copy
  of the definition.

# 2.0.1 -- release candidates only

Never released as such: published only as `2.0.1-rc1` (March 2024) through
`2.0.1-rc6` (August 2025), which is where the `latest` tag sat until 2.1.0.
The changes below therefore reach a stable release for the first time in
2.1.0, and are listed separately only because they predate it.

Bug fixes:

* The standard library resolver no longer gates on `__dirname`, so
  `@import finitio/data` resolves from an ESM entry point instead of failing
* Heading attributes may start with an uppercase letter
* Fix an incorrect `require` in the import resolver

Minor changes:

* The typescript bundler generates type aliases for `String` and `Boolean`
* `System#resolve()` is properly typed

# 2.0.0 -- 5 March 2024

Major improvements:

* Support for generic (high-order) types, e.g.
  `Resource<T,A> = { data: Data<T,A>, links: [String] }` then
  `People = Resource<People.Type,People.Attrs>`
* The whole library is written in TypeScript and ships its own type
  definitions
* The distribution provides both a CommonJS and an ESM build
* The typescript generator has been considerably improved and is now exposed
  as a bundler target

Broken APIs:

* Node.js >= 22.12.0 is now required
* The package now exposes an `exports` map and ships `dist/` only. `main`
  moved from `index.js` to `./dist/finitio.js`, `import` resolves to
  `./dist/finitio.mjs` and types to `./dist/finitio.d.ts`. Deep requires such
  as `finitio/lib/...` no longer resolve; import the package root instead.
* The command-line interface is rewritten around subcommands. Use
  `finitio bundle SCHEMA.fio [-t javascript|typescript]` and
  `finitio validate SCHEMA.fio DATA.json` instead of the former
  `finitio-js --bundle` / `--validate` flags. `bundle` gains `--prelude` and
  `--stdlib`.
* The typescript bundle no longer exposes the system without its world
* `Native` is now simply `(arg: unknown) => boolean`; the
  `finitioSourceCode` field is gone. It was never assigned, so native
  constraints have always printed as `...`.

Minor changes:

* Migrate the grammar from PEG.js to Peggy
* Get rid of Babel; build with tsup, lint with the flat eslint config
* Upgrade dependencies

Bug fixes:

* A `null` inside a sequence or a set now raises a validation error instead
  of a native JavaScript `TypeError`
* A comma nested inside `()`, `{}`, `[]` or a string literal no longer ends a
  native constraint expression, so quantifiers such as
  `/^[A-Za-z0-9_-]{1,64}$/` and argument lists such as `s.slice(0,2)` work as
  expected

# 1.3.7 -- 12 December 2022

Bug fixes:

* Fix release missing the stdlib

# 1.3.6 -- 12 December 2022

Bug fixes:

* Fix exposition of the typescript generator
* Remove binary packages from releases

# 1.3.5 -- 12 December 2022

Major improvements:

* Add a typescript generator, generating type definitions from a schema

Minor changes:

* Remove Travis in favor of Github Actions

# 1.3.4 -- 23 October 2021

Bug fixes:

* Fix the browserify build to expose `Finitio` like previous 1.x.x versions

# 1.3.3 -- 23 October 2021

Minor changes:

* Decaffeinate finitio.js: the source is now javascript instead of coffeescript
* Add Github Actions workflows

Bug fixes:

* Fix the browserify build
* Fix version number inclusion

# 1.3.1 -- 23 October 2021

Minor change:

* Upgrade grunt-mocha-test

# 1.3.0 -- 25 February 2021

Major improvements:

* Add support for subsystem (`System#subsystem`)
* Add support for type "namespacing" (ex: `Person.ID = String`)

# 0.1.0 -- 4 June 2014

Major improvements:

* Conformance to Finitio 0.4 (recursive types, metadata, imports)

Broken APIs:

* `Finitio.parse` no longer returns a System, but parses a source schema and
  returns the equivalent JSON information. Use `Finitio.system` instead.
* `System#parse` no longer exists. Use imports instead.
* `System` is now considered immutable. `addType` and similar methods have
  been removed accordingly.

# 0.0.1 -- 9 March 2014

* Birthday
