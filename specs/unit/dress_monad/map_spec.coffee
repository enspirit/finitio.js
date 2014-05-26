Monad = require('../../../src/finitio/support/dress_monad')
should = require('should')

describe "Dressmonad.map", ->

  monad = new Monad()

  success = (result)->
    monad.success result

  it 'returns the mapped result on success', ->
    m = monad.map [1, 2, 3], (x, i)->
      success [ x, i ]
    should(m.isSuccess()).eql(true)
    should(m.result).eql([[1,0],[2,1],[3,2]])

  it 'yields the failure block with causes on failure', ->
    callback = (x, i)->
      if x == 1 or x == 3
        monad.failure x, "Failed on #{x} and #{i}"
      else
        success [x, i]
    onFailure = (causes)->
      monad.failure 'foo', "Failed", causes
    m = monad.map [1, 2, 3], callback, onFailure

    should(m.isSuccess()).eql(false)

    expected = {
      error: "Failed",
      children: [
        { error: "Failed on 1 and 0", location: 0 },
        { error: "Failed on 3 and 2", location: 2 }
      ]
    }
    should(m.error).eql(expected)

  