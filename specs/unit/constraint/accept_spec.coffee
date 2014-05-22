Constraint = require '../../../src/finitio/support/constraint'
should     = require 'should'

describe "Constraint#accept", ->

  describe 'with a function', ->
    constraint = new Constraint.Native 'positive', (i)-> i>0

    it 'accepts positive numbers', ->
      constraint.accept(12).should.be.true

    it 'rejects negative numbers', ->
      constraint.accept(-12).should.be.false

  describe 'with a regexp', ->
    constraint = new Constraint.Regexp 'word', /[a-z]+/

    it 'accepts words', ->
      constraint.accept("abgd").should.be.true

    it 'rejects numbers', ->
      constraint.accept("12").should.be.false

