{Meta, should, intType} = require('../../helpers')

describe 'Meta (Attribute)', ->

  info = {
    name: 'r',
    type: intType,
    required: false
  }

  it 'dresses as expected', ->
    should(()-> Meta.Attribute.dress(info)).not.throw()
