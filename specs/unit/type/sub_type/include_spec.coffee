Constraint = require '../../../../src/finitio/support/constraint'
SubType    = require '../../../../src/finitio/type/sub_type'
should     = require 'should'
{intType}  = require '../../../spec_helpers'

describe "SubType#include", ->

  type = new SubType(intType, [
      new Constraint.Native('default', (i) -> i>0),
      new Constraint.Native('small', (i) -> i<255)
    ], "byte")

  subject = (arg) -> type.include(arg)

  it 'when included on int', ->
    subject(12).should.equal(true)

  it 'when not included on int (I)', ->
    subject(-12).should.equal(false)

  it 'when not included on int (II)', ->
    subject(255).should.equal(false)

  it 'when not included', ->
    subject("12").should.equal(false)
