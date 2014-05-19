AdType = require '../../../../src/type/ad_type'
should = require 'should'

describe "AdType#name", ->

  describe 'when provided', ->
    type = new AdType(Date, {}, "Foo")

    type.name.should.equal "Foo"

  describe 'when not provided', ->
    type = new AdType(Date, {})

    type.name.should.equal "Date"
