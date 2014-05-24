Monad = require('../../../src/finitio/support/dress_monad')
should = require('should')

describe "DressMonad.refine", ->

  success = (result)->
    Monad.success result

  failure = (error)->
    Monad.failure this, error

  it 'returns the refined result on success', ->
    result = []
    base   = success(result)
    m = Monad.refine base, [1, 2, 3], (_, x, i)->
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
    res = Monad.refine base, [1, 2, 3], callback, onFailure
    should(res).equal(13)

  it 'yields the failure block with causes on failure', ->
    callback = (_, x, i)->
      if x == 1 or x == 3
        Monad.failure x, "Failed on #{x} and #{i}"
      else
        _
    onFailure = (causes)->
      Monad.failure 'foo', "Failed", causes
    m = Monad.refine success([]), [1, 2, 3], callback, onFailure

    should(m.isSuccess()).eql(false)

    expected = {
      context: 'foo',
      error: "Failed",
      causes: [
        { context: 1, error: "Failed on 1 and 0" },
        { context: 3, error: "Failed on 3 and 2" }
      ]
    }
    should(m.failure).eql(expected)

