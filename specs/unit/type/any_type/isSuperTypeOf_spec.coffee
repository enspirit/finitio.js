AnyType     = require '../../../../src/finitio/type/any_type'
{TypeError} = require '../../../../src/finitio/errors'
should      = require 'should'
{intType}   = require '../../../spec_helpers'

describe 'AnyType#isSuperTypeOf', ->

  type = AnyType.info({})

  it 'returns true against itself', ->
    should(type.isSuperTypeOf(type)).equal(true)

  it 'return true againt another type', ->
    should(type.isSuperTypeOf(intType)).equal(true)
