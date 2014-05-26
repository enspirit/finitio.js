{Meta, should, intType} = require('../../helpers')

describe 'Meta (Adt)', ->

  info = {
    jsType: String,
    contracts: []
  }

  it 'dresses as expected', ->
    should(()-> Meta.AdType.dress(info)).not.throw()
