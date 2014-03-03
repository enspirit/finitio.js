BuiltinType  = require('../../lib/type/builtin_type')
SubType      = require('../../lib/type/sub_type')
_            = require('underscore')


# Builtins
numType    = new BuiltinType(Number, 'numType')
boolType   = new BuiltinType(Boolean, 'boolType')
stringType = new BuiltinType(String, 'stringType')

# SubType
intType = new SubType(numType, {
    noDecimal: (i) -> i % 1 == 0
    noDot:     (i) -> i.toString().indexOf('.') == -1
  }, 'intType')

floatType = new SubType(numType, {
    hasDecimal: (i) -> i % 1 != 0
    hasDot:     (i) -> i.toString().indexOf('.') != -1
  }, 'floatType')

byteType = new SubType(intType, byte: (i) -> i>=0 && i<=255 )

module.exports =
  numType: numType
  boolType: boolType
  stringType: stringType
  intType: intType
  floatType: floatType,
  byteType: byteType