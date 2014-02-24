_               = require 'underscore'
Type            = require '../type'
Handler         = require '../support/from_q_helper'
{ArgumentError} = require '../errors'

# Extend underscore with the string helpers
_.str = require 'underscore.string'

class UnionType extends Type

  constructor: (@candidates, @name) ->
    @name ?= null

    _.each @candidates, (c) =>
      unless c instanceof Type
        throw new ArgumentError("Qjs.Type expected, got", c)

    super(@name)

  # Invoke `from_q` on each candidate type in turn. Return the value
  # returned by the first one that does not fail. Fail with an TypeError if no
  # candidate succeeds at tranforming `value`.
  fromQ: (value, handler) ->
    handler ?= new Handler
    
    # Do nothing on TypeError as the next candidate could be the good one!
    match = _.find @candidates, (c) ->
      [success, uped] = handler.justTry ->
        c.fromQ(value, handler)

      return success

    return match.fromQ(value, handler) if match?
    
    # No one succeed, just fail
    handler.failed(this, value)
  
  defaultName: ->
    _.map(@candidates, (c) -> c.name).join('|')

  equals: (other) ->
    return false unless other instanceof UnionType
    ## TODO: there's probably a better way to do this
    ## ... but _.isEqual doesn't work for [1, 2] == [2, 1]
    return false unless _.isEqual(_.difference(other.candidates, @candidates), [])
    return false unless _.isEqual(_.difference(@candidates, other.candidates), [])
    true

module.exports = UnionType