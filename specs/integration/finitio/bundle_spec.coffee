{should, Finitio, Fixtures} = require('../helpers')

describe 'Compiler', ->

  subject = ->
    Finitio.bundle(Fixtures.loadFile('test.fio'))

  it 'returns a string', ->
    should(subject()).be.an.instanceof(String)

  it 'is a javascript valid source', ->
    should(eval(subject())).be.an.instanceof(Function)

  it 'yields a system when injected with the world', ->
    should(eval(subject())(Finitio.World)).be.an.instanceof(Finitio.System)

  it 'resolves everything without relying on an external resolver', ->
    lambda = ->
      world = Finitio.world({ importResolver: undefined })
      eval(subject())(world)
    should(lambda).not.throw()
    should(lambda()).be.an.instanceof(Finitio.System)