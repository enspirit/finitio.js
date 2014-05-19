Finitio     = require '../../../src/finitio'
Parser      = require '../../../src/finitio/parser'
BuiltinType = require '../../../src/finitio/type/builtin_type'
Attribute   = require '../../../src/finitio/support/attribute'
should      = require 'should'

describe "Parser#attribute", ->

  compile = (source, options) ->
    options.compiler = Finitio.compiler(options)
    Parser.parse(source, options)

  describe "Compilation result", ->

    describe "a: .String", ->

      compiled = compile("a: .String", startRule: "attribute")

      it 'compiles to a mandatory Attribute', ->
        compiled.should.be.an.instanceof(Attribute)
        compiled.name.should.equal('a')
        compiled.type.should.be.an.instanceof(BuiltinType)
        compiled.type.jsType.should.eql(String)
        compiled.required.should.be.true

    describe "a :? .String", ->

      compiled = compile("a :? .String", startRule: "attribute")

      it 'compiles to an optional Attribute', ->
        compiled.should.be.an.instanceof(Attribute)
        compiled.name.should.equal('a')
        compiled.type.should.be.an.instanceof(BuiltinType)
        compiled.type.jsType.should.eql(String)
        compiled.required.should.be.false
