Parser      = require '../../../src/syntax/parser'
BuiltinType = require '../../../src/type/builtin_type'
Attribute   = require '../../../src/support/attribute'
should      = require 'should'

describe "Parser#attribute", ->

  factor = (input) ->
    Parser.parse(input, startRule: "attribute")

  describe "Compilation result", ->

    describe "a: .String", ->

      compiled = factor("a: .String")

      it 'compiles to a mandatory Attribute', ->
        compiled.should.be.an.instanceof(Attribute)
        compiled.name.should.equal('a')
        compiled.type.should.be.an.instanceof(BuiltinType)
        compiled.type.jsType.should.eql(String)
        compiled.required.should.be.true

    describe "a :? .String", ->

      compiled = factor("a :? .String")

      it 'compiles to an optional Attribute', ->
        compiled.should.be.an.instanceof(Attribute)
        compiled.name.should.equal('a')
        compiled.type.should.be.an.instanceof(BuiltinType)
        compiled.type.jsType.should.eql(String)
        compiled.required.should.be.false
