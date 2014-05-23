System      = require '../../../src/finitio/system'
TupleType   = require '../../../src/finitio/type/tuple_type'
{numType}   = require '../../spec_helpers'
should      = require 'should'

describe 'System#resolve', ->

  a = { name: 'A' }
  b = { name: 'B' }
  c = { name: 'C' }
  d = { name: 'D' }
  e = { name: 'E' }
  f = { name: 'F' }

  system = new System [ 
      new System([
          new System([], {}, [e])
        ],
        {},
        [a]
      ),
      new System([], {}, [b]),
    ],
    {
      x: new System([
          new System([], {}, [f])
        ],
        {},
        [c])
    },
    [d]

  it 'resolves a direct unqualified name correctly', ->
    should(system.resolve('D')).equal(d)

  it 'resolves a indirect unqualified name correctly', ->
    should(system.resolve('A')).equal(a)
    should(system.resolve('B')).equal(b)

  it 'resolves a qualified name correctly', ->
    should(system.resolve('x.C')).equal(c)

  it 'throws immediately when a qualifier is unknown', ->
    l = ()-> system.resolve('y.C', ()-> 12)
    should(l).throw("No such type `y.C`")

  it 'does not see imports of imports', ->
    l = ()-> system.resolve('E')
    should(l).throw("No such type `E`")

  it 'does not see imports of uses', ->
    l = ()-> system.resolve('x.F')
    should(l).throw("No such type `x.F`")
