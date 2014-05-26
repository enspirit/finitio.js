{Meta, should, intType} = require('../../helpers')

describe 'Meta (Constraint)', ->

  dress = (arg)->
    Meta.Constraint.dress(arg)

  it 'supports a function', ->
    should(()-> dress({ name: "foo", native: ()-> })).not.throw()

  it 'supports a regexp', ->
    should(()-> dress({ name: "foo", regexp: /[a-z]+/ })).not.throw()

  it 'accepts not passing a name', ->
    should(()-> dress({ native: ()-> })).not.throw()

  it 'supports a regexp string', ->
    should(()-> dress({ name: "foo", regexp: "[a-z]+" })).not.throw()

  it 'supports a fn defn', ->
    should(()-> dress({ name: "foo", native: ['i', 'i>0'] })).not.throw()
