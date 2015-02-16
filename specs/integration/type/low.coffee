{Finitio, Fixtures, should} = require '../helpers'

describe "Type#low for easy persistence", ->

  system = Finitio.system(Fixtures.loadFile('low.fio'))

  raw = { name: "Finitio", releasedAt: '2015-02-16' }

  dressed = ->
    system.dress(raw)

  undressed = ->
    system.undress(dressed())

  it 'is properly dressed initially', ->
    should(dressed().releasedAt.getTime()).equal(1424044800000)

  it 'low lets undress easily!', ->
    should(undressed().releasedAt).equal('2015-02-16')
