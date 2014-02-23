BuiltinType  = require('../../lib/type/builtin_type')
_            = require('underscore')

SpecHelpers = 
  
  numType: ->
    new BuiltinType(Number, 'numType')


#
module.exports = {}
_.extend(module.exports, SpecHelpers)