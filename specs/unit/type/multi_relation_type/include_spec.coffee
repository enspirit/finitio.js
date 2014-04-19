Attribute          = require '../../../../src/support/attribute'
Heading            = require '../../../../src/support/heading'
MultiRelationType  = require '../../../../src/type/relation_type'
{intType}          = require '../../../spec_helpers'
should             = require 'should'

describe "MultiRelationType#include", ->

  heading = new Heading([
    new Attribute('a', intType),
    new Attribute('b', intType, false)
  ])

  type = new MultiRelationType(heading)

  subject = (arg) -> type.include(arg)

  context 'when a empty set', ->
    arg = []

    it 'should be true', ->
      subject(arg).should.be.true

  context 'when a valid, non empty set', ->
    arg = []
    arg.push {a: 12, b: 15}
    arg.push {a: 15, b: 16}

    it 'should be true', ->
      subject(arg).should.be.true

  context 'when a valid, non empty set but missing optionals', ->

    arg = []
    arg.push {a: 12}
    arg.push {a: 15, b: 16}

    it 'should be true', ->
      subject(arg).should.be.true

  context 'when not a set', ->
    arg = "foo"

    it 'should be false', ->
      subject(arg).should.be.false

  context 'when a set containing invalid tuples', ->
    arg = []

    arg.push {a: 12.0}

    it 'should be false', ->
      subject(arg).should.be.false

  context 'when a set containing tuples with missing required', ->
    arg = []

    arg.push {b: 12}

    it 'should be false', ->
      subject(arg).should.be.false

  context 'when a set containing tuples with extra', ->
    arg = []

    arg.push {a: 12, b: 12, c: 15}

    it 'should be false', ->
      subject(arg).should.be.false

  context 'when a set containing tuples with invalid optional', ->
    arg = []

    arg.push {a: 12, b: 12.5}

    it 'should be false', ->
      subject(arg).should.be.false


