{TypeError} = require '../../../../src/finitio/errors'
TypeDef   = require '../../../../src/finitio/type/type_def'
should      = require 'should'
{intType}   = require '../../../spec_helpers'

describe "TypeDef#dress", ->

  it "delegates to the aliased type", ->
    type = new TypeDef(intType, "Foo")
    should(type.dress(12)).equal(12)

  it 'rephrases the error', ->
    type = new TypeDef(intType, "Foo")

    err = try
      type.dress("bar")
    catch e
      e

    should(err).be.an.instanceof(TypeError)
    should(err.message).eql("Invalid Foo: `bar`")
