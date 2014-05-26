{Meta, should, intType} = require('../../helpers')

describe 'Meta (Builtin)', ->

  info = {
    jsType: String
  }

  it 'dresses as expected', ->
    should(()-> Meta.BuiltinType.dress(info)).not.throw()
