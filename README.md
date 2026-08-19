# Finitio.js

Finitio is a language for capturing information structure. A little bit like
"JSON/XML schema" but on steroids. An example is show below. For more
information about Finitio itself, see [www.finitio.io](http://www.finitio.io)

```finitio
@import finitio/data

Uuid = String( s | s =~ /^[a-z0-9-]{36}$/ )
Name = String( s | s.length > 0 )
Temp = <celsius> Real( f | f >= 33.0 && f <= 45.0 )
{
  patient : {
    id   : Uuid
    name : Name
    dob  : Date( d | alive: d.year > 1890 )
  }
  symptoms : [ String( s | s.size > 0 ) ]
  temperature : Temp
}
```

Finitio.js is the javascript binding of Finitio. It allows defining
schemas and validating/coercing data against them in an idiomatic javascript
way.

## Status

[![Node.js CI](https://github.com/enspirit/finitio.js/actions/workflows/tests.yml/badge.svg)](https://github.com/enspirit/finitio.js/actions/workflows/tests.yml)
[![Dependency Status](https://david-dm.org/llambeau/finitio.js.png)](https://david-dm.org/llambeau/finitio.js)

## Features

Finitio.js is a stable and mature implementation conforming to
[Finitio 0.4](http://www.finitio.io/reference/0.4.x/). It also comes with the
following tooling:

* A `finitio` command line for validating data from a shell
* A TypeScript generator, for typing your data against your schema
* A bundler for preparing schemas and systems for use in a browser
* Nice error management strategy with understandable messages & stacks
* Try it online, at [http://finitio.io/try](finitio.io/try)
* A standard library, especially `finitio/data` for dressing numbers, dates
  times without pain, despite JavaScript weaknesses in that regard
* Experimental undressing strategy

## Getting started in Shell

* Validating data against a schema and showing all errors

    `finitio validate schema.fio data.json`

* Better understanding where validation errors come from

    `finitio --stack validate schema.fio data.json`

* Fail fast option (stop on first validation error)

    `finitio --stack --fast validate schema.fio data.json`

* Generating TypeScript declarations for a schema

    `finitio types schema.fio -o schema.fio.d.ts`

* Bundling a schema for the browser

    `finitio bundle schema.fio`

A failing command exits non-zero, so any of these can gate a build.

## Getting started in JavaScript

Roughly, getting started with finitio.js in JavaScript code works as follows:

```javascript
var Finitio = require('../index.js');

// Parses a schema and compiles to a System object
var schema = "                              \n\
Name = String( s | nonEmpty: s.length>0 )   \n\
[{ who: Name }]                             \n\
"
var system = Finitio.system(schema);

// Some data, with invalid tuples according to the schema above
var data = [
  { who: 'Finitio' },
  { who: 'JavaScript' },
  { who: '' },
  { who: 12 }
];

// dress/validate some data
try {
  system.dress(data);
} catch (ex) {
  // explain the validation errors
  // `explainTree` can be used for better debugging
  console.log(ex.explain());
}
```

## Imports and Standard Library

Since Finitio 0.4, imports are supported to split complex schemas in multiple
files. A standard library has also been started, from which you can import
too.

```finitio
# import types from utils.fio and ../support/tools.fio into this schema
@import ./utils
@import ../support/tools

# import from the standard library
@import finitio/data

# import from the web
@import http://my-finitio-schemas.org/somewhere/somefile
```

Refer to Finitio's web site for more documentation about
[imports](http://www.finitio.io/reference/0.4.x/imports) and the
[standard library](http://www.finitio.io/reference/0.4.x/stdlib).

## Bundling schemas (for the browser)

Complex finitio schemas can also be bundled as one self-contained javascript
file. The bundling process does not (yet) make schemas independent of
finitio.js itself (i.e. finitio is still a runtime dependency). However,
bundling can be used for:

* Checking the validity of your schema ahead of test & runtime time
* Avoiding costly parsing at runtime
* Avoiding the import resolution mechanism to occur at runtime, by bundling
  all dependencies in one file, including schemas from the standard library
  and the web.
* Making your schema ready in the browser, in particular not dependent of the
  file system (for relative imports).

Bundling can be done from a shell, as follows:

```shell
finitio bundle schema.fio > generated-finitio-bundle.js
```

The schema is checked before being bundled; pass `--no-check` to skip that,
and `--fast` to stop on the first error.

This will generate a javascript bunch of code. This code, when evaluated
returns a function that can be injected with the world to obtain the
compiled schema (see more about the world later). In practice:

```javascript
var schemaCompiler = require('generated-finitio-bundle.js');
var system = schemaCompiler();
system.dress({ some: 'data' });
```

In the scenario above, the schemaCompiler will require finitio by itself.
In some situations, such as when you use external javascript references,
however, you will need to pass a world instance for it to work properly.
This is explained in the next section.

## TypeScript

Finitio generates TypeScript types from a schema. Every Finitio type yields
two of them, mirroring the dress/undress duality:

* the **dressed** type -- what `dress()` gives back (`Date`, class instances);
* the **input** type -- what may be fed in, under a `FinitioInputs` namespace
  (`Date | string | number`).

There are two ways to use them.

### Declarations alongside your schema

```shell
finitio types schema.fio -o schema.fio.d.ts
finitio types schema.fio -o schema.fio.d.ts --watch   # regenerate on change
```

This emits the types alone -- no loader, no inlined schema -- so the output is
a plain `.d.ts` you can commit and review. Load the schema yourself, and name
the generated collection to type everything:

```typescript
import fs from 'fs';
import Finitio from 'finitio';
import type { Main, System0 } from './schema.fio.d';

const system = Finitio.system<System0>(fs.readFileSync('schema.fio').toString());

const data: Main = system.dress(json);   // fully typed, no cast
```

### A self-contained bundle

```shell
finitio bundle -t typescript schema.fio > schema.ts
```

This emits the same types *plus* a loader and the parsed schema, so nothing
is read at runtime and nothing resolves imports. Useful in the browser, or
wherever the `.fio` files are not around:

```typescript
import load from './schema';

const system = load();
const data = system.dress(json);
```

### What a schema states, and what comes out

| Finitio | dressed | input |
|---|---|---|
| `String`, `Integer` | `string`, `number` | idem |
| `Date` | `Date` | `Date \| string \| number` |
| `[T]` , `{T}` | `Array<T>` | `Array<T>` |
| `{{ a: T }}` | `Array<{ a: T }>` | idem |
| `<A,B>` | `[A, B]` | idem |
| `A\|B` | `A \| B` | idem |
| `String :: {"a","b"}` | `'a' \| 'b'` | idem |
| `Integer( i \| i > 0 )` | `number` | `number` |
| `{ a: T, ...: U }` | `{ a: T } & { [k: string]: U }` | idem |
| `{ a: T, ... }` | `{ a: T }` | `{ a: T } & { [k: string]: unknown }` |

A `/- description -/` becomes TSDoc. Namespaced type names (`People.Adult`)
become TypeScript namespaces, and imported schemas land under
`FinitioImports`, named after their source rather than their position, so
that adding an import does not churn the whole file.

Two options, on both commands:

* `--brands` makes constrained sub types nominal, so a `Positive` cannot be
  confused with the `number` it refines. Brands compose and keep the sub
  typing direction; inputs are never branded.
* `--any-as unknown` maps Finitio's `Any` onto `unknown` rather than `any`.

For what the generator cannot infer -- an ADT over one of your classes, a
string shape -- a schema can name its TypeScript type itself:

```finitio
/- description: "A UUID", ts: "`${string}-${string}`" -/
Uuid = String :: /^[0-9a-f-]+$/
```

ADTs over classes finitio cannot name go through a generated
`FinitioJsTypes` interface, which you refine by declaration merging.

Note that a shell has no way to hand those classes to the checker. A schema
with an ADT over one of your own classes therefore cannot be checked from the
command line, and needs `--no-check`:

```shell
finitio types --no-check schema.fio -o schema.fio.d.ts
```

Generation itself is unaffected -- only the check that runs before it. Use
`Finitio.typesFile(path, { JsTypes: { ... } })` to keep the check.

## Advanced scenarios and the World concept

Finitio relies on a World concept for:

* Resolving external references at compile time, (e.g. JavaScript's
  String, Number, Regexp or your own 'classes' when using ADTs), i.e. when you
  call `Finitio.system`.
* Resolving `@import`s
* Managing dressing options, e.g. `failfast`

In simple scenarios you won't need to hack with the world concept. However,
for advanced usage of Finitio, understanding the `world` argument taken by
many citizen is important. Those citizen are:

* `Finitio.system(source, world)` (e.g. for resolving builtins and ADTs)
* `Finitio.compile(source, world)` (idem, when compiling for the browser)
* `Type.dress(value, world)` (to make the world available to native information contracts)
* `System.dress(value, world)` (idem, delegated to main type)

### Resolving external references at compile time

The first scenario is the most frequent, where the world is used to resolve
extenal references. Finitio has a default world that already resolves
references to JavaScript main constants such as `Number` of `String`. Your
world, providing references to you own 'classes' will be merged with the
default one:

```javascript
// your own abstractions
var MyLibrary = { Color: function(){ } };

// you need to provide external references in world's JsTypes
var world = { JsTypes: { 'MyJsColor': MyLibrary.Color } };

// the world will be use to resolve `.MyJsColor` below. `.String` is already
// resolved by the default world
var system = Finitio.system("Color = .MyJsColor <as> .String", world);
```

### Passing options at dressing time

The following options can be set to the World when dressing & validating
data:

* `failfast`: When true, stops dressing as soon as a first validation error
  is found. When false (default), dressing will collect all errors before
  failing. The default option may be costly on complex schema, as it keeps
  the entire failure tree.

### Hacking in native information contracts

The world can also be used in internal and external information contracts.
This is not recommended, as it means that you dresser have side effects, but
it might be useful sometimes.

As an example, suppose that you have a global registry with elements as
follows (that might be a database, or the file system or whatever):

```javascript
var Registry = {
  1: { foo: 'bar' },
  2: { bar: 'baz' }
};
```

Maybe you want to provide an information contract for resolving ids to actual
data through that registry. Finitio does not allow you to do it with explicit
contracts, you want be able to resolve ids that way:

```finitio
Component = .Object <id> .Number \( id | ??? )
```

In contract, native contracts receive the world as second argument, meaning
that following scenario will work:

```javascript
var ComponentContract = {
  dress: function(id, world){
    var resolved = world.TheRegistry[id];
    if (resolved){
      return resolved;
    } else {
      throw new Error("No such component");
    }
  }
}
```

At compile time:

```javascript
var world  = { JsTypes: { ComponentContract: ComponentContract }};
var schema = 'Component = .Object <id> .Number .ComponentContract';
var system = Finitio.system(schema, world);
```

At dressing time:

```javascript
var world   = { TheRegistry: Registry };
var dressed = system.Component.dress(2, world);
```

## More on Internal Information Contracts

Abstract Data Types can be defined and dressed using Finitio.js, provided you
register them as show previously. Let take the usual `Color` example. (We
"qualify" type names below only to avoid confusion, in practice, one would
probably use `Color` everywhere.)

In Finitio,

```finitio
Byte  = .Number // should be defined more accurately, of course
Color = .JsColor <rgb> { r: Byte, g: Byte, b: Byte }
```

In Javascript,

```javascript
Color = function(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;
}
Color.rgb = function(tuple) {
  return new Color(tuple.r, tuple.g, tuple.b);
}
Color.prototype.toRgb = function(color){
  return {
    r: color.r,
    g: color.g,
    b: color.b
  };
}
```

At compile time:

```javascript
schema = "..." // as shown above

// you must let Finitio.js know about JsColor, in the following way
system = Finitio.system(schema, { JsTypes: { JsColor: Color } });

// dressing will then work as expected
color = system.Color.dress({r: 12, g: 125, b: 98});
```

## More on External Information Contracts

Finitio.js also allows defining so-called 'external' information contracts for
situations where implementing the dresser and undresser functions as show
above is not possible or not wanted.

In Finitio,

```finitio
Byte  = .Number // should be defined more accurately, of course
Color = .JsColor <rgb> { r: Byte, g: Byte, b: Byte } .ExternalContract
```

In Javascript,

```javascript
Color = function(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;
}
ColorContract = {
  dress: function(tuple) {
    return new Color(tuple.r, tuple.g, tuple.b);
  },
  undress: function(color) {
    return {
      r: color.r,
      g: color.g,
      b: color.b
    };
  }
}
```

At compile time:

```javascript
schema = "..." // as shown above

// you must let Finitio.js know about ExternalContract, in the following way
system = Finitio.system(schema, { JsTypes: { ExternalContract: ColorContract } });

// dressing will then work as expected
color = system.Color.dress({r: 12, g: 125, b: 98});
```

## Representation of Finitio Types as JavaScript types

The `Rep` representation function mapping Finitio types to Javascript types is
as follows:

```
# Any is anything in javascript
Rep(.) = any javascript value/object/stuff

# Builtins are represented by the corresponding javascript type
# Supported: Number, String, Boolean, Date and your own abstractions (see below)
Rep(.Builtin) = Builtin

# Sub types are represented by the same representation as the super type
Rep(SuperType( s | ... )) = Rep(SuperType)

# Unions are represented by the corresponding javascript types. No guaranteed
# result in terms of types, as `^` (least common super type) is difficult to
# define properly in javascript.
Rep(T1 | ... | Tn) = Rep(T1) ^ ... ^ Rep(Tn)

# Sequences are represented through javascript Arrays.
Rep([ElmType]) = Array<Rep(ElmType)>

# Sets are represented through javascript Arrays. _Finitio.js_ checks for duplicates,
# though.
Rep({ElmType}) = Array<Rep(ElmType)>

# Tuples are represented through standard javascript objects.
Rep({Ai => Ti}) = Object<{Ai: Rep(Ti)}>

# Relations are represented through Arrays of objects.
Rep({{Ai => Ti}}) = Array<Object<Ai => Rep(Ti)>>

# Abstract data types are represented through the corresponding javascript
# type when specified. ADTs behave as Union types if no type is bound.
Rep(.Builtin <rep> ...) = Builtin
```
