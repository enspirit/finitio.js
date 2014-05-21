Factory   = require '../../../../src/finitio/support/factory'
Contract  = require '../../../../src/finitio/support/contract'
Parser    = require '../../../../src/finitio/parser'
should    = require 'should'

describe "Parser: contract metadata", ->

  parse = (source) ->
    Parser.parse(source, { startRule: "contract", compiler: new Factory() })

  it 'works', ()->
    s = parse('/- Contract description -/ <rgb> .')
    should(s.metadata).eql({ description: 'Contract description' })
