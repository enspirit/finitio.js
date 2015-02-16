BuiltinType = require '../../../../src/finitio/type/builtin_type'
{TypeError} = require '../../../../src/finitio/errors'
should      = require 'should'
_           = require 'underscore'

describe "BuiltinType#low", ->

  type = new BuiltinType(Number)

  it "equals itself", ->
    should(type.low()).equal(type)
