Finitio = require('../../../src/finitio')
System  = require('../../../src/finitio/system')
StdLib  = require('../../../src/finitio/resolver').StdLib
should  = require('should')

describe "Resolver.StdLib", ->

  it 'works with existing schemas', ->
    s = StdLib('finitio/data', Finitio.World)
    should(s[0]).equal("http://finitio.io/" + Finitio.CONFORMANCE + "/stdlib/data")
    should(s[1]).not.be.an.instanceof(System)
    should(s[1].types).not.equal(undefined)

  it 'ignores non stdlib', ->
    s = StdLib('hello/world', Finitio.World)
    should(s).eql(null)

  it 'raises on unexisting stdlib', ->
    lambda = ->
      StdLib('finitio/no-such-one', Finitio.World)
    should(lambda).throw("No such stdlib system: `finitio/no-such-one`")
