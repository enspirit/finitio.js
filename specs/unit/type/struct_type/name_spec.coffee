StructType = require '../../../../src/type/struct_type'
_          = require 'underscore'
should     = require 'should'
{intType,
floatType} = require '../../../spec_helpers'

describe "StructType#name", ->

  type    = null
  subject = ->
    type.name

  context 'when not provided', ->
    type = new StructType([intType])

    subject().should.equal("<intType>")

  context 'when provided', ->
    type = new StructType([intType], "myStruct")

    subject().should.equal("myStruct")
