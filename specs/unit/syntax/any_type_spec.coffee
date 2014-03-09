Parser      = require '../../../src/syntax/parser'
AnyType     = require '../../../src/type/any_type'
should      = require 'should'

describe "Parser#any_type", ->

  subject = Parser.parse(".", startRule: "type")

  it 'should return an AnyType', ->
    subject.should.be.an.instanceof(AnyType)
