SetType         = require '../../../../src/type/set_type'
{ArgumentError,
TypeError}      = require '../../../../src/errors'
_               = require 'underscore'
should          = require 'should'
{intType}       = require '../../../spec_helpers'

describe "SetType#include", ->

  type = new SetType(intType)

  subject = (arg) -> type.include(arg)

  describe 'when included on empty array', ->
    subject([]).should.be.true

  describe 'when included on non empty array', ->
    subject([12]).should.be.true

  describe 'when not an array', ->
    subject({}).should.be.false

  describe 'when an array with non ints', ->
    subject([12, "foo"]).should.be.false

  describe 'when an array with duplicates', ->
    subject([12, 12]).should.be.false
