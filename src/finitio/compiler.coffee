TypeFactory = require './support/factory'
Parser      = require './parser'
Meta        = require './systems/meta'
$u          = require './support/utils'

class Compiler

  constructor: (options)->
    $u.extend(this, options)

  compile: (source)->
    parsed = Parser.parse(source)
    Meta.System.dress(parsed, @world)

module.exports = Compiler
