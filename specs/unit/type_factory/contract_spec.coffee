Contract    = require '../../../src/finitio/support/contract'
TypeFactory = require '../../../src/finitio/support/factory'
should      = require 'should'
{intType}   = require '../../spec_helpers'

describe 'TypeFactory#contract', ->

  factory = new TypeFactory

  dresser = (arg)->
  undresser = (arg)->

  class Internal
    @iso: (v)->
    
    toIso: ()->

  class External
    @dress: (v)->
    @undress: (v)->

  it 'with a Contract', ->
    c = new Contract('iso', intType, dresser, undresser)
    should(factory.contract(c)).equal(c)

  it 'with four arguments', ->
    c = factory.contract('iso', intType, dresser, undresser)
    should(c).be.an.instanceof(Contract)

  it 'with three arguments and an internal contract', ->
    c = factory.contract('iso', intType, Internal)
    should(c).be.an.instanceof(Contract)

  it 'with three arguments and an external contract', ->
    c = factory.contract('iso', intType, External)
    should(c).be.an.instanceof(Contract)

  it 'with two arguments', ->
    c = factory.contract('iso', intType)
    should(c).be.an.instanceof(Contract)

