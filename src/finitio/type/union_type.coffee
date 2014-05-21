Type        = require '../type'
DressHelper = require '../support/dress_helper'
$u          = require '../support/utils'

class UnionType extends Type
  generator: 'union'

  constructor: (@candidates, @name, @metadata) ->
    @name ?= null

    $u.each @candidates, (c) ->
      unless c instanceof Type
        $u.argumentError("Finitio.Type expected, got:", c)

    super(@name, @metadata)

  # Invoke `dress` on each candidate type in turn. Return the value
  # returned by the first one that does not fail. Fail with an TypeError if no
  # candidate succeeds at tranforming `value`.
  dress: (value, helper) ->
    helper ?= new DressHelper

    # Do nothing on TypeError as the next candidate could be the good one!
    match = $u.find @candidates, (c) ->
      [success, uped] = helper.justTry ->
        c.dress(value, helper)

      return success

    return match.dress(value, helper) if match?

    # No one succeed, just fail
    helper.failed(this, value)

  undress: (value, as) ->
    return value if this is as

    # find a candidate which is a subtype of as
    if (using = $u.find @candidates, (c)-> as.isSuperTypeOf(c))
      return using.undress(value, as)

    # find candidate that includes value
    else if (using = $u.find @candidates, (c)-> c.include(value))
      return using.undress(value, as)

    else
      $u.undressError("Unable to undress `#{value}` to `#{as}`")

  include: (value) ->
    found = $u.find @candidates, (c) -> c.include(value)
    found?

  defaultName: ->
    $u.map(@candidates, (c) -> c.name).join('|')

  isSuperTypeOf: (other)->
    (this is other) or
    ($u.any @candidates, (c) -> c.isSuperTypeOf(other)) or
    (other instanceof UnionType and
    $u.every other.candidates, (d)=>
      $u.any @candidates, (c) ->
        c.isSuperTypeOf(d)) or
    super

  equals: (other) ->
    (this is other) or
    (other instanceof UnionType and @candidatesEquals(other, true)) or
    super

  candidatesEquals: (other, andback) ->
    return false unless $u.every @candidates, (c)->
      $u.any other.candidates, (c2)-> c.equals(c2)
    true
    !andback or other.candidatesEquals(this, false)

module.exports = UnionType
