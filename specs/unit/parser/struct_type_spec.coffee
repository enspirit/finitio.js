Finitio     = require '../../../src/finitio'
Parser      = require '../../../src/finitio/parser'
StructType  = require '../../../src/finitio/type/struct_type'
BuiltinType = require '../../../src/finitio/type/builtin_type'
should      = require 'should'
{numType,
stringType}  = require '../../spec_helpers'

describe "Parser#struct_type", ->

  compile = (source, options) ->
    options.compiler = Finitio.compiler(options)
    Parser.parse(source, options)

  subject = (input) ->
    compile(input, startRule: "type")

  describe '<.Number, .String>', ->
    input = '<.Number, .String>'

    it 'compiles to a StructType', ->
      compiled = subject(input)
      compiled.should.be.an.instanceof(StructType)
      compiled.componentTypes.should.be.an.instanceof(Array)
      compiled.componentTypes[0].jsType.should.equal Number
      compiled.componentTypes[1].jsType.should.equal String