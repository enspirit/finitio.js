should = require('should')
Funct = require('../../../src/finitio/contracts/function')

describe "Function's reference contract", ->

  isEven = (i)-> i%2==0

  world = { _: isEven: isEven }

  it 'resolves through the world at dressing time', ->
    f = Funct.reference.dress("_.isEven", world)

    # we test it like this, since the original function
    # is wrapped for undressing purpose
    should(f(2)).eql(true)
    should(f(3)).eql(false)

  it 'throw an error when not found', ->
    lambda = ()->
        Funct.reference.dress("_.hello.world", world)
    should(lambda).throw('_.hello.world is undefined')

  it 'throw an error when not a function', ->
    lambda = ()->
        Funct.reference.dress("_", world)
    should(lambda).throw('_ must resolve to a Function')

  it 'keeps the source it comes from, for undressing', ->
    f = Funct.reference.dress("_.isEven", world)
    s = Funct.reference.undress(f)
    should(s).eql("_.isEven")
