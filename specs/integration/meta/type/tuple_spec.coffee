{Meta, should, intType} = require('../../helpers')

describe 'Meta (Tuple)', ->

  info = {
    heading: {
      attributes: []
    }
  }

  it 'dresses as expected', ->
    should(()-> Meta.TupleType.dress(info)).not.throw()
