{Meta, should, intType} = require('../../helpers')

describe 'Meta (Seq)', ->

  info = {
    elmType: { builtin: { jsType: String } }
  }

  it 'dresses as expected', ->
    should(()-> Meta.SeqType.dress(info)).not.throw()
