Parser      = require '../../../lib/syntax/parser'
BuiltinType = require '../../../lib/type/builtin_type'
Heading     = require '../../../lib/support/heading'
Attribute   = require '../../../lib/support/attribute'
should      = require 'should'

describe "Parser#heading", ->

  subject = Parser.parse("foo: .String, bar: .Number", startRule: "heading")

  it 'should return a Heading', ->
    subject.should.be.an.instanceof(Heading)
    subject.size().should.equal(2)
