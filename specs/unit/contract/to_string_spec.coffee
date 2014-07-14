AnyType   = require '../../../src/finitio/type/any_type'
Contract  = require '../../../src/finitio/support/contract'
should    = require 'should'

describe "Contract#toString", ->

  anyType = new AnyType()

  dresser  = (value, world)->

  contract = (kind, pair)->
    info = {
      name: 'iso',
      infoType: anyType
    }
    info[kind] = pair
    Contract.info(info)

  context 'with an explicit', ->
    cont = contract('explicit', { dress: dresser })

    it 'works', ->
      should(cont.toString()).equal('<iso> .')

  context 'with an external', ->
    cont = contract('external', { dress: dresser })

    it 'works', ->
      should(cont.toString()).equal('<iso> .')

  context 'with an internal', ->
    cont = contract('internal', { iso: dresser })

    it 'works', ->
      should(cont.toString()).equal('<iso> .')
