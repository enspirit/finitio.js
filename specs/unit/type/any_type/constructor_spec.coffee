AnyType = require '../../../../lib/type/any_type'
should  = require 'should'

describe "AnyType#constructor", ->

  type = new AnyType

  it 'should create an AnyType instance', ->
    type.should.be.an.instanceof AnyType
