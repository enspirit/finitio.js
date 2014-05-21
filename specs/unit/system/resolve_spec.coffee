System      = require '../../../src/finitio/system'
TupleType   = require '../../../src/finitio/type/tuple_type'
{numType}   = require '../../spec_helpers'
should      = require 'should'

describe 'System#resolve', ->

  system = new System [ 
      new System([
          new System([], {}, {'E': 'e'})
        ],
        {},
        {'A': 'a'}
      ),
      new System([], {}, {'B': 'b'}),
    ],
    {
      x: new System([
          new System([], {}, {'F': 'f'})
        ],
        {},
        {'C': 'c'})
    },
    { 'D' : 'd' }

  it 'resolves a direct unqualified name correctly', ->
    should(system.resolve('D')).eql('d')

  it 'resolves a indirect unqualified name correctly', ->
    should(system.resolve('A')).eql('a')
    should(system.resolve('B')).eql('b')

  it 'resolves a qualified name correctly', ->
    should(system.resolve('x.C')).eql('c')

  it 'throws immediately when a qualifier is unknown', ->
    l = ()-> system.resolve('y.C', ()-> 12)
    should(l).throw("No such type `y.C`")

  it 'does not see imports of imports', ->
    l = ()-> system.resolve('E')
    should(l).throw("No such type `E`")

  it 'does not see imports of uses', ->
    l = ()-> system.resolve('x.F')
    should(l).throw("No such type `x.F`")
