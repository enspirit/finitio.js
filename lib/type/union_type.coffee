_               = require 'underscore'
Type            = require '../type'
DressHelper     = require '../support/dress_helper'
{ArgumentError} = require '../errors'

$u              = require '../support/utils'

class UnionType extends Type

  constructor: (@candidates, @name) ->
    @name ?= null

    $u.each @candidates, (c) ->
      unless c instanceof Type
        throw new ArgumentError("Qjs.Type expected, got", c)

    super(@name)

  # Invoke `dress` on each candidate type in turn. Return the value
  # returned by the first one that does not fail. Fail with an TypeError if no
  # candidate succeeds at tranforming `value`.
  dress: (value, helper) ->
    helper ?= new DressHelper

    # Do nothing on TypeError as the next candidate could be the good one!
    match = _.find @candidates, (c) ->
      [success, uped] = helper.justTry ->
        c.dress(value, helper)

      return success

    return match.dress(value, helper) if match?

    # No one succeed, just fail
    helper.failed(this, value)

  include: (value) ->
    found = _.find @candidates, (c) -> c.include(value)
    found?

  defaultName: ->
    _.map(@candidates, (c) -> c.name).join('|')

  equals: (other) ->
    return false unless other instanceof UnionType
    ## TODO: there's probably a better way to do this
    ## ... but _.isEqual doesn't work for [1, 2] == [2, 1]
    unless _.isEqual(_.difference(other.candidates, @candidates), [])
      return false

    unless _.isEqual(_.difference(@candidates, other.candidates), [])
      return false

    true

module.exports = UnionType
