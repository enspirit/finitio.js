{ArgumentError, NotImplementedError} = require './errors'

#
# 'Abstract' class for Finitio types
#
class Type

  constructor: (@name)->
    if @name? and typeof(@name) isnt "string"
      throw new ArgumentError("String expected, got", @name)

    @name ?= @defaultName()

  #
  # Dress `value` with this information type and returns the result.
  #
  # @return the dressing result
  # @pre    true
  # @post   this.include(output)
  # @throws `Finitio.Error` if the dressing fails
  #
  dress: (value)->
    throw new NotImplementedError(this, "dress")

  #
  # Undress `value` as a member of `as` type.
  #
  # @param  `as` another Type instance
  # @return the undressed result
  # @pre    this.include(value)
  # @post   as.include(output)
  #
  undress: (value, as)->
    throw new NotImplementedError(this, "undress")

  toString: ->
    @name.toString()

  equal: (other)->
    this is other

module.exports = Type
