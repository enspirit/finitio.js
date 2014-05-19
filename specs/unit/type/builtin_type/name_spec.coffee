BuiltinType = require '../../../../src/finitio/type/builtin_type'
{TypeError} = require '../../../../src/finitio/errors'
should      = require 'should'

describe 'BuiltinType#name', ->

  nameOf = (type)->
    type.name

  describe 'when not provided', ->
    subject = nameOf new BuiltinType(Number)

    it 'uses the default name', ->
      subject.should.equal("Number")

  describe 'when provided', ->
    subject = nameOf new BuiltinType(Number, "num")

    it 'uses the specified name', ->
      subject.should.equal("num")
