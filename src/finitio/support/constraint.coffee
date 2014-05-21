$u = require './utils'

#
# Helper class for constraints.
#
class Constraint

  constructor: (@name, @native, @metadata) ->
    unless typeof @name == "string"
      $u.argumentError("String expected for constraint name, got: ", @name)

  isAnonymous: ->
    @name == 'default'

  accept: (arg) ->
    if typeof @native is "function"
      return true if @native(arg)

    else if @native.constructor == RegExp
      return true if @native.test(arg)

    false

  equals: (other)->
    (this is other) or
    (other instanceof Constraint and @native==other.native)

#
module.exports = Constraint
