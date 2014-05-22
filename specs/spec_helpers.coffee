Constraint   = require '../src/finitio/support/constraint'
BuiltinType  = require '../src/finitio/type/builtin_type'
SubType      = require '../src/finitio/type/sub_type'
_            = require 'underscore'

# Builtins
numType    = new BuiltinType(Number, 'numType')
boolType   = new BuiltinType(Boolean, 'boolType')
stringType = new BuiltinType(String, 'stringType')

# SubType
intType = new SubType numType, [
    new Constraint.Native('noDecimal', (i) -> i % 1 == 0),
    new Constraint.Native('noDot', (i) -> i.toString().indexOf('.') == -1)
  ], 'intType'

floatType = new SubType numType, [
    new Constraint.Native('hasDecimal', (i) -> i % 1 != 0),
    new Constraint.Native('hasDot', (i) -> i.toString().indexOf('.') != -1)
  ], 'floatType'

byteType = new SubType intType, [
    new Constraint.Native('byte', (i) -> i>=0 && i<=255)
  ]

module.exports =
  numType: numType
  boolType: boolType
  stringType: stringType
  intType: intType
  floatType: floatType,
  byteType: byteType
