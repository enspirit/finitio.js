SeqType     = require '../../../../src/finitio/type/seq_type'
{TypeError} = require '../../../../src/finitio/errors'
_           = require 'underscore'
should      = require 'should'
{byteType}  = require '../../../spec_helpers'

describe "SeqType#dress", ->

  type = new SeqType(byteType)

  subject = (arg) -> type.dress(arg)

  it 'with an empty array', ->
    res = subject([])
    should(res).eql([])

  it 'with a valid array', ->
    res = subject([12, 16])
    should(res).eql([12, 16])

  it 'with something else than array', ->
    lambda = -> subject("foo")

    should(lambda).throw()

    try
      lambda()
    catch e
      should(e).be.an.instanceof(TypeError)
      should(e.message).equal("Array expected, got: `foo`")

  it 'with an array with non bytes', ->
    lambda = -> subject([2, 4, -12])

    should(lambda).throw()

    try
      lambda()
    catch e
      should(e).be.an.instanceof(TypeError)
      should(e.message).equal("Invalid Sequence")
      should(e.rootCause.message).eql("Invalid value (not byte): `-12`")
