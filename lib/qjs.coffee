_           = require 'underscore'
TypeFactory = require './support/factory'
Parser      = require './syntax/parser'

## base module
class Qjs

  @VERSION: "0.0.1"

  @DSL_METHODS: [
    'attribute',
    'heading',
    'constraint',
    'constraints',
    'builtin',
    'adt',
    'sub_type',
    'union',
    'seq',
    'set',
    'tuple',
    'relation',
    'type'
  ]

  @DEFAULT_FACTORY: new TypeFactory

  ## Parsing
  Qjs.parse = (source) ->
    Parser.parse(source)

  ## DSL methods
  for method in Qjs.DSL_METHODS
    Qjs[method] = Qjs.DEFAULT_FACTORY[method].bind(Qjs.DEFAULT_FACTORY)

##
module.exports = Qjs
