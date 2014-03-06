Constraint = require '../../../lib/support/constraint'
should     = require 'should'

describe "Constraint#equals", ->

  fn1 = (i)-> i>0
  fn2 = (i)-> i>100
  c1 = new Constraint 'positive', fn1
  c2 = new Constraint 'othername', fn1
  c3 = new Constraint 'positive', fn2

  it 'applies structural equivalence', ->
    c1.equals(c2).should.be.true

  it 'distinguishes different functions', ->
    c1.equals(c3).should.be.false
