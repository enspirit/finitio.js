{ObjectType} = require '../support/ic'
Type         = require '../type'
$u           = require '../support/utils'

class TypeDef extends Type
  ObjectType this, ['type', 'name', 'metadata']

  constructor: (@type, @name, @metadata) ->
    unless @name
      $u.argumentError("Name cannot be null on TypeDef")
    super(@metadata)
    @generator = @type.generator

  fetch: ()->
    @type.fetch.apply(@type, arguments)

  _include: (value)->
    @type.include(value)

  _mDress: (value, Monad)->
    m = @type.mDress(value, Monad)
    m.onFailure (cause)=>
      if @name is 'Main'
        cause.typeName = 'Data'
      else
        cause.typeName = @name
      m

  _undress: (value, as)->
    @type.undress(value, as)

  _isSuperTypeOf: (child)->
    @type.isSuperTypeOf(child)

  _isSubTypeOf: (sup)->
    @type._isSubTypeOf(sup)

  _equals: (other)->
    @type.equals(other)

  isFake: ()->
    true

  trueOne: ()->
    @type

  resolveProxies: (system)->
    @type.resolveProxies(system)

#
module.exports = TypeDef
