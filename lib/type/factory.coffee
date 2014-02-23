{NotImplementedError} = require '../errors'
t                     = require '../type'

class TypeFactory

  type: (type, name, callback) ->
    throw new NotImplementedError(this, "type")

  # Collections

  seq: (type, name) ->
    throw new NotImplementedError(this, "seq")

  set: (type, name) ->
    throw new NotImplementedError(this, "set")

  # Tuples and relations
  tuple: (type, name) ->
    throw new NotImplementedError(this, "tuple")

  relation: (type, name) ->
    throw new NotImplementedError(this, "relation")

#
module.exports = TypeFactory