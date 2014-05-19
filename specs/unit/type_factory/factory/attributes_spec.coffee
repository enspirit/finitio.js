Attribute   = require '../../../../src/finitio/support/attribute'
TypeFactory = require '../../../../src/finitio/support/factory'
BuiltinType = require '../../../../src/finitio/type/builtin_type'
should      = require 'should'
_           = require 'underscore'

describe 'TypeFactory#attributes', ->

  factory = new TypeFactory

  describe 'when used with a name and a JS class', ->
    subject = factory.attributes(foo: Number, bar: String)

    it 'should work as expected', ->
      subject.should.be.an.instanceof(Array)
      _.each subject, (arg)->
        arg.should.be.an.instanceof(Attribute)
