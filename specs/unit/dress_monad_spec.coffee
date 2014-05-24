Monad = require('../../src/finitio/support/dress_monad')
should = require('should')

describe "DressMonad", ->

  success = (result)->
    Monad.success result

  failure = (error)->
    Monad.failure {}, error

  it 'is initially successful on sucesss', ->
    should(success(12).isSuccess()).eql(true)

  it 'is not initially successful on failure', ->
    should(failure("error").isSuccess()).eql(false)

  describe 'onSuccess', ->
    it 'yields the block and returns its result on success', ->
      should(success(12).onSuccess ()-> 13).eql(13)

    it 'does not yield the block on failure', ->
      lambda = ->
        failure("error").onSuccess ()->
          throw new Error("foo")
      should(lambda).not.throw()

    it 'returns itself on failure', ->
      f = failure("error")
      should(f.onSuccess ()->).equal(f)

  describe 'onFailure', ->
    it 'yields the block and returns its result on failure', ->
      should(failure("13").onFailure ()-> 13).eql(13)

    it 'does not yield the block on success', ->
      lambda = ->
        success(12).onFailure ()->
          throw new Error("foo")
      should(lambda).not.throw()

    it 'returns itself on success', ->
      s = success(12)
      should(s.onFailure ()->).equal(s)
  