SetType     = require '../../../../src/finitio/type/set_type'
{TypeError} = require '../../../../src/finitio/errors'
_           = require 'underscore'
should      = require 'should'
{byteType}  = require '../../../spec_helpers'

describe "SetType#dress", ->

  type = new SetType(byteType)

  it 'with an empty array', ->
    res = type.dress([])
    should(res).eql([])

  it 'with a valid array', ->
    res = type.dress([12, 16])
    should(res).eql([12, 16])

  it 'with something else than array', ->
    lambda = -> type.dress("foo")

    should(lambda).throw()

    try
      lambda()
    catch e
      should(e).be.an.instanceof(TypeError)
      should(e.message).equal("Array expected, got: `foo`")

  describe 'with an array with non bytes', ->
    subject =
      try
        type.dress([2, 4, -12])
      catch e
        e

    it 'should raise an error', ->
      should(subject).be.an.instanceof(TypeError)

    it 'has the expected root cause', ->
      rc = subject.getRootCause()
      should(rc.message).eql("Constraint `byte` violated")

  describe 'with an array with duplicates', ->
    subject =
      try
        type.dress([2, 4, 2])
      catch e
        e

    it 'raises an error', ->
      should(subject).be.an.instanceof(TypeError)
      should(subject.message).equal("Invalid Set")

    it 'should raise an error', ->
      rc = subject.getRootCause()
      should(rc).be.an.instanceof(TypeError)
      should(rc.message).equal("Duplicate value: `2`")
