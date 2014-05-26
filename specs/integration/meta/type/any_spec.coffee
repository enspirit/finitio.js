{Meta, should, intType} = require('../../helpers')

describe 'Meta (Any)', ->

  info = {
  }

  it 'dresses as expected', ->
    should(()-> Meta.AnyType.dress(info)).not.throw()
