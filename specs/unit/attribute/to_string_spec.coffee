AnyType   = require '../../../src/finitio/type/any_type'
Attribute = require '../../../src/finitio/support/attribute'
should    = require 'should'

describe "Attribute#toString", ->

  anyType = new AnyType()

  describe 'when implicitely required', ->
    attr = new Attribute('red', anyType)

    it 'works', ->
      should(attr.toString()).equal('red : .')

  describe 'when not required', ->
    attr = new Attribute('red', anyType, false)

    it 'works', ->
      should(attr.toString()).equal('red :? .')
