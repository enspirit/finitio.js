UnionType = require '../../../../src/finitio/type/union_type'
should    = require 'should'
{intType,
floatType}  = require '../../../spec_helpers'

describe "UnionType#include", ->

  type = new UnionType([intType, floatType])

  subject = (arg) -> type.include(arg)

  describe 'when not included', ->
    subject("12").should.be.false

  describe 'when included on int', ->
    subject(12).should.be.true

  describe 'when included on float', ->
    subject(12.0).should.be.true
