Attribute     = require '../../../../lib/support/attribute'
Heading       = require '../../../../lib/support/heading'
RelationType  = require '../../../../lib/type/relation_type'

should      = require 'should'

describe "RelationType#include", ->

  heading = new Heading([new Attribute('a', intType)])

  type = new RelationType(heading)

  subject = (arg) -> type.include(arg)

  describe 'when a valid relation', ->
    subject([{a: 12}, {a: 17}]).should.be.true

  describe 'when an empty relation', ->
    subject([]).should.be.true

  describe 'when a relation containing invalid tuples', ->
    subject([{a: 12}, {a: 'foo'}]).should.be.false

  describe 'when not an relation at all', ->
    subject({}).should.be.false
    subject("foo").should.be.false
    subject(null).should.be.false
    type.include().should.be.false