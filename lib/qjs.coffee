_           = require 'underscore'
TypeFactory = require './type/factory'

## base module
class Qjs

  @VERSION: "0.0.0"

  @DSL_METHODS: [
    'attribute',
    'heading',
    'constraints',
    'builtin',
    'adt',
    'subtype',
    'union',
    'seq',
    'set',
    'tuple',
    'relation',
    'type'
  ]

  @DEFAULT_FACTORY: new TypeFactory()

## DSL methods
for method in Qjs.DSL_METHODS
  Qjs[method] = (args...) ->
    Qjs.DEFAULT_FACTORY[method](args)

##
Qjs.Errors    = require './errors'
Qjs.Type      = require './type'

##
module.exports = Qjs