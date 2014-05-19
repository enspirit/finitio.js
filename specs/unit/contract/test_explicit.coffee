Contract  = require '../../../src/finitio/support/contract'
should    = require 'should'
{intType} = require '../../spec_helpers'

describe "Contract.explicit", ->

  d = (v)->
    v*2
  u = (v)->
    v/2
  subject = Contract.explicit("foo", intType, d, u)

  it 'dresses correctly', ->
    should(subject.dress(4)).equal(8)

  it 'undresses correctly', ->
    should(subject.undress(4)).equal(2)
