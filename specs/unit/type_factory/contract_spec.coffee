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
    c = new Contract('iso', intType, {dress: dresser, undress: undresser})
    should(factory.contract(c)).equal(c)

  it 'with one argument', ->
    c = factory.contract({
      name: 'iso',
      infoType: intType,
      external: { dress: dresser, undress: undresser },
      metadata: { description: 'Foo' }
    })
    should(c).be.an.instanceof(Contract)
    should(c.metadata).eql({ description: "Foo" })
