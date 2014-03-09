AnyType     = require '../../../../src/type/any_type'
{TypeError} = require '../../../../src/errors'
should      = require 'should'
_           = require 'underscore'

describe "AnyType#include", ->

  type = new AnyType

  subject = (arg) -> type.include(arg)

  describe 'in any case', ->
    cases = [null, undefined, 42, 3.14, "foo", false, true, {'foo':'bar'}, [12]]

    it 'should return true', ->
      allpass = _.every cases, (val) ->
        subject(val).should.be.true

      allpass.should.be.true
