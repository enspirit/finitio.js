AnyType     = require '../../../../src/finitio/type/any_type'
{TypeError} = require '../../../../src/finitio/errors'
should      = require 'should'
_           = require 'underscore'

describe "AnyType#toString", ->

  type = new AnyType

  it "equals '.'", ->
    should(type.toString()).equal('.')
