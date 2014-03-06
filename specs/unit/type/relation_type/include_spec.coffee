Attribute     = require '../../../../lib/support/attribute'
Heading       = require '../../../../lib/support/heading'
RelationType  = require '../../../../lib/type/relation_type'

should      = require 'should'

describe "RelationType#include", ->

  heading = new Heading([new Attribute('a', intType)])

  type = new RelationType(heading)

  subject = (arg) -> type.include(arg)

  describe 'when an empty set', ->
    subject({}).should.be.true

  describe 'when a valid, non empty set', ->
    arg = {a: 14}

    subject(arg).should.be.true

  describe 'when not a set', ->
    subject("foo").should.be.false

  describe 'when a set containing invalid tuples', ->
    arg = {a: "foo"}
    subject(arg).should.be.false
