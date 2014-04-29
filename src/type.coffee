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
    # if `as` is a supertype of myself, then
    #   pre                 => post
    #   this.include(value) => as.include(value)
    return value if as.isSuperTypeOf(this)

    # otherwise, just fail
    throw new TypeError("Unable to undress `#{value}` to `#{as}`")

  #
  # Returns a String representation of this Type.
  #
  toString: ->
    @name.toString()

  #
  # Returns true of `this` is a super type of `other`, false otherwise.
  #
  isSuperTypeOf: (other)->
    this.equals(other) or other.isSubTypeOf(this)

  #
  # Returns true if `this` is a subtype of `other`, false otherwise.
  #
  # This method MAY NOT call `isSuperTypeOf` to implement the contract.
  #
  isSubTypeOf: (other)->
    false

  #
  # Returns true if `other` is structurally equivalent to this type, false
  # otherwise.
  #
  equals: (other)->
    (this is other) or
    (other.constructor.name == 'AliasType' and @equals(other.type))

module.exports = Type
