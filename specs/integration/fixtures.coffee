fs = require('./fixtures-jsed')
Fixtures = module.exports = {}

Fixtures.loadFile = (path)->
  fs['specs/integration/fixtures/' + path]
