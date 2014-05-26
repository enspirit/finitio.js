{Meta, should, intType} = require('../../helpers')

describe 'Meta (Attribute)', ->

  context 'when required is unspecified', ->
    info = {
      name: 'r',
      type: intType
    }

    it 'dresses as expected', ->
      subject = ()-> Meta.Attribute.dress(info)
      should(subject).not.throw()
      should(subject().required).eql(true)

  context 'when not required', ->
    info = {
      name: 'r',
      type: intType,
      required: false
    }

    it 'dresses as expected', ->
      subject = ()-> Meta.Attribute.dress(info)
      should(subject).not.throw()
      should(subject().required).eql(false)
