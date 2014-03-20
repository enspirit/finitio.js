[![Build Status](https://travis-ci.org/llambeau/finitio.js.png?branch=master)](https://travis-ci.org/llambeau/finitiojs)
[![Jasmine Test Status](https://saucelabs.com/buildstatus/finitiojs)](https://saucelabs.com/u/finitiojs)
[![Dependency Status](https://david-dm.org/llambeau/finitio.js.png)](https://david-dm.org/llambeau/finitio.js)

# Finitio.js

_Finitio_ is a language for capturing information structure. Think "JSON/XML schema"
but the correct way. For more information about _Finitio_ itself, see
[www.finitio.io](http://www.finitio.io)

_Finitio.js_ is the javascript binding of _Finitio_. It allows defining schemas and
validating/coercing data against them in an idiomatic javascript way.

## Browser compatibility matrix

[![Compatibility Status](https://saucelabs.com/browser-matrix/finitiojs.svg)](https://saucelabs.com/u/finitiojs)

## Example

Coming very soon now.

## ADTs with Internal Information Contracts

Abstract Data Types can be defined and dressed using Finitio.js, provided you
register them at parsing time for name resolution purposes. Let take the usual
`Color` example. (We "qualify" type names below only to avoid confusion, in
practice, one would probably use `Color` everywhere.)

In Finitio,

```
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

At parsing time:

```javascript
schema = "..." // as shows above

// you must let Finitio.js know about JsColor, in the following way
system = Finitio.parse(schema, { JsColor: Color });

// dressing will then work as expected
color = system.getType("Color").dress({r: 12, g: 125, b: 98});
```

## ADTs with External Information Contracts

Finitio.js also allows defining so-called 'external' information contracts for
situations where implementing the dresser and undresser functions as show
above is not possible or not wanted.

In Finitio,

```
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

At parsing time:

```javascript
schema = "..." // as shows above

// you must let Finitio.js know about ExternalContract, in the following way
system = Finitio.parse(schema, { ExternalContract: ColorContract });

// dressing will then work as expected
color = system.getType("Color").dress({r: 12, g: 125, b: 98});
```

## Rep: Finitio Type -> Javascript Type

The `Rep` representation function mapping Finitio types to Javascript types is as
follows:

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
