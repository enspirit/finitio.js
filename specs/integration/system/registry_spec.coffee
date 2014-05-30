{Finitio, should} = require '../helpers'

describe "System's registry", ->

  it 'installs the true type, not the type def', ->
    system = Finitio.system("Posint = .Number(i | i>0)")
    should(system.Posint).be.an.instanceof(Finitio.SubType)