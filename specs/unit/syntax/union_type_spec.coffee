Parser      = require '../../../lib/syntax/parser'
UnionType   = require '../../../lib/type/union_type'
BuiltinType = require '../../../lib/type/builtin_type'
should      = require 'should'

describe "Parser#union_type", ->

  subject = Parser.parse(".String|.Number|.Boolean", startRule: "type")

  it 'should return a SetType', ->
    subject.should.be.an.instanceof(UnionType)
