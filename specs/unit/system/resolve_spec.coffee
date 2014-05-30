System      = require '../../../src/finitio/system'
TupleType   = require '../../../src/finitio/type/tuple_type'
{numType}   = require '../../spec_helpers'
should      = require 'should'

describe 'System#resolve', ->

  typedef = (t)->
    t.trueOne = ()-> t
    t

  a = typedef({ name: 'A' })
  b = typedef({ name: 'B' })
  c = typedef({ name: 'C' })
  d = typedef({ name: 'D' })
  e = typedef({ name: 'E' })
  f = typedef({ name: 'F' })

  system = new System [ 
      { system: new System( [ { system: new System([], [e]) } ], [a]) }
      { system: new System([], [b]) }
      { qualifier: 'x', system: new System([ new System([], [f]) ], [c]) }
    ],
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

  it 'does not see qualified when unqualified', ->
    l = ()-> system.resolve('C')
    should(l).throw("No such type `C`")

  it 'does not see imports of imports', ->
    l = ()-> system.resolve('E')
    should(l).throw("No such type `E`")

  it 'does not see imports of uses', ->
    l = ()-> system.resolve('x.F')
    should(l).throw("No such type `x.F`")
