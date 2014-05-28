{Finitio, should, $u} = require('../helpers')
System = Finitio.System
Relative = require('../../../src/finitio/resolver').Relative

describe "Resolver.Relative", ->

  world = Finitio.world(sourceUrl: 'file://specs/integration/fixtures/foo')

  tests = ->
    it 'works with existing schemas', ->
      s = Relative('./test', world)
      should(s[0]).equal("file://specs/integration/fixtures/test")
      should(s[1]).not.be.an.instanceof(System)
      should(s[1].types).not.equal(undefined)

    it 'raises on unexisting file', ->
      lambda = ->
        Relative('./no-such-one', world)
      should(lambda).throw("No such file: `specs/integration/fixtures/no-such-one`")

  if $u.isBrowser
    it.skip 'works, but not in the browser', ->
  else
    it 'works provided the file system is available', tests
