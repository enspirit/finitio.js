{ArgumentError, NotImplementedError, TypeError} = require './errors'

#
# 'Abstract' class for Finitio types
#
class Type

  constructor: (@name)->
    if @name? and typeof(@name) isnt "string"
      throw new ArgumentError("String expected, got", @name)

    @name ?= @defaultName()

  #
  # Returns true if `value` is valid member of this type, false otherwise.
  #
  include: (value)->
    throw new NotImplementedError(this, "include")

  #
  # Dress `value` with this information type and returns the result.
  #
  # @return the dressing result
  # @pre    true
  # @post   this.include(output)
  # @throws `TypeError` if the dressing fails
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
  # @throw  `TypeError` if undressing fails
  #
  undress: (value, as)->
    return value if this.equals(as)
    throw new TypeError("Unable to undress `#{value}` to `#{as}`")

  #
  # Returns a String representation of this Type.
  #
  toString: ->
    @name.toString()

  #
  # Returns true if `other` is structurally equivalent to this type, false
  # otherwise.
  #
  equal: (other)->
    this is other

module.exports = Type
