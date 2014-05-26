Contract  = require '../../../src/finitio/support/contract'
should    = require 'should'
{intType} = require '../../spec_helpers'

describe "Contract#dress", ->

  world = {
    double: (x)-> x*2
  }
  dresser  = (value, world)->
    world.double(value)

  contract = (kind, pair)->
    info = {
      name: 'iso',
      infoType: intType
    }
    info[kind] = pair
    Contract.info(info)

  context 'when used with a world', ->

    context 'with an explicit', ->
      subject = contract('explicit', { dress: dresser })

      it 'dresses as expected', ->
        got = subject.dress(12, world)
        should(got).eql(24)

    context 'with an external', ->
      subject = contract('external', { dress: dresser })

      it 'dresses as expected', ->
        got = subject.dress(12, world)
        should(got).eql(24)

    context 'with an internal', ->
      subject = contract('internal', { iso: dresser })

      it 'dresses as expected', ->
        got = subject.dress(12, world)
        should(got).eql(24)

