{TypeError} = require '../../../../src/finitio/errors'
AliasType   = require '../../../../src/finitio/type/alias_type'
should      = require 'should'
{intType}   = require '../../../spec_helpers'

describe "AliasType#dress", ->

  it "delegates to the aliased type", ->
    type = new AliasType(intType, "Foo")
    should(type.dress(12)).equal(12)

  it 'rephrases the error', ->
    type = new AliasType(intType, "Foo")

    err = try
      type.dress("bar")
    catch e
      e

    should(err).be.an.instanceof(TypeError)
    should(err.message).eql("Invalid Foo: `bar`")

    rc = err.getRootCause()
    should(rc.message).eql("Invalid Number: `bar`")