{Meta, should, intType} = require('../../helpers')

describe 'Meta (Contract)', ->

  info = {
    name: 'iso',
    infoType: intType,
    explicit: {
      dress: ()->
      undress: ()->
    }
  }

  it 'dresses as expected', ->
    should(()-> Meta.Contract.dress(info)).not.throw()
