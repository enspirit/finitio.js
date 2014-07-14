BuiltinType = require '../../../../src/finitio/type/builtin_type'
{TypeError} = require '../../../../src/finitio/errors'
should      = require 'should'
_           = require 'underscore'

describe "BuiltinType#toString", ->

  type = new BuiltinType(Number)

  it "equals '.Number'", ->
    should(type.toString()).equal('.Number')
