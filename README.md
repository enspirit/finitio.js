[![Build Status](https://travis-ci.org/llambeau/qjs.png?branch=master)](https://travis-ci.org/llambeau/qjs)
[![Jasmine Test Status](https://saucelabs.com/buildstatus/qlangjs)](https://saucelabs.com/u/qlangjs)
[![Dependency Status](https://david-dm.org/llambeau/qjs.png)](https://david-dm.org/llambeau/qjs)

# Qjs

Q is a language for capturing information structure. Think "JSON/XML schema"
but the correct way. For more information about Q itself, see
[www.q-lang.io](http://www.q-lang.io)

Qjs is the javascript binding of Q. It allows defining Q schemas and
validating/coercing data against them in an idiomatic javascript way.

## Browser compatibility matrix

[![Compatibility Status](https://saucelabs.com/browser-matrix/qlangjs.svg)](https://saucelabs.com/u/qlangjs)

## Example

Coming very soon now.

## ADTs Internal Information Contracts

Abstract Data Types can be defined and dressed using Qjs, provided you
register them at parsing time for name resolution purposes. Let take the usual
`Color` example. (We "qualify" type names below only to avoid confusion, in
practice, one would probably use `Color` everywhere.)

In Q,

```
QByte  = .Number // should be defined more accurately, of course
QColor = .JsColor <rgb> { r: QByte, g: QByte, b: QByte }
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

// you must let Qjs know about JsColor, in the following way
system = Qjs.parse(schema, { JsColor: Color });

// dressing will then work as expected
color = system.getType("QColor").dress({r: 12, g: 125, b: 98});
```

## ADTs External Information Contracts

Qjs also allows defining so-called 'external' information contracts for
situations where implementing the dresser and undresser functions as show
above is not possible or not wanted.

In Q,

```
QByte  = .Number // should be defined more accurately, of course
QColor = .JsColor <rgb> { r: QByte, g: QByte, b: QByte } .ExternalContract
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

// you must let Qjs know about ExternalContract, in the following way
system = Qjs.parse(schema, { ExternalContract: ColorContract });

// dressing will then work as expected
color = system.getType("QColor").dress({r: 12, g: 125, b: 98});
```

## Rep: QType -> Javascript Type

The `Rep` representation function mapping Q types to Javascript types is as
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

# Sets are represented through javascript Arrays. Qjs checks for duplicates,
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
