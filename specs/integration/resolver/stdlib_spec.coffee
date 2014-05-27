Finitio = require('../../../src/finitio')
System  = require('../../../src/finitio/system')
StdLib  = require('../../../src/finitio/resolver').StdLib
should  = require('should')

describe "Resolver.StdLib", ->

  it 'works with existing schemas', ->
    s = StdLib('finitio/data', Finitio.World)
    should(s[0]).equal("http://finitio.io/stdlib/data")
    should(s[1].types).not.equal(undefined)

  it 'ignores non stdlib', ->
    s = StdLib('hello/world', Finitio.World)
    should(s).eql(null)
