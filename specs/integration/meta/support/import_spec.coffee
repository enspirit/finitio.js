{Meta, Finitio, should, intType} = require('../../helpers')

describe 'Meta (Import)', ->

  it 'works when unqualified', ->
    info = {
      from: 'finitio/data'
    }

    resolver = (x)->
      should(x).eql('finitio/data')
      Meta.System.dress({ types: [] })

    subject = ->
      Meta.Import.dress(info, { importResolver: resolver })

    should(subject).not.throw()
    should(subject().system).be.an.instanceof(Finitio.System)
