Finitio = require '../../../src/finitio'
$u      = Finitio.Utils

# Skip the whole suite if not running in a browser
# TODO: use zombie when the suite is running on node.js
describe_suite = if $u.isBrowser() then describe else describe.skip

describe_suite 'When included in a browser', ->

  it 'should allow and parse finitio scripts', ->