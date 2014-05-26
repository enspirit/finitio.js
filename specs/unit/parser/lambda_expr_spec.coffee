Parser = require '../../../src/finitio/parser'
should = require 'should'

describe "Parser#lambda_expr", ->

  parse = (source) ->
    Parser.parse(source, { startRule: "lambda_expr" })

  it 'works', ()->
    s = parse('( s | s>0 )')
    should(s).eql(['s', 's>0'])
