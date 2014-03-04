SeqType         = require '../../../../lib/type/seq_type'
{ArgumentError,
TypeError}      = require '../../../../lib/errors'
_               = require 'underscore'
should          = require 'should'

describe "SeqType#include", ->

  type = new SeqType(intType)

  subject = (arg) -> type.include(arg)

  describe 'when included on empty array', ->
    subject([]).should.be.true

  describe 'when included on non empty array', ->
    subject([12]).should.be.true

  describe 'when not an array', ->
    subject({}).should.be.false

  describe 'when an array with non ints', ->
    subject([12, "foo"]).should.be.false