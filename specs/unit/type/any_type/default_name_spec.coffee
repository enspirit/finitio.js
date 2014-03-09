AnyType = require '../../../../src/type/any_type'
should  = require 'should'

describe 'AnyType#defaultName', ->

  type = new AnyType("any")

  it 'has a default name', ->
    type.defaultName().should.equal("Any")
