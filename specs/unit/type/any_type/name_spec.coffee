AnyType     = require '../../../../src/type/any_type'
{TypeError} = require '../../../../src/errors'
should      = require 'should'

describe 'AnyType#name', ->

  nameOf = (type)->
    type.name

  describe 'when not provided', ->
    subject = nameOf new AnyType

    it 'uses the default name', ->
      subject.should.equal("Any")

  describe 'when provided', ->
    subject = nameOf new AnyType("anytype")

    it 'uses the specified name', ->
      subject.should.equal("anytype")
