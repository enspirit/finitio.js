{Meta, should, intType} = require('../../helpers')

describe 'Meta (Set)', ->

  info = {
    elmType: { builtin: { jsType: String } }
  }

  it 'dresses as expected', ->
    should(()-> Meta.SetType.dress(info)).not.throw()
