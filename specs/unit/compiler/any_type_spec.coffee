Finitio = require '../../../src/finitio'
Parser  = require '../../../src/finitio/parser'
AnyType = require '../../../src/finitio/type/any_type'
should  = require 'should'

describe "Parser#any_type", ->

  compile = (source, options) ->
    options.compiler = Finitio.compiler(options)
    Parser.parse(source, options)

  subject = compile(".", startRule: "type")

  it 'should return an AnyType', ->
    subject.should.be.an.instanceof(AnyType)
