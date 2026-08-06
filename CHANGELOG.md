# 2.0.0 -- 6 August 2026

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
