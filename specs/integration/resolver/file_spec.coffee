{Finitio, should, $u} = require('../helpers')
System = Finitio.System
File = require('../../../src/finitio/resolver').File

describe "Resolver.File", ->

  tests = ->
    it 'works with existing files', ->
      s = File('file://specs/integration/fixtures/test.fio', Finitio.world())
      should(s[0]).equal("file://specs/integration/fixtures/test.fio")
      should(s[1].types).not.equal(undefined)

    it 'supports json files too', ->
      s = File('file://specs/integration/fixtures/test.json', Finitio.world())
      should(s[0]).equal("file://specs/integration/fixtures/test.json")
      should(s[1].types).not.equal(undefined)

    it 'allows not specifying the extension', ->
      s = File('file://specs/integration/fixtures/test', Finitio.world())
      should(s[0]).equal("file://specs/integration/fixtures/test")
      should(s[1].types).not.equal(undefined)

  if $u.isBrowser
    it.skip 'works, but not in the browser', ->
  else
    it 'works provided the file system is available', tests
