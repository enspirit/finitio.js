StructType  = require '../../../../src/finitio/type/struct_type'
{TypeError} = require '../../../../src/finitio/errors'
_           = require 'underscore'
should      = require 'should'
{intType,
stringType} = require '../../../spec_helpers'

describe "StructType#dress", ->

  type = new StructType([intType, stringType], "point")

  subject = (arg) ->
    type.dress(arg)

  context 'with a valid Array', ->

    it 'should coerce to an array', ->
      arg = [ 12, 'foo' ]
      should(subject(arg)).eql(arg)

  context 'when raising an error', ->

    subject = (arg) ->
      err = try
        type.dress(arg)
      catch e
        e

    context 'with something else than an Array', ->
      arg = "foo"

      it 'should raise a TypeError', ->
        should(subject(arg)).be.an.instanceof(TypeError)
        should(subject(arg).message).equal("Array expected, got: `foo`")

      it 'should have no cause', ->
        should(subject(arg).cause).eql(undefined)

    context 'with a missing component', ->
      arg = [ 12 ]

      it 'should raise a TypeError', ->
        subject(arg).should.be.an.instanceof(TypeError)
        subject(arg).message.should.equal("Struct size mismatch: 1 for 2")

      it 'should have no cause', ->
        should(subject(arg).cause).eql(undefined)

    context 'with an extra attribute', ->
      arg = [ 12, 'foo', "bar" ]

      it 'should raise a TypeError', ->
        subject(arg).should.be.an.instanceof(TypeError)
        subject(arg).message.should.equal("Struct size mismatch: 3 for 2")

      it 'should have no cause', ->
        should(subject(arg).cause).eql(undefined)

    context 'with an invalid attribute', ->
      arg = [ 12, 14.2 ]

      it 'should raise a TypeError', ->
        should(subject(arg)).be.an.instanceof(TypeError)
        should(subject(arg).message).equal("Invalid Struct: `[12,14.2]`")

      it 'should have the expected root cause', ->
        rc = subject(arg).getRootCause()
        should(rc).be.an.instanceof(TypeError)
        should(rc.message).equal("Invalid String: `14.2`")
