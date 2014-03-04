Parser = require '../../../lib/syntax/parser'
should = require 'should'

describe "Parser#builtin_type", ->

  subject = Parser.parse(".String", startRule: "type")

  it 'should return a BuiltinType', ->
    subject.jsType.should.equal(String)
