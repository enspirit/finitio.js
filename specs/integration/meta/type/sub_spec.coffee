{Meta, should, intType} = require('../../helpers')

describe 'Meta (Sub)', ->

  info = {
    superType: { builtin: { jsType: String } },
    constraints: [
      { name: 'min', native: ()-> }
    ]
  }

  it 'dresses as expected', ->
    should(()-> Meta.SubType.dress(info)).not.throw()
