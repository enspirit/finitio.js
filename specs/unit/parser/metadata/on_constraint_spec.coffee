Factory   = require '../../../../src/finitio/support/factory'
Contract  = require '../../../../src/finitio/support/contract'
Parser    = require '../../../../src/finitio/parser'
should    = require 'should'

describe "Parser: constraint metadata", ->

  parse = (source) ->
    Parser.parse(source, { startRule: "constraint", compiler: new Factory() })

  it 'works', ()->
    s = parse('( s | /- Min descr. -/ min: s>0, /- Max descr. -/ max: s<0 )')
    should(s).be.an.instanceof(Array)
    should(s[0].metadata).eql({ description: 'Min descr.'})
    should(s[1].metadata).eql({ description: 'Max descr.'})