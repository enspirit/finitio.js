Contract  = require '../../../src/finitio/support/contract'
should    = require 'should'
{intType} = require '../../spec_helpers'

describe "Contract.internal", ->

  class C

    constructor: (@internal)->

    @iso: (x)->
      new C(x*2)

    toIso: ()->
      @internal/2

  subject = Contract.internal("iso", intType, C)

  it 'dresses correctly', ->
    should(subject.dress(4)).be.an.instanceof(C)
    should(subject.dress(4).internal).equal(8)

  it 'undresses correctly', ->
    should(subject.undress(new C(4))).equal(2)
