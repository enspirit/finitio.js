{should, Finitio, Fixtures, Meta, Parser} = require('../helpers')

describe 'Meta', ->

  subject = ->
    src = Fixtures.loadFile('test.fio')
    try
      parsed = Parser.parse(src)
    catch e
      console.log(e)
      should(false).eql(true)

    try
      Meta.System.dress(parsed, Finitio.World)
    catch e
      console.log(e.explainTree())
      should(false).eql(true)

  it 'supports dressing from the result of the parser', ->
    should(subject()).be.an.instanceof(Finitio.System)

  it 'resolves proxies and properly binds contracts', ->
    info = {
      name: 'Finitio.js'
      version: '0.2'
      releasedAt: '2014-05-26'
    }
    dressed = subject().dress(info)
    should(dressed.releasedAt).be.an.instanceof(Date)
