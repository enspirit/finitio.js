TypeFactory = require './support/factory'
Parser      = require './parser'
Meta        = require './systems/meta'
$u          = require './support/utils'

class Compiler

  constructor: (@world)->

  compile: (source)->
    parsed = Parser.parse(source)
    Meta.System.dress(parsed, @world)

module.exports = Compiler
