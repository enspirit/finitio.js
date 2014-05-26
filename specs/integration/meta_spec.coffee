{should, Finitio, Fixtures, Meta, Parser} = require('./helpers')

describe 'Meta', ->

  subject = ->
    src = Fixtures.loadFile('standard.fio')
    parsed = Parser.parse(src)

    try
      Meta.System.dress(parsed, Finitio.World)
    catch e
      console.log(e.debugTree())
      should(false).eql(true)

  it 'supports dressing from the result of the parser', ->
    should(subject()).be.an.instanceof(Finitio.System)

  it 'resolves proxies and properly binds contracts', ->
    should(subject().Date.dress("2014-12-15")).be.an.instanceof(Date)