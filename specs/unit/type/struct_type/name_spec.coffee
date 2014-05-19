StructType = require '../../../../src/finitio/type/struct_type'
_          = require 'underscore'
should     = require 'should'
{intType,
floatType} = require '../../../spec_helpers'

describe "StructType#name", ->

  type    = null
  subject = ->
    type.name

  it 'when not provided', ->
    type = new StructType([intType])

    subject().should.equal("<intType>")

  it 'when provided', ->
    type = new StructType([intType], "myStruct")

    subject().should.equal("myStruct")
