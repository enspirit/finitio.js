{Meta, should, intType} = require('../../helpers')

describe 'Meta (Contract)', ->

  info = {
    name: 'iso'
    infoType: intType
    explicit: {
      dress: ()->
      undress: ()->
    }
    metadata: { foo: 'bar' }
  }

  it 'dresses as expected', ->
    subject = ()->
      Meta.Contract.dress(info)

    should(subject).not.throw()
    should(subject().metadata).eql({ foo: 'bar' })
