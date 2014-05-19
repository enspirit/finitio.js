Contract  = require '../../../src/finitio/support/contract'
should    = require 'should'
{intType} = require '../../spec_helpers'

describe "Contract.identity", ->

  subject = Contract.identity("foo", intType)

  it 'dresses correctly', ->
    should(subject.dress(4)).equal(4)

  it 'undresses correctly', ->
    should(subject.undress(4)).equal(4)
