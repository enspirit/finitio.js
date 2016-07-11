Constraint = require '../../../src/finitio/support/constraint'
should     = require 'should'

describe "Constraint#equals", ->

  describe "On a native constraint", ->
    fn1 = (i)-> i>0
    fn2 = (i)-> i>100
    c1 = new Constraint.Native 'positive', fn1
    c2 = new Constraint.Native 'othername', fn1
    c3 = new Constraint.Native 'positive', fn2

    it 'applies structural equivalence', ->
      c1.equals(c2).should.equal(true)

    it 'distinguishes different functions', ->
      c1.equals(c3).should.equal(false)

  describe "On a regexp constraint", ->
    r1 = /[a-z]+/
    r2 = /[a-z]+/
    c1 = new Constraint.Regexp 'word', r1
    c2 = new Constraint.Regexp 'sameword', r1
    c3 = new Constraint.Regexp 'other', r2

    it 'applies structural equivalence', ->
      c1.equals(c2).should.equal(true)

    it 'distinguishes different constraints', ->
      c1.equals(c3).should.equal(false)

  describe "On a range constraint", ->
    r1 = { min: 1, max: 10, min_inclusive: true, max_inclusive: true }
    r2 = { min: 1, max: 10, min_inclusive: true, max_inclusive: true }
    r3 = { min: 1, max: 10, min_inclusive: true, max_inclusive: false }
    r4 = { min: 1, min_inclusive: true }
    r5 = { min: 1, min_inclusive: true }
    r6 = { min: 1, min_inclusive: false }
    c1 = new Constraint.Range 'r1', r1
    c2 = new Constraint.Range 'r2', r2
    c3 = new Constraint.Range 'r3', r3
    c4 = new Constraint.Range 'r4', r4
    c5 = new Constraint.Range 'r5', r5
    c6 = new Constraint.Range 'r6', r6

    it 'recognizes same ranges', ->
      should(c1.equals(c2)).equal(true)
      should(c4.equals(c5)).equal(true)

    it 'distinguishes different ones', ->
      should(c1.equals(c3)).equal(false)
      should(c1.equals(c4)).equal(false)
      should(c4.equals(c6)).equal(false)

  describe "On a set constraint", ->
    r1 = [1, 2, 4]
    r2 = [1, 4, 2]
    r3 = [1, 2]
    r4 = [1, 2, 4, 5]
    c1 = new Constraint.Set 'r1', r1
    c2 = new Constraint.Set 'r2', r2
    c3 = new Constraint.Set 'r3', r3
    c4 = new Constraint.Set 'r4', r4

    it 'recognizes same sets', ->
      should(c1.equals(c2)).equal(true)

    it 'distinguishes different ones', ->
      should(c1.equals(c3)).equal(false)
      should(c1.equals(c4)).equal(false)
      should(c3.equals(c1)).equal(false)
      should(c4.equals(c1)).equal(false)
