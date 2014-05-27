{ObjectType} = require '../support/ic'

class Import
  ObjectType this, ['from', 'qualifier'], (imp, world)->
    imp.system = world.importResolver(imp.from, world)

  constructor: (@from, @qualifier)->

module.exports = Import