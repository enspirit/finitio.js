$u = require('./support/utils')
DressMonad  = require './support/dress_monad'

#
# 'Abstract' class for Finitio types
#
class Type

  constructor: (@name, @metadata)->
    if @name? and typeof(@name) isnt "string"
      $u.argumentError("String expected, got", @name)

    @anonymous = not(@name?)
    @name ?= @defaultName()

  @factor: (from)->
    from[Object.keys(from)[0]]

  toFactor: ()->
    to = { }
    to[@generator] = this
    to

  setName: (name)->
    throw new Error("Name already set") unless @anonymous
    @name = name
    @anonymous = false

  setMetadata: (metadata)->
    throw new Error("Metadata already set") if @metadata
    @metadata = metadata

  #
  # Returns true if `value` is valid member of this type, false otherwise.
  #
  include: (value)->
    this._include(value)

  _include: (value)->
    $u.notImplemented(this, "include")

  #
  # Dress `value` with this information type and returns the result.
  #
  # @return the dressing result
  # @pre    true
  # @post   this.include(output)
  # @throws `TypeError` if the dressing fails
  #
  dress: (value, options)->
    monad = @mDress(value, DressMonad)
    if monad.isSuccess()
      monad.result
    else
      $u.dressError(monad.failure)

  mDress: (value, Monad)->
    @_mDress(value, Monad)

  _mDress: (value, Monad)->
    $u.notImplemented(this, "_mDress")

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
    this._undress(value, as.trueOne())

  _undress: (value, as)->
    # if `as` is a supertype of myself, then
    #   pre                 => post
    #   this.include(value) => as.include(value)
    return value if as.isSuperTypeOf(this)

    # Fall back to checking post condition explicitely
    return value if as.include(value)

    # otherwise, just fail
    $u.undressError("Unable to undress `#{value}` from #{this} to `#{as}`")

  #
  # Returns true of `this` is a super type of `other`, false otherwise.
  #
  isSuperTypeOf: (other)->
    this._isSuperTypeOf(other.trueOne())

  _isSuperTypeOf: (other)->
    this.equals(other) or other._isSubTypeOf(this)

  #
  # Returns true if `this` is known to be a subtype of `other`, false
  # otherwise.
  #
  # This method is private and should not be called directly. It is a fallback
  # strategy for isSuperTypeOf.
  #
  # The implementation MAY NOT call `isSuperTypeOf` to meet the contract. So
  # if you wonder whether `x.isSubTypeOf(y)`, use `y.isSuperTypeOf(x)`
  # instead.
  #
  _isSubTypeOf: (other)->
    false

  #
  # Returns this
  #
  fetchType: ()->
    this

  #
  # Returns true for fake types, false otherwise.
  #
  # Fake types are Alias and Proxy.
  #
  isFake: ()->
    false

  #
  # Returns the true type to be used in comparisons and hierachy queries
  #
  trueOne: ()->
    this

  #
  # Returns true if `other` is structurally equivalent to this type, false
  # otherwise.
  #
  equals: (other)->
    (other instanceof Type) && this._equals(other.trueOne())

  _equals: (other)->
    this is other

  #
  # Returns a String representation of this Type.
  #
  toString: ->
    @defaultName().toString()

module.exports = Type
