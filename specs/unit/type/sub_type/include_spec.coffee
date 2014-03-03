SubType = require '../../../../lib/type/sub_type'
should  = require 'should'

describe "SubType#include", ->

  type = new SubType(intType, {
      default: (i) -> i>0
      small: (i) -> i<255
    }, "byte")

  subject = (arg) -> type.include(arg)

  describe 'when included on int', ->
    subject(12).should.be.true

  describe 'when not included on int (I)', ->
    subject(-12).should.be.false

  describe 'when not included on int (II)', ->
    subject(255).should.be.false

  describe 'when not included', ->
    subject("12").should.be.false