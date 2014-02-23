SubType  = require '../../../../lib/type/sub_type'
should   = require 'should'

describe 'SubType#defaultName', ->

  type = new SubType(numType, posint: (i) -> )

  it 'uses the first constraint name', ->
    type.defaultName().should.equal("Posint")