AnyType     = require '../../../../src/finitio/type/any_type'
{TypeError} = require '../../../../src/finitio/errors'
should      = require 'should'
_           = require 'underscore'

describe "AnyType#low", ->

  type = new AnyType

  it "equals itself", ->
    should(type.low()).equal(type)
