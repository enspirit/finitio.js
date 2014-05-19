Parser  = require '../../../src/finitio/syntax/parser'
AdType  = require '../../../src/finitio/type/ad_type'
should  = require 'should'

describe "Parser#ad_type", ->

  describe 'when bound to a class with dresser/undresser', ->
    source = """
      .Date <as> .String \\( s | new Date(s) ) \\( d | d.toISOString() )
    """
    subject = Parser.parse(source, startRule: "type")

    it 'should return a AdType', ->
      subject.should.be.an.instanceof(AdType)
      subject.jsType.should.equal(Date)

    it 'dresses as expected', ->
      subject.dress("2014-03-01").should.be.an.instanceof(Date)

  describe 'when not bound to a class and no dresser/undresser', ->
    source = """
      <as> .String
    """
    subject = Parser.parse(source, startRule: "type")

    it 'should return a AdType', ->
      subject.should.be.an.instanceof(AdType)
      (subject.jsType == null).should.be.true

    it 'dresses through identity', ->
      subject.dress("12").should.equal("12")

  describe 'when bound to a type with an internal contract', ->

    abstraction = (internal)->
      @internal = internal
    abstraction.as = (s)->
      new abstraction("Seen #{s}")
    abstraction.prototype.toAs = (a)->
      @internal.slice(5);

    source = """
      .JsAbstraction <as> .String
    """

    subject = Parser.parse(source, startRule: "type", world: {
      "JsAbstraction": abstraction
    })

    it 'returns a AdType', ->
      subject.should.be.an.instanceof(AdType)
      (subject.jsType == abstraction).should.be.true

    it 'dresses as expected', ->
      subject.dress("Hello").should.be.an.instanceof(abstraction)
      subject.dress("Hello").internal.should.equal("Seen Hello")

    it 'undresses as expected', ->
      dressed = subject.dress("Hello")
      subject.contracts.as[2](dressed).should.equal("Hello");

  describe 'when using an external contract', ->
    source = """
      <as> .String .MyDresser
    """
    myFactory = new TypeFactory('MyDresser': {
      dress:   (info)-> parseInt(info),
      undress: (adt)-> info.toString()
    })
    subject = Parser.parse(source, startRule: "type", factory: myFactory)

    it 'should return a AdType', ->
      subject.should.be.an.instanceof(AdType)

    it 'has the correct dresser and undresser', ->
      subject.dress("12").should.equal(12)

  describe 'when using a qualified external contract', ->
    source = """
      <as> .String .X.MyDresser
    """
    myFactory = new TypeFactory(X: {MyDresser: {
      dress:   (info)-> parseInt(info),
      undress: (adt)-> info.toString()
    }})
    subject = Parser.parse(source, startRule: "type", factory: myFactory)

    it 'should return a AdType', ->
      subject.should.be.an.instanceof(AdType)

    it 'has the correct dresser and undresser', ->
      subject.dress("12").should.equal(12)
