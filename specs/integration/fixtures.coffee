fs = require('fs')
Fixtures = module.exports = {}

Fixtures.loadFile = (path)->
  fs.readFileSync('specs/integration/fixtures/' + path).toString()
