Attribute = require '../../../src/finitio/support/attribute'
should    = require 'should'
{intType} = require '../../spec_helpers'

describe "Attribute's information contract", ->

  describe 'without metadata', ->
    info = {
      name: 'r',
      type: intType
      required: true
    }
    attr = Attribute.info(info)

    it 'dresses as expected', ->
      should(attr).be.an.instanceof(Attribute)
      should(attr.name).equal('r')
      should(attr.type).equal(intType)
      should(attr.required).equal(true)
      should(attr.metadata).equal(undefined)

    it 'undresses as expected', ->
      should(attr.toInfo()).eql(info)

  describe 'with metadata', ->
    info = {
      name: 'r',
      type: intType,
      required: false
      metadata: { foo: 'bar' }
    }
    attr = Attribute.info(info)

    it 'dresses as expected', ->
      should(attr).be.an.instanceof(Attribute)
      should(attr.name).equal('r')
      should(attr.type).equal(intType)
      should(attr.required).equal(false)
      should(attr.metadata).eql({ foo: 'bar' })

    it 'undresses as expected', ->
      should(attr.toInfo()).eql(info)
