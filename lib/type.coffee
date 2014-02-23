{ArgumentError, NotImplementedError} = require './errors'

Function::property = (prop, desc) ->
  Object.defineProperty @prototype, prop, desc

#
# 'Abstract' class for Q types
#
class Type

  constructor: (@name)->
    if @name? and typeof(@name) isnt "string"
      throw new ArgumentError("String expected, got", @name)

    @name ?= @defaultName()

  fromQ: ->
    throw new NotImplementedError(this, "up")

module.exports = Type