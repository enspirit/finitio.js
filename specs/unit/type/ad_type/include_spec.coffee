AdType         = require '../../../../src/type/ad_type'
should         = require 'should'

describe "AdType#include", ->

  type = new AdType(Date, {})

  describe 'when not included', ->
    type.include("12").should.be.false

  describe 'when included', ->
    type.include(new Date()).should.be.true
