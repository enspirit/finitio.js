Parser      = require '../../../lib/syntax/parser'
BuiltinType = require '../../../lib/type/builtin_type'
SubType     = require '../../../lib/type/sub_type'
should      = require 'should'

describe "Parser#sub_type", ->

  subject = Parser.parse(".Number( i | i >= 0 )", startRule: "type")

  it 'should return a SubType', ->
    subject.should.be.an.instanceof(SubType)

  it 'should have the constraint', ->
    subject.dress(12).should.equal(12)
    try
      subject.dress(-1)
      false.should.be.true
    catch e
      e
