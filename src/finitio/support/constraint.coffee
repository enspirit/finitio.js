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
    throw new Error("Constraint is an abstract class")

  equals: (other)->
    (this is other) or
    (other instanceof Constraint and @native==other.native)

class Constraint.Native extends Constraint
  kind: 'native'

  accept: (arg) ->
    @native(arg)

class Constraint.Regexp extends Constraint
  kind: 'regexp'

  accept: (arg) ->
    @native.test(arg)
#
module.exports = Constraint
