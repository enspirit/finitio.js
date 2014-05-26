{Meta, Finitio, should} = require('../../helpers')

describe 'Meta (Js.Type)', ->

  it 'dresses from type names when world is specified', ->
    subject = ->
      Meta.Js.Type.dress("Boolean", Finitio.World)
    should(subject).not.throw()
    should(subject()).eql(Boolean)
