{Fixtures, Finitio, should} = require '../helpers'

describe "Maximum call stack exceeded on recursive types", ->

  system = null

  class Field

    constructor: (@_raw)->

    @raw: (raw)->
      return new Field(raw)

    toRaw: ()->
      return @_raw

  beforeEach ->
    try
      src = Fixtures.loadFile('recursive.fio')
      world = { JsTypes: { Field: Field } }
      system = Finitio.system(src, world)
    catch e
      console.log(e)

  it 'lets dress a logical field', ->
    d = system.Logical.dress({ id: "foo" })
    should(d).be.an.instanceof(Field)

  it 'lets dress a logical field with children', ->
    d = system.Logical.dress({ id: "foo", children: [{id: "bar"}] })
    should(d).be.an.instanceof(Field)
    should(d._raw.children[0]).be.an.instanceof(Field)

  it 'lets undress to a physical field', ->
    d = system.Logical.dress({ id: "foo" })
    system.Logical.undress(d, system.Physical)

  it 'lets undress to a physical field with children', ->
    d = system.Logical.dress({ id: "foo", children: [{id: "bar"}] })
    system.Logical.undress(d, system.Physical)
