Attribute   = require '../../../../lib/support/attribute'
Heading     = require '../../../../lib/support/heading'
TupleType   = require '../../../../lib/type/tuple_type'

should      = require 'should'

describe "TupleType#include", ->

  heading = new Heading([new Attribute('a', intType)])

  type = new TupleType(heading)

  subject = (arg) -> type.include(arg)

  describe 'when a valid hash', ->
    subject(a: 12).should.be.true

  describe 'when an invalid hash (too many attributes)', ->
    subject(a: 12, b: 15).should.be.false

  describe 'when an invalid hash (too few attributes)', ->
    subject(b: 12).should.be.false

  describe 'when an invalid hash (wrong type)', ->
    subject(a: "12").should.be.false
