BuiltinType = require '../../../../src/finitio/type/builtin_type'
{TypeError} = require '../../../../src/finitio/errors'
should      = require 'should'

describe "BuiltinType#include", ->

  type = new BuiltinType(Number)

  subject = (arg) -> type.include(arg)

  it 'when not included', ->
    subject("12").should.be.false

  it 'when included', ->
    subject(12).should.be.true
