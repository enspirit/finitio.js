{Meta, should, intType} = require('../../helpers')

describe 'Meta (Type)', ->

  it 'dresses a type as expected', ->
    t = Meta.Type.dress(Meta.Js.String)
    should(t).equal(Meta.Js.String)

  it 'dresses an explicit info as expected', ->
    t = Meta.Type.dress({ builtin: { jsType: String } })
    should(t.equals(Meta.Js.String)).equal(true)

  it 'allows dressing any', ->
    t = Meta.Type.dress({ any: {} })
    should(t.generator).equal('any')
