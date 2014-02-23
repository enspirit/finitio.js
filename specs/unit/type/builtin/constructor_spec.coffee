BuiltinType = require '../../../../lib/type/builtin_type'
should      = require 'should'

describe "BuiltinType#constructor", ->

  type = new BuiltinType(Number)

  it 'should set instance variables', ->
    type.jsType.should.equal(Number)