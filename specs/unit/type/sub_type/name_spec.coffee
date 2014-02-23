SubType     = require '../../../../lib/type/sub_type'
should      = require 'should'

describe "SubType#name", ->

  get = (type) -> type.name

  describe 'when provided', ->
    subject = get(new SubType(numType, {positive: (i) ->}, "Foo"))

    it 'uses the specified one', ->
      subject.should.equal("Foo")

  describe 'when not provided', ->
    subject = get(new SubType(numType, positive: (i) ->))

    it 'uses the first constraint name', ->
      subject.should.equal("Positive")
