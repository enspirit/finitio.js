_           = require 'underscore'
TypeFactory = require './type/factory'

## base module
class Qjs

  @VERSION: "0.0.1"

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

  @DEFAULT_FACTORY: new TypeFactory

## DSL methods
for method in Qjs.DSL_METHODS
  if Qjs.DEFAULT_FACTORY[method]
    Qjs[method] = Qjs.DEFAULT_FACTORY[method].bind(Qjs.DEFAULT_FACTORY)

##
module.exports = Qjs