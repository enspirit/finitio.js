BuiltinType = require '../../../../lib/type/builtin_type'
should      = require 'should'

describe 'BuiltinType#default_name', ->

  type = new BuiltinType(Number, "num")

  it 'uses the native name', ->
    type.defaultName().should.equal("Number")