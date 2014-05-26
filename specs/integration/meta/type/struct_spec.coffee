{Meta, should, intType} = require('../../helpers')

describe 'Meta (Struct)', ->

  info = {
    componentTypes: [ { builtin: { jsType: String } } ]
  }

  it 'dresses as expected', ->
    should(()-> Meta.StructType.dress(info)).not.throw()
