{TypeType}  = require '../support/ic'
$u          = require '../support/utils'
Fetchable   = require '../support/fetchable'
Type        = require '../type'

# This class creates types which are dynamic wrappers-- when one of these created types
# are initialized, they take types as arguments and create headings for their contents based
# off of the types that they were passed as arguments
#
# Does this happen in _mDress?

class ParametricType extends Type
  TypeType this, 'parameterized', ['parameters', 'type']

  constructor: (@parameterNames, @wrappedType) ->

  _mDress: (value, Monad)->
    unless value instanceof Object
      return Monad.failure this, ["Invalid Parametric Type: `${value}`", [value]]
