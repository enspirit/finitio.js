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
