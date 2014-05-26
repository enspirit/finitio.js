{Meta, should, intType} = require('../helpers')

describe 'Meta (System)', ->

  info = {
    types: [
      { name: 'Str', type: { builtin: { jsType: String } } }
    ]
    uses: [
      { qualifier: 'js', system: { types: [], uses: [], imports: [] } }
    ]
    imports: []
  }

  it 'dresses as expected', ->
    should(()-> Meta.System.dress(info)).not.throw()
