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
