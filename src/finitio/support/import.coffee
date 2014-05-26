{ObjectType} = require '../support/ic'

class Import
  ObjectType this, ['from', 'qualifier'], (i, world)->
    i.system = world.importResolver(i.from, world)

  constructor: (@from, @qualifier)->

module.exports = Import