Errors = require './errors'

#
# 'Abstract' class for Q types
#
class Type

  constructor: (@name)->
    if not @name? or typeof(@name) isnt "string"
      throw new Errors.ArgumentError("String expected, got", @name)

  name: (value) ->
    if value?
      @name = value
    else
      @name | this.default_name()

  fromQ: ->
    throw new Errors.NotImplementedError(this, "up")

module.exports = Type