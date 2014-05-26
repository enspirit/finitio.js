{Meta, should} = require('../../helpers')

describe 'Meta (Js.RegExp)', ->

  it 'dresses regexp', ->
    src = /[a-z]+/
    rx = Meta.Js.RegExp.dress(src)
    should(rx).equal(src)

  it 'dresses strings', ->
    rx = Meta.Js.RegExp.dress("[a-z]+")
    should(rx).eql(/[a-z]+/)

  it 'undresses regexps as expected', ->
    rx = Meta.Js.RegExp.undress(/[a-z]+/, Meta.Js.String)
    should(rx).eql("[a-z]+")
