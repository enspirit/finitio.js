{Meta, should, intType} = require('../../helpers')

describe 'Meta (Heading)', ->

  it 'supports options', ->
    info = {
      attributes: [{
        name: 'r',
        type: intType,
        required: false
      }],
      options: { allowExtra: true }
    }
    should(()-> Meta.Heading.dress(info)).not.throw()
    should(Meta.Heading.dress(info).allowExtra()).eql(true)

  it 'supports not passing options', ->
    info = {
      attributes: [{
        name: 'r',
        type: intType,
        required: false
      }]
    }
    should(()-> Meta.Heading.dress(info)).not.throw()
