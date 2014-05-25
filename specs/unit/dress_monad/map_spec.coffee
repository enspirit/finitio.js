Monad = require('../../../src/finitio/support/dress_monad')
should = require('should')

describe "DressMonad.map", ->

  success = (result)->
    Monad.success result

  it 'returns the mapped result on success', ->
    m = Monad.map [1, 2, 3], (x, i)->
      success [ x, i ]
    should(m.isSuccess()).eql(true)
    should(m.result).eql([[1,0],[2,1],[3,2]])

  it 'yields the failure block with causes on failure', ->
    callback = (x, i)->
      if x == 1 or x == 3
        Monad.failure x, "Failed on #{x} and #{i}"
      else
        success [x, i]
    onFailure = (causes)->
      Monad.failure 'foo', "Failed", causes
    m = Monad.map [1, 2, 3], callback, onFailure

    should(m.isSuccess()).eql(false)

    expected = {
      context: 'foo',
      error: "Failed",
      children: [
        { context: 1, error: "Failed on 1 and 0", location: 0 },
        { context: 3, error: "Failed on 3 and 2", location: 2 }
      ]
    }
    should(m.failure).eql(expected)

  