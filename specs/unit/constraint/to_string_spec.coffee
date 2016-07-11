Constraint = require '../../../src/finitio/support/constraint'
should     = require 'should'

describe "Constraint#toString", ->

  describe 'with a function', ->
    constraint = new Constraint.Native 'positive', (i)-> i>0

    it 'works', ->
      should(constraint.toString()).equal('positive: ...')

  describe 'with a regexp', ->
    constraint = new Constraint.Regexp 'word', /[a-z]+/

    it 'works', ->
      should(constraint.toString()).equal('word: /[a-z]+/')

  describe 'with a range', ->

    it 'works with a closed range', ->
      constraint = new Constraint.Range 'closed', { min: 1, max: 10, min_inclusive: true, max_inclusive: true }
      should(constraint.toString()).equal('closed: 1..10')

    it 'works with a open range', ->
      constraint = new Constraint.Range 'open', { min: 1, max: 10, min_inclusive: true, max_inclusive: false }
      should(constraint.toString()).equal('open: 1...10')

    it 'works with an infinite range', ->
      constraint = new Constraint.Range 'open', { min: 1, min_inclusive: true }
      should(constraint.toString()).equal('open: 1..')

  describe 'with a set function', ->
    constraint = new Constraint.Set 'among', [1, 2, 3]

    it 'works', ->
      should(constraint.toString()).equal('among: { 1 2 3 }')
