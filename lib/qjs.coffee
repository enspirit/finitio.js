$u          = require './support/utils'
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

  @parse = (source, options) ->
    Parser.parse(source, options || {})

  ## Systems

  @system = (identifier) ->
    path = Path.join __dirname, "#{identifier}.q"
    if fs.existsSync(path)
      content = fs.readFileSync(path).toString()
      @parse(content)
    else
      throw new Error("Unknown system #{identifier}")

  @DEFAULT_SYSTEM = require("./Q/default")

##
$u.extend Qjs, require './errors'

module.exports = Qjs
