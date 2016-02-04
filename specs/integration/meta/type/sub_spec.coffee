{Meta, should, intType} = require('../../helpers')

describe 'Meta (Sub)', ->

  typedef = (constraint)->
    {
      superType: { builtin: { jsType: String } },
      constraints: [ constraint ]
    }

  it 'dresses as expected on a native constraint', ->
    info = typedef({ name: 'min', native: ()-> })
    should(()-> Meta.SubType.dress(info)).not.throw()

  it 'dresses as expected on a function reference native constraint', ->
    info = typedef({ name: 'even', native: "_.isEven" })
    world = { _: { isEven: (s) -> s%2 == 0 } }
    should(()-> Meta.SubType.dress(info, world)).not.throw()

  it 'dresses as expected on a regexp constraint', ->
    info = typedef({ name: 'matches', regexp: '[a-z]+' })
    should(()-> Meta.SubType.dress(info)).not.throw()

  it 'dresses as expected on a range constraint', ->
    info = typedef({ name: 'within', range: { min: 1, max: 10, min_inclusive: true, max_inclusive: true } })
    should(()-> Meta.SubType.dress(info)).not.throw()

  it 'dresses as expected on a open range constraint', ->
    info = typedef({ name: 'within', range: { min: 1, min_inclusive: true } })
    should(()-> Meta.SubType.dress(info)).not.throw()

  it 'dresses as expected on a set constraint', ->
    info = typedef({ name: 'set', set: [1, 2, 3] })
    should(()-> Meta.SubType.dress(info)).not.throw()
