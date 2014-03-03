{ArgumentError, NotImplementedError} = require './errors'

#
# 'Abstract' class for Q types
#
class Type

  constructor: (@name)->
    if @name? and typeof(@name) isnt "string"
      throw new ArgumentError("String expected, got", @name)

    @name ?= @defaultName()

  dress: ->
    throw new NotImplementedError(this, "up")

  toString: ->
    @name.toString()

module.exports = Type