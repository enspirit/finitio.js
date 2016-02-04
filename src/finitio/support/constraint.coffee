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

  accept: (arg, world) ->
    throw new Error("Constraint is an abstract class")

  equals: (other)->
    (this is other) or
    (other instanceof Constraint and @native==other.native)

  toString: () ->
    str = @nativeToString()
    str = @name + ": " + str unless @isAnonymous()
    str

  nativeToString: () ->
    @native.toString()

class Constraint.Native extends Constraint
  kind: 'native'

  accept: (arg, world) ->
    @native(arg)

  nativeToString: () ->
    @native.finitioSourceCode || "..."

class Constraint.Regexp extends Constraint
  kind: 'regexp'

  accept: (arg, world) ->
    @native.test(arg)

class Constraint.Function extends Constraint
  kind: 'function'

  accept: (arg, world) ->
    identifiers = @native.split('.')
    path = ""
    func = world

    $u.each identifiers, (id, idx) ->
      path += '.' if idx > 0
      path += id
      func = func[id]
      unless func
        throw new Error("#{path} is undefined");

    func(arg)

  nativeToString: () ->
    '&' + @native

  equals: (other)->
    (this is other) or
    (other instanceof Constraint.Function and @native==other.native)

class Constraint.Range extends Constraint
  kind: 'range'

  accept: (arg, world) ->
    (if @native.min_inclusive then arg >= @native.min else arg > @native.min) &&
    ((@native.max is undefined) ||
    (if @native.max_inclusive then (arg <= @native.max) else (arg < @native.max)))

  equals: (other)->
    return true if (this is other)
    return false unless (other instanceof Constraint.Range)
    (@native.min == other.native.min and @native.min_inclusive == other.native.min_inclusive) and
    ((@native.max is undefined and other.native.max is undefined) or
     (@native.max == other.native.max and @native.max_inclusive == other.native.max_inclusive))

  nativeToString: () ->
    return "#{@native.min}.." unless @native.max
    return "#{@native.min}...#{@native.max}" unless @native.max_inclusive
    return "#{@native.min}..#{@native.max}"

AbstractType Constraint,
  [ Constraint.Native, Constraint.Regexp, Constraint.Range ],
  [ 'name', 'native', 'metadata' ], 1

#
module.exports = Constraint
