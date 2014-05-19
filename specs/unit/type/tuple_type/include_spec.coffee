Attribute        = require '../../../../src/finitio/support/attribute'
Heading          = require '../../../../src/finitio/support/heading'
TupleType        = require '../../../../src/finitio/type/tuple_type'
{intType}        = require '../../../spec_helpers'
should           = require 'should'

describe "TupleType#include", ->

  a       = new Attribute('a', intType)
  maybe_b = new Attribute('b', intType, false)

  context 'without extra allowed', ->

    heading = new Heading([a, maybe_b])
    type    = new TupleType(heading)

    subject = (arg) -> type.include(arg)

    context 'when a valid hash and both attributes', ->
      arg = {a: 12, b: 14}

      it 'should be true', ->
        subject(arg).should.be.true

    context 'when a valid hash but no optional attribute', ->
      arg = {a: 12}

      it 'should be true', ->
        subject(arg).should.be.true

    context 'when an invalid hash (too many attributes)', ->
      arg = {a: 12, c: 15}

      it 'should be false', ->
        subject(arg).should.be.false

    context 'when an invalid hash (too few attributes)', ->
      arg = {b: 12}

      it 'should be false', ->
        subject(arg).should.be.false

    context 'when an invalid hash (wrong type)', ->
      arg = {a: 12, b: '15'}

      it 'should be false', ->
        subject(arg).should.be.false

    context 'when an invalid hash (wrong type II)', ->
      arg = {a: false, b: 15}

      it 'should be false', ->
        subject(arg).should.be.false

  context 'with extra allowed', ->

    heading = new Heading([a, maybe_b], allowExtra: true)
    type    = new TupleType(heading)

    subject = (arg) -> type.include(arg)

    context 'when valid hash, yet with extra attributes', ->
      arg = {a: 12, c: 15}

      it 'should be true', ->
        subject(arg).should.be.true

