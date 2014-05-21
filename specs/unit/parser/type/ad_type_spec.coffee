Finitio = require '../../../../src/finitio'
Parser = require '../../../../src/finitio/parser'
TypeFactory = require '../../../../src/finitio/support/factory'
AdType  = require '../../../../src/finitio/type/ad_type'
should  = require 'should'

describe "Parser#ad_type", ->

  compile = (source, options) ->
    options.compiler = Finitio.compiler(options)
    Parser.parse(source, options)

  describe 'when bound to a class with dresser/undresser', ->
    source = """
      .Date <as> .String \\( s | new Date(s) ) \\( d | d.toISOString() )
    """
    subject = ()->
      compile(source, startRule: "type")

    it 'should return a AdType', ->
      should(subject()).be.an.instanceof(AdType)
      should(subject().jsType).equal(Date)

    it 'dresses as expected', ->
      should(subject().dress("2014-03-01")).be.an.instanceof(Date)

  describe 'when bound to a class with an external contract', ->
    source = """
      .Date <as> .String .Fin.Contracts.Date.iso8601
    """
    subject = ()->
      compile(source, startRule: "type", world: {
        Fin: Finitio
      })

    it 'should return a AdType', ->
      should(subject()).be.an.instanceof(AdType)
      should(subject().jsType).equal(Date)

    it 'dresses as expected', ->
      should(subject().dress("2014-03-01")).be.an.instanceof(Date)

  describe 'when not bound to a class and no dresser/undresser', ->
    source = """
      <as> .String
    """
    subject = ()->
      compile(source, startRule: "type")

    it 'should return a AdType', ->
      should(subject()).be.an.instanceof(AdType)
      should(subject().jsType).equal(null)

    it 'dresses through identity', ->
      should(subject().dress("12")).equal("12")

  describe 'when bound to a type with an internal contract', ->

    abstraction = (internal)->
      @internal = internal
    abstraction.as = (s)->
      new abstraction("Seen #{s}")
    abstraction.prototype.toAs = (a)->
      @internal.slice(5)

    source = """
      .JsAbstraction <as> .String
    """

    subject = ()->
      compile(source, startRule: "type", world: {
        "JsAbstraction": abstraction
      })

    it 'returns a AdType', ->
      should(subject()).be.an.instanceof(AdType)
      should(subject().jsType).equal(abstraction)

    it 'dresses as expected', ->
      should(subject().dress("Hello")).be.an.instanceof(abstraction)
      should(subject().dress("Hello").internal).equal("Seen Hello")

    it 'undresses as expected', ->
      s = subject()
      back = s.undress(s.dress("Hello"), s.contracts[0].infoType)
      should(back).equal("Hello")

  describe 'when using an external contract', ->
    source = """
      <as> .String .MyDresser
    """
    myFactory = new TypeFactory(MyDresser: {
      dress:   (info)-> parseInt(info),
      undress: (adt)-> info.toString()
    })
    subject = ()->
      compile(source, startRule: "type", factory: myFactory)

    it 'should return a AdType', ->
      should(subject()).be.an.instanceof(AdType)

    it 'has the correct dresser and undresser', ->
      should(subject().dress("12")).equal(12)

  describe 'when using a qualified external contract', ->
    source = """
      <as> .String .X.MyDresser
    """
    myFactory = new TypeFactory(X: {MyDresser: {
      dress:   (info)-> parseInt(info),
      undress: (adt)-> info.toString()
    }})
    subject = ()->
      compile(source, startRule: "type", factory: myFactory)

    it 'should return a AdType', ->
      should(subject()).be.an.instanceof(AdType)

    it 'has the correct dresser and undresser', ->
      should(subject().dress("12")).equal(12)
