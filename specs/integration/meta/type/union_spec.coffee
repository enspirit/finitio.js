{Meta, should, intType} = require('../../helpers')

describe 'Meta (Union)', ->

  info = {
    candidates: [ { builtin: { jsType: String } } ]
  }

  it 'dresses as expected', ->
    should(()-> Meta.UnionType.dress(info)).not.throw()
