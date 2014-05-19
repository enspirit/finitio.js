AdType = require '../../../../src/finitio/type/ad_type'
should = require 'should'

describe "AdType#name", ->

  it 'when provided', ->
    type = new AdType(Date, [], "Foo")

    type.name.should.equal "Foo"

  it 'when not provided', ->
    type = new AdType(Date, [])

    type.name.should.equal "Date"
