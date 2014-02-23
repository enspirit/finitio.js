TypeFactory = require '../../../../lib/type/factory'
should      = require 'should'

describe 'TypeFactory#builtin', ->

  factory = null

  beforeEach -> 
    factory = new TypeFactory

  describe 'when used with a JS class', ->
    subject = factory.type(Number)

    subject.should.be.an.instanceof Number

  describe 'when used with a JS class and a name', ->
    subject = factory.type(Number, 'Num')

    subject.should.be.an.instanceof Number

    it 'should have the correct name', ->
      subject.name.should.equal("Num")

