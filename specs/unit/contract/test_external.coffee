Contract  = require '../../../src/finitio/support/contract'
should    = require 'should'
{intType} = require '../../spec_helpers'

describe "Contract.external", ->

  C = {
    dress: (x)->
      x*2
    undress: (x)->
      x/2
  }

  subject = Contract.external("foo", intType, C)

  it 'dresses correctly', ->
    should(subject.dress(4)).equal(8)

  it 'undresses correctly', ->
    should(subject.undress(4)).equal(2)
