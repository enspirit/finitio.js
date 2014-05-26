{Meta, should, intType} = require('../../helpers')

describe 'Meta (TypeDef)', ->

  info = {
    name: 'String'
    type: { builtin: { jsType: String } }
  }

  it 'dresses as expected', ->
    should(()-> Meta.TypeDef.dress(info)).not.throw()
