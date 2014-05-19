$u      = require '../../../../src/finitio/support/utils'
should  = require 'should'

describe "Utils.utility#triSplit", ->

  expShared = { name: ["foo", "foo"], bar: ["baz", "baz"] }

  it 'recognizes same hashes', ->
    x = { name: "foo", bar: "baz" }
    y = { name: "foo", bar: "baz" }
    [shared, left, right] = $u.triSplit(x, y)
    should(shared).eql(expShared)
    should(left).eql({})
    should(right).eql({})

  it 'recognizes extra at left', ->
    x = { name: "foo", bar: "baz", extra: "blah" }
    y = { name: "foo", bar: "baz" }
    [shared, left, right] = $u.triSplit(x, y)
    should(shared).eql(expShared)
    should(left).eql({extra: "blah"})
    should(right).eql({})

  it 'recognizes extra at right', ->
    x = { name: "foo", bar: "baz" }
    y = { name: "foo", bar: "baz", extra: "blah" }
    [shared, left, right] = $u.triSplit(x, y)
    should(shared).eql(expShared)
    should(left).eql({})
    should(right).eql({extra: "blah"})

