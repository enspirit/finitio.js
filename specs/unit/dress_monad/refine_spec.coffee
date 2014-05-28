Monad = require('../../../src/finitio/support/dress_monad')
should = require('should')

describe "Dressmonad.refine", ->

  monad = new Monad()

  success = (result)->
    monad.success result

  failure = (error)->
    monad.failure this, error

  it 'returns the refined result on success', ->
    result = []
    base   = success(result)
    m = monad.refine base, [1, 2, 3], (_, x, i)->
      should(_).equal(base)
      result.push [ x, i ]
      _
    should(m.isSuccess()).eql(true)
    should(m.result).eql([[1,0],[2,1],[3,2]])

  it 'does not refine on failure', ->
    base = failure("error")
    callback = ()->
      throw new Error("Not here")
    onFailure = (causes)=>
      should(causes[0].error).eql("error")
      13
    res = monad.refine base, [1, 2, 3], callback, onFailure
    should(res).equal(13)

  it 'yields the failure block with causes on failure', ->
    callback = (_, x, i)->
      if x == 1 or x == 3
        monad.failure x, "Failed on #{x} and #{i}"
      else
        _
    onFailure = (causes)->
      monad.failure 'foo', "Failed", causes
    m = monad.refine success([]), [1, 2, 3], callback, onFailure

    should(m.isSuccess()).eql(false)

    expected = {
      error: "Failed",
      children: [
        { error: "Failed on 1 and 0", location: 0 },
        { error: "Failed on 3 and 2", location: 2 }
      ]
    }
    should(m.error).eql(expected)

  it 'stop on first failure when failfast is used', ->
    monad = new Monad(failfast: true)

    callback = (_, x, i)->
      if x == 1 or x == 3
        monad.failure x, "Failed on #{x} and #{i}"
      else
        _
    onFailure = (causes)->
      monad.failure 'foo', "Failed", causes
    m = monad.refine success([]), [1, 2, 3], callback, onFailure

    should(m.isSuccess()).eql(false)

    expected = {
      error: "Failed",
      children: [
        { error: "Failed on 1 and 0", location: 0 }
      ]
    }
    should(m.error).eql(expected)

