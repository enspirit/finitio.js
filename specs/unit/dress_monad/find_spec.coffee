Monad = require('../../../src/finitio/support/dress_monad')
should = require('should')

describe "Dressmonad.find", ->

  monad = new Monad()

  success = (result)->
    monad.success result

  failure = (error)->
    monad.failure this, error

  it 'finds the first successful monad', ->
    m = monad.find [1, 2, 3], (x, i)->
      if x == 2 and i == 1
        success(12)
      else
        failure("Not 2 and 1")
    should(m.isSuccess()).eql(true)
    should(m.result).eql(12)

  it 'yields the failure block with all causes if no success', ->
    callback = (x, i)->
      monad.failure x, "Failed on #{x} and #{i}"
    onFailure = (causes)->
      monad.failure "foo", "Failed", causes
    m = monad.find [1, 2, 3], callback, onFailure

    should(m.isSuccess()).eql(false)

    expected = {
      error: "Failed",
      children: [
        { error: "Failed on 1 and 0", location: 0 },
        { error: "Failed on 2 and 1", location: 1 }
        { error: "Failed on 3 and 2", location: 2 }
      ]
    }
    should(m.error).eql(expected)

