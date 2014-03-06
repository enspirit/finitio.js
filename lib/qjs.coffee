fs          = require 'fs'
Path        = require 'path'
_           = require 'underscore'
TypeFactory = require './support/factory'
Parser      = require './syntax/parser'

## base module
class Qjs

  @VERSION: "0.0.1"

  ## DSL

  @FACTORY: new TypeFactory

  for method in TypeFactory.PUBLIC_DSL_METHODS
    Qjs[method] = @FACTORY[method].bind(@FACTORY)

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

  @DEFAULT_SYSTEM = Qjs.system("Q/default")

##
module.exports = Qjs
