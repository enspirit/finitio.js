# Unreleased

Major improvements:

* Generated TypeScript is formatted the way TypeScript is normally written:
  `name: string;` rather than `name:string,`, closing braces indented with
  what they close, and a description on the line above the member it
  documents rather than crammed in front of it. This matters now that
  `finitio types` output is meant to be committed and read.

  It needed `@enspirit/ts-gen-dsl` 0.1.0, which also fixes a namespace nested
  inside another being silently dropped -- worked around here until now by
  flattening every namespace to its dotted form.

* A `finitio types` command, generating the TypeScript declarations of a
  schema: the types alone, with neither a loader nor an inlined schema, so the
  output is a plain `.d.ts` to commit and review.

  ```shell
  finitio types schema.fio -o schema.fio.d.ts
  finitio types schema.fio -o schema.fio.d.ts --watch
  ```

  Load the schema yourself and name the generated collection, and dressing is
  typed with no cast -- `Finitio.system` was already generic over it:

  ```typescript
  import type { Main, System0 } from './schema.fio.d';
  const system = Finitio.system<System0>(source);
  const data: Main = system.dress(json);
  ```

  `--watch` follows the schema and its transitive imports, and keeps going
  across a broken edit. Also exposed programmatically as `Finitio.typesFile`
  and `Finitio.typesSource`, and as `generateTypes` for a bundle of systems.

* Imported systems are namespaced after their source rather than their
  position: `FinitioImports.Data`, not `FinitioSystem1`. Swapping two
  `@import` lines used to rewrite every reference in the generated file, which
  is tolerable for a regenerated bundle and not for a `.d.ts` under review.
  Two systems whose urls end on the same name are told apart by a digest of
  the url, so adding a third never renames the first two.

* The typescript generator carries much more of what a schema states.

  A set constraint becomes a literal union, which is the one constraint that
  maps exactly onto TypeScript: `Colour = String :: {"red", "blue"}` generates
  `'red' | 'blue'`. A union of tuples sharing such an attribute is therefore a
  discriminated union, and narrows.

  A `/- description -/` becomes TSDoc, on type definitions and on tuple
  attributes alike.

  A `...` is no longer dropped. A typed `...: Age` guarantees the extra
  attributes and they survive dressing, so it generates an index signature on
  both sides; a bare `...` guarantees nothing and its extras are dropped when
  dressing, so it widens the input type only.

  A schema can name its TypeScript type itself, through metadata, for anything
  the generator cannot infer:

  ```finitio
  /- description: "A UUID", ts: "`${string}-${string}`" -/
  Uuid = String :: /^[0-9a-f-]+$/
  ```

  The standard library uses it to state that `Nil` is `null`, so a union with
  it now reads as one instead of collapsing the whole union to `any`.

* Two options on `finitio bundle -t typescript`:

  `--brands` emits constrained sub types as nominal types, so that a
  `Positive` cannot be confused with the `number` it refines. Brands compose,
  and keep the sub typing direction: `Small` flows to `Positive` flows to
  `number`, never the other way round. Inputs are never branded. Off by
  default: brands are viral, and only pay off when sub types carry meaning.

  `--any-as unknown` maps Finitio's `Any` onto `unknown` rather than `any`.

* `System#resolve` is typed against the generated collection.
  `system.resolve('Person')` returns a definition that dresses at `Person`,
  where it used to return an untyped one. `TypeDef` and `TypeRef` carry the
  type parameters of what they wrap, which is what makes this work.

Bug fixes:

* A bundle no longer substitutes its template's placeholders into the schema's
  own text. They were filled one `replace` after another, so each call scanned
  what the previous one had injected: a schema naming a type `URL` -- or merely
  describing one -- had the bundle's source url dropped into its first mention
  of the word, and left the loader calling `importResolver('URL')`, which
  resolves to nothing. The whole inlined AST could land inside a doc comment.
  Filling is now a single pass, so a placeholder is only ever a placeholder of
  the template. Affected both the typescript and the javascript target.

* A `$` in generated TypeScript survives bundling. The replacement was a
  string, in which `$$`, `$&`, `` $` `` and `$'` are directives, so a `ts:`
  override of ``` `$${number}` ``` came out as ``` `${number}` ```.

* `--brands` no longer turns `Nil` into `never`, which silently dropped the
  null from every nullable. A brand is an intersection, and `null & { ... }` is
  `never` -- an arm that then vanishes from the union it sits in, so
  `String|Nil` dressed to plain `string` while still accepting `null` as input.
  Three things now prevent it: a definition that states its TypeScript type
  through `ts:` is left alone, so is a sub type of `Any` (where the
  intersection collapses the other way and lets any object through), and
  `FinitioBrand` is conditional, passing a type that cannot carry a brand
  through untouched.

* Brands are qualified by the namespace their definition is emitted under. Two
  systems of a bundle both defining a `Positive` used to get the same brand,
  and stayed mutually assignable -- the very confusion brands exist to deny.

* `Boolean`'s `True` and `False` generate `true` and `false` rather than
  `boolean`. Like `Nil`, they now state their TypeScript type in the stdlib.

* `bundle` never checked the schema, and `--no-check` did nothing. The command
  declared the flag and never read it, wiring `check` to the program-level
  `--fast`, which is always undefined on a subcommand. A schema referring to
  an undefined type was bundled without complaint. Checking is now on by
  default, `--no-check` opts out, and `--fast` reaches the command.

* A failing command exits non-zero. It used to report the error and exit 0,
  which no build pipeline could act on.

* A set or array literal whose first member is falsy no longer loses it:
  `Integer :: {0, 1, 2}` parsed as `[null, 1, 2]`, and `[false]` as `[]`. The
  parser told an absent optional head from one that had matched `0`, `false`
  or `""` by truthiness.

* A finitio set generates `Array<T>` rather than `Set<T>`. A set dresses to --
  and is fed from -- a JavaScript Array whose elements happen to be unique;
  there was never a `Set` on either side.

* `AnyAst` no longer makes the metadata of `.` untypeable: its
  `Record<string, never>` index signature swallowed the `metadata` key.

* The TypeScript bundler (`finitio bundle -t typescript`) now generates code
  that compiles. It did not, for any schema at all: the AST it inlines did not
  satisfy the `SystemAst` type it declares it against, and the loader it emits
  was not `strictNullChecks`-safe.

* Types of imported systems are emitted under a namespace of their own, instead
  of all systems sharing one flat scope. A schema that defines a type named
  after one of the standard library's -- `Integer`, `String`, `Date`, ... --
  used to generate two `export type` of the same name, and therefore a file
  that could not compile. The `Date` special case this had called for is gone.

* Type parameters are no longer renamed in the inputs namespace: `Page<T>` used
  to generate `_Page<T> = { items: Array<_T> }`, referring to a `_T` that
  exists nowhere. A parameter also correctly shadows a system type of the same
  name, as it does in the schema itself.

* Input types no longer leak dressed types. The input of a sub type, of an ADT
  or of a union built over a type reference used to be generated as the
  *dressed* type of that reference -- silently, since the result still
  compiled. `People.Adult = Person( p | ... )` generated
  `FinitioInputs.People._Adult = Person` instead of `FinitioInputs._Person`.

* An ADT over a JavaScript class finitio cannot name -- anything but a
  primitive or a global -- used to be emitted as a bare identifier that no
  declaration backed. Those now go through a generated `FinitioJsTypes`
  interface, whose members consumers refine through declaration merging.

* The AST types exposed by `finitio/parser` are aligned with what the parser
  actually produces: `TypeDefAst` carries `metadata`, `ImportAst` carries
  `qualifier`, a range constraint is `{ range: { min, max } }`, an ADT
  contract's `identity` is optional, and a contract's information type is any
  type rather than only a builtin one.

Minor changes:

* The keys of the generated type collection are the names the system is indexed
  by at runtime: a namespaced type is `'People.Adult'` rather than
  `People_Adult`.

* Generated bundles are covered by golden files, are type-checked under
  `--strict`, and are evaluated and dressed against, in `specs/integration/generators`.

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
