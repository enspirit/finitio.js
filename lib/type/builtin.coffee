Type    = require '../type'
Handler = require '../support/from_q_helper'

class BuiltinType extends Type

  constructor: (@jsType, @name) ->
    super(@name)

  from_q: (value, handler) ->
    unless handler?
      handler = new Handler

    unless 

module.exports = BuiltinType