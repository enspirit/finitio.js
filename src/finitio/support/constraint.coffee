$u             = require './utils'
{AbstractType} = require './ic'

#
# Helper class for constraints.
#
class Constraint

  constructor: (@name, @native, @metadata) ->
    if @name? and typeof(@name) != "string"
      $u.argumentError("String expected for constraint name, got: ", @name)

  isAnonymous: ->
    !@name?

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

AbstractType Constraint,
  [ Constraint.Native, Constraint.Regexp ],
  [ 'name', 'native', 'metadata' ], 1

#
module.exports = Constraint
