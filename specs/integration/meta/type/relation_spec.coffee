{Meta, should, intType} = require('../../helpers')

describe 'Meta (Relation)', ->

  info = {
    heading: {
      attributes: []
    }
  }

  it 'dresses as expected', ->
    should(()-> Meta.RelationType.dress(info)).not.throw()
