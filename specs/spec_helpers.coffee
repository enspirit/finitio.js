Constraint   = require '../src/finitio/support/constraint'
AnyType      = require '../src/finitio/type/any_type'
BuiltinType  = require '../src/finitio/type/builtin_type'
SubType      = require '../src/finitio/type/sub_type'
_            = require 'underscore'

anyType = new AnyType()

# Builtins
numType    = new BuiltinType(Number)
boolType   = new BuiltinType(Boolean)
stringType = new BuiltinType(String)

# SubType
intType = new SubType numType, [
    new Constraint.Native('noDecimal', (i) -> i % 1 == 0),
    new Constraint.Native('noDot', (i) -> i.toString().indexOf('.') == -1)
  ]

floatType = new SubType numType, [
    new Constraint.Native('hasDecimal', (i) -> i % 1 != 0),
    new Constraint.Native('hasDot', (i) -> i.toString().indexOf('.') != -1)
  ]

byteType = new SubType intType, [
    new Constraint.Native('byte', (i) -> i>=0 && i<=255)
  ]

module.exports =
  anyType: anyType
  numType: numType
  boolType: boolType
  stringType: stringType
  intType: intType
  floatType: floatType,
  byteType: byteType
