Factory   = require '../../../../src/finitio/support/factory'
Attribute = require '../../../../src/finitio/support/attribute'
Parser    = require '../../../../src/finitio/parser'
should    = require 'should'

describe "Parser: attribute metadata", ->

  parse = (source) ->
    Parser.parse(source, { startRule: "attribute", compiler: new Factory() })

  it 'works', ()->
    s = parse('/- Attribute description -/ name: .')
    should(s).be.an.instanceof(Attribute)
    should(s.metadata).eql({ description: 'Attribute description' })
