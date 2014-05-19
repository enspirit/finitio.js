StructType = require '../../../../src/finitio/type/struct_type'
_          = require 'underscore'
should     = require 'should'
{intType,
floatType} = require '../../../spec_helpers'

describe "StructType#defaultName", ->

  subject = new StructType([intType, floatType]).defaultName()

  it 'should be correct', ->
    subject.should.equal("<intType, floatType>")
