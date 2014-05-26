{Meta, should, intType} = require('../../helpers')

describe 'Meta (TypeRef)', ->

  info = {
    typeName: 'String'
  }

  it 'dresses as expected', ->
    should(()-> Meta.TypeRef.dress(info)).not.throw()
