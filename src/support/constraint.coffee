{ArgumentError,
TypeError}  = require '../errors'

#
# Helper class for constraints.
#
class Constraint

  constructor: (@name, @native) ->
    unless typeof @name == "string"
      throw new ArgumentError("String expected for constraint name, got", @name)

  isAnonymous: ->
    @name == 'default'

  accept: (arg) ->
    if typeof @native is "function"
      return true if @native(arg)

    else if @native.constructor == RegExp
      return true if @native.test(arg)

    false

  equals: (other)->
    return false unless other instanceof Constraint
    @native==other.native

#
module.exports = Constraint
