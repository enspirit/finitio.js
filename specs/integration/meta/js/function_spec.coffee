{Meta, should} = require('../../helpers')

describe 'Meta (Js.Function)', ->

  it 'is based on a valid hypothesis', ->
    fn = new Function("i", "return i>0")
    should(fn).be.an.instanceof(Function)
    should(fn(0)).equal(false)
    should(fn(1)).equal(true)

  it 'dresses a pair as expected', ->
    fn = Meta.Js.Function.dress(["i", "return i>0"])
    should(fn).be.an.instanceof(Function)

  it 'undresses functions as expected', ->
    fn = Meta.Js.Function.dress(["i", "return i>0"])
    rx = Meta.Js.Function.undress(fn, Meta.Js.FunctionDefn)
    should(rx).eql(["i", "return i>0"])

  it "adds the 'return' if missing", ->
    fn = Meta.Js.Function.dress(["i", "i>0"])
    should(fn(0)).equal(false)
    should(fn(1)).equal(true)

  it "is able to resolve a function reference on the world", ->
    fn = new Function("i", "return i>0")
    world = { _: { fn: fn } }
    dressed = Meta.Js.Function.dress("_.fn", world)
    should(fn(0)).equal(false)
    should(fn(1)).equal(true)
