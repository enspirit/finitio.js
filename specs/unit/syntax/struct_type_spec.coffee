Parser      = require '../../../src/finitio/syntax/parser'
StructType  = require '../../../src/finitio/type/struct_type'
BuiltinType = require '../../../src/finitio/type/builtin_type'
should      = require 'should'
{numType,
stringType}  = require '../../spec_helpers'

describe "Parser#struct_type", ->

  subject = (input) ->
    Parser.parse(input, startRule: "type")

  describe '<.Number, .String>', ->
    input = '<.Number, .String>'

    it 'compiles to a StructType', ->
      compiled = subject(input)
      console.log(compiled.constructor)
      compiled.should.be.an.instanceof(StructType)
      compiled.componentTypes.should.be.an.instanceof(Array)
      compiled.componentTypes[0].jsType.should.equal Number
      compiled.componentTypes[1].jsType.should.equal String