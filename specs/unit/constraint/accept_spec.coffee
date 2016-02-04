Constraint = require '../../../src/finitio/support/constraint'
should     = require 'should'

describe "Constraint#accept", ->

  describe 'with a function', ->
    constraint = new Constraint.Native 'positive', (i)-> i>0

    it 'accepts positive numbers', ->
      constraint.accept(12).should.equal(true)

    it 'rejects negative numbers', ->
      constraint.accept(-12).should.equal(false)

  describe 'with a regexp', ->
    constraint = new Constraint.Regexp 'word', /[a-z]+/

    it 'accepts words', ->
      constraint.accept("abgd").should.equal(true)

    it 'rejects numbers', ->
      constraint.accept("12").should.equal(false)

  describe 'with a closed range', ->
    constraint = new Constraint.Range 'within', { min: 1, max: 10, min_inclusive: true, max_inclusive: true }

    it 'accepts valid integers', ->
      should(constraint.accept(1)).equal(true)
      should(constraint.accept(5)).equal(true)
      should(constraint.accept(10)).equal(true)

    it 'rejects invalid integers', ->
      should(constraint.accept(-10)).equal(false)
      should(constraint.accept(0)).equal(false)
      should(constraint.accept(11)).equal(false)

  describe 'with an open range', ->
    constraint = new Constraint.Range 'within', { min: 1, max: 10, min_inclusive: false, max_inclusive: false }

    it 'accepts valid integers', ->
      should(constraint.accept(2)).equal(true)
      should(constraint.accept(5)).equal(true)
      should(constraint.accept(9)).equal(true)

    it 'rejects invalid integers', ->
      should(constraint.accept(-10)).equal(false)
      should(constraint.accept(1)).equal(false)
      should(constraint.accept(10)).equal(false)

  describe 'with an right-infinite range', ->
    constraint = new Constraint.Range 'within', { min: 1, min_inclusive: false }

    it 'accepts valid integers', ->
      should(constraint.accept(2)).equal(true)
      should(constraint.accept(5)).equal(true)
      should(constraint.accept(9)).equal(true)
      should(constraint.accept(100)).equal(true)
      should(constraint.accept(100000)).equal(true)

    it 'rejects invalid integers', ->
      should(constraint.accept(-10)).equal(false)
      should(constraint.accept(0)).equal(false)

  describe 'with a function', ->
    constraint = new Constraint.Function 'isEven', "isEven"
    world = { isEven: (s) -> s % 2 == 0 }

    it 'accepts even numbers', ->
      should(constraint.accept(2, world)).equal(true)
      should(constraint.accept(4, world)).equal(true)
      should(constraint.accept(10, world)).equal(true)

    it 'rejects odd numbers', ->
      should(constraint.accept(9, world)).equal(false)
      should(constraint.accept(1, world)).equal(false)

  describe 'with a dotted function', ->
    constraint = new Constraint.Function 'isEven', "_.isEven"
    world = { _: { isEven: (s) -> s % 2 == 0 } }

    it 'accepts even numbers', ->
      should(constraint.accept(2, world)).equal(true)
      should(constraint.accept(4, world)).equal(true)
      should(constraint.accept(10, world)).equal(true)

    it 'rejects odd numbers', ->
      should(constraint.accept(9, world)).equal(false)
      should(constraint.accept(1, world)).equal(false)

