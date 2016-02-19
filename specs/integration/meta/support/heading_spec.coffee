{Meta, should, anyType, intType} = require('../../helpers')
TypeRef = require('../../../../src/finitio/type/type_ref')

describe 'Meta (Heading)', ->

  it 'coerces allowExtra:true to AnyType', ->
    info = {
      attributes: [{
        name: 'r',
        type: intType,
        required: false
      }],
      options: { allowExtra: true }
    }
    should(()-> Meta.Heading.dress(info)).not.throw()
    should(Meta.Heading.dress(info).options.allowExtra).eql(anyType)

  it 'leaves the allowExtra:false option unchanged', ->
    info = {
      attributes: [{
        name: 'r',
        type: intType,
        required: false
      }],
      options: { allowExtra: false }
    }
    should(()-> Meta.Heading.dress(info)).not.throw()
    should(Meta.Heading.dress(info).options.allowExtra).eql(false)

  it 'dresses any type given for the allowExtra option', ->
    info = {
      attributes: [{
        name: 'r',
        type: intType,
        required: false
      }],
      options: { allowExtra: { ref: { typeName: '.' } } }
    }
    should(()-> Meta.Heading.dress(info)).not.throw()
    should(Meta.Heading.dress(info).options.allowExtra).be.an.instanceof(TypeRef)

  it 'supports not passing options', ->
    info = {
      attributes: [{
        name: 'r',
        type: intType,
        required: false
      }]
    }
    should(()-> Meta.Heading.dress(info)).not.throw()
