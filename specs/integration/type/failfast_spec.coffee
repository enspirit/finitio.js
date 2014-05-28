{Finitio, should} = require '../helpers'

describe "Type#dress, fail fast option", ->

  system = Finitio.dress("Posint = .Number(i | i>0)\n{{ age: Posint }}")

  context 'when set', ->
    subject = ->
      system.dress([ { age: -12 }, { age: 'foo'} ], failfast: true)

    it 'throws', ->
      should(subject).throw()

    it 'stops at the first error', ->
      try
        subject()
        should("not here").eql("")
      catch e
        should(e.causes.length).eql(1)
