Finitio     = require '../../../src/finitio'
Parser      = require '../../../src/finitio/parser'
UnionType   = require '../../../src/finitio/type/union_type'
BuiltinType = require '../../../src/finitio/type/builtin_type'
should      = require 'should'

describe "Parser#union_type", ->

  compile = (source, options) ->
    options.compiler = Finitio.compiler(options)
    Parser.parse(source, options)

  subject = compile(".String|.Number|.Boolean", startRule: "type")

  it 'should return a SetType', ->
    subject.should.be.an.instanceof(UnionType)
