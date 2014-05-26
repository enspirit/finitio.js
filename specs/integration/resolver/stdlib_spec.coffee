Finitio = require('../../../src/finitio')
System  = require('../../../src/finitio/system')
StdLib  = require('../../../src/finitio/resolver').StdLib
should  = require('should')

describe "Resolver.StdLib", ->

  it 'works with existing schemas', ->
    try
      s = StdLib('finitio/data', Finitio.World)
      should(s).be.an.instanceof(System)
    catch e
      should(false).eql(true)

  it 'ignores non stdlib', ->
    s = StdLib('hello/world', Finitio.World)
    should(s).eql(null)
