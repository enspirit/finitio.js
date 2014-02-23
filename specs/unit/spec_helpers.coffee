BuiltinType  = require('../../lib/type/builtin_type')
_            = require('underscore')

SpecHelpers = 
  
  # Builtins
  numType:    new BuiltinType(Number, 'numType')
  boolType:   new BuiltinType(Boolean, 'boolType')
  stringType: new BuiltinType(String, 'stringType')

#
module.exports = {}
_.extend(module.exports, SpecHelpers)