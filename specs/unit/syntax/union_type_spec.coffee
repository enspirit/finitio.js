Parser      = require '../../../src/finitio/syntax/parser'
UnionType   = require '../../../src/finitio/type/union_type'
BuiltinType = require '../../../src/finitio/type/builtin_type'
should      = require 'should'

describe "Parser#union_type", ->

  subject = Parser.parse(".String|.Number|.Boolean", startRule: "type")

  it 'should return a SetType', ->
    subject.should.be.an.instanceof(UnionType)
