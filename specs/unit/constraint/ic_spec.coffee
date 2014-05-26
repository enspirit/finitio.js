Constraint = require '../../../src/finitio/support/constraint'
should     = require 'should'

describe "Constraint's information contract", ->

  describe 'with a function', ->
    fn = (i)-> i>0
    constraint = Constraint.info(name: 'positive', native: fn)

    it 'builds a native constraint', ->
      should(constraint).be.an.instanceof(Constraint.Native)
      should(constraint.name).equal('positive')

    it 'works as expected', ->
      should(constraint.accept(2)).equal(true)
      should(constraint.accept(-2)).equal(false)

    it 'toInfo as expected', ->
      expected = { name: 'positive', native: fn }
      should(constraint.toInfo()).eql(expected)

  describe 'with a regexp', ->
    rx = /[a-z]+/
    constraint = Constraint.info(name: 'word', regexp: rx)

    it 'builds a regexp constraint', ->
      should(constraint).be.an.instanceof(Constraint.Regexp)
      should(constraint.name).equal('word')

    it 'works as expected', ->
      should(constraint.accept("abgd")).equal(true)
      should(constraint.accept("12")).equal(false)

    it 'toInfo as expected', ->
      expected = { name: 'word', regexp: rx }
      should(constraint.toInfo()).eql(expected)

  describe 'when not named', ->
    fn = (i)-> i>0
    constraint = Constraint.info(native: fn)

    it 'builds a native constraint', ->
      should(constraint).be.an.instanceof(Constraint.Native)
      should(constraint.name).equal(undefined)

    it 'works as expected', ->
      should(constraint.accept(2)).equal(true)
      should(constraint.accept(-2)).equal(false)

    it 'toInfo as expected', ->
      expected = { native: fn }
      should(constraint.toInfo()).eql(expected)
