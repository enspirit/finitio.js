fs          = require 'fs'
Path        = require 'path'
_           = require 'underscore'
TypeFactory = require './support/factory'
Parser      = require './syntax/parser'

## base module
class Qjs

  @VERSION: "0.0.1"

  @DSL_METHODS: [
    'jsType',
    'any',
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

  @FACTORY: new TypeFactory

  ## Parsing
  @parse = (source) ->
    Parser.parse(source)

  ## Systems
  @system = (identifier) ->
    path = Path.join __dirname, "#{identifier}.q"
    if fs.existsSync(path)
      content = fs.readFileSync(path).toString()
      @parse(content)
    else
      throw new Error("Unknown system #{identifier}")

  ## DSL methods
  for method in Qjs.DSL_METHODS
    Qjs[method] = Qjs.FACTORY[method].bind(Qjs.FACTORY)

##
module.exports = Qjs

Qjs.DEFAULT_SYSTEM = Qjs.system("Q/default")
