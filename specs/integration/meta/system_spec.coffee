{Meta, should, intType} = require('../helpers')

describe 'Meta (System)', ->

  info = {
    types: [
      { name: 'Str', type: { builtin: { jsType: String } } }
    ]
    imports: [
      { qualifier: 'js', from: 'finitio/js' }
    ]
  }

  it 'dresses as expected', ->
    resolver = (x)->
      should(x).eql('finitio/js')
      Meta.System.dress({ types: [] })
    subject = ->
      Meta.System.dress(info, { importResolver: resolver })
    should(subject).not.throw()
