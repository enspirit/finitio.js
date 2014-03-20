$u          = require './support/utils'
TypeFactory = require './support/factory'
Parser      = require './syntax/parser'

## base module
class Finitio

  @VERSION: "0.0.1"

  ## DSL

  @FACTORY: new TypeFactory

  for method in TypeFactory.PUBLIC_DSL_METHODS
    Finitio[method] = @FACTORY[method].bind(@FACTORY)

  ## Parsing

  @parse = (source, options) ->
    Parser.parse(source, options || {})

  ## Systems

  @system = (identifier) ->
    path = Path.join __dirname, "#{identifier}.fio"
    if fs.existsSync(path)
      content = fs.readFileSync(path).toString()
      @parse(content)
    else
      throw new Error("Unknown system #{identifier}")

  @DEFAULT_SYSTEM = require("./Finitio/default")

##
$u.extend Finitio, require './errors'
$u.extend Finitio, require './support/contracts'

module.exports = Finitio
