Parser  = require '../../../lib/syntax/parser'
AdType  = require '../../../lib/type/ad_type'
should  = require 'should'

describe "Parser#ad_type", ->

  describe 'when bound to a class with dresser/undresser', ->
    source = """
      .Date <as> .Number \\( n | Date(n) ) \\( d | d.getTime() )
    """
    subject = Parser.parse(source, startRule: "type")

    it 'should return a AdType', ->
      subject.should.be.an.instanceof(AdType)
      subject.jsType.should.equal(Date)

  describe 'when bound to a class with no dresser/undresser', ->
    source = """
      .Date <as> .Number
    """
    subject = Parser.parse(source, startRule: "type")

    it 'should return a AdType', ->
      subject.should.be.an.instanceof(AdType)
      subject.jsType.should.equal(Date)

  describe 'when not bound to a class and no dresser/undresser', ->
    source = """
      <as> .String
    """
    subject = Parser.parse(source, startRule: "type")

    it 'should return a AdType', ->
      subject.should.be.an.instanceof(AdType)
      (subject.jsType == null).should.be.true

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
