Attribute = require '../../../src/finitio/support/attribute'
Heading   = require '../../../src/finitio/support/heading'
should     = require 'should'
{intType,
floatType,
byteType} = require '../../spec_helpers'

describe "Heading#isSuperHeadingOf", ->

  a       = new Attribute('a', byteType)
  b       = new Attribute('b', byteType)
  super_a = new Attribute('a', intType)
  maybe_a = new Attribute('a', byteType, false)

  heading = (attributes, opts) -> new Heading(attributes, opts || {})

  # same and different, no maybe, no super, no extra

  it 'recognizes with itself', ->
    h1 = heading([a, b])
    should(h1.isSuperHeadingOf(h1)).be.true

  it 'recognizes with equal', ->
    h1 = heading([a, b])
    h2 = heading([a, b])
    should(h1.isSuperHeadingOf(h2)).be.true

  it 'recognizes with equal in different order', ->
    h1 = heading([a, b])
    h2 = heading([b, a])
    should(h1.isSuperHeadingOf(h2)).be.true

  it 'distinguishes with disjoint', ->
    h1 = heading([a])
    h2 = heading([b])
    should(h1.isSuperHeadingOf(h2)).be.false

  it 'distinguishes with subset', ->
    h1 = heading([a])
    h2 = heading([a, b])
    should(h1.isSuperHeadingOf(h2)).be.false

  it 'distinguishes with superset', ->
    h1 = heading([a, b])
    h2 = heading([a])
    should(h1.isSuperHeadingOf(h2)).be.false

  # super type

  it 'recognizes with super_a', ->
    h1 = heading([super_a, b])
    h2 = heading([a, b])
    should(h1.isSuperHeadingOf(h2)).be.true

  it 'distinguishes with sub_a', ->
    h1 = heading([a, b])
    h2 = heading([super_a, b])
    should(h1.isSuperHeadingOf(h2)).be.false

  # maybes

  it 'recognizes with maybe_a', ->
    h1 = heading([maybe_a, b])
    h2 = heading([a, b])
    should(h1.isSuperHeadingOf(h2)).be.true

  it 'distinguishes with required_a', ->
    h1 = heading([a, b])
    h2 = heading([maybe_a, b])
    should(h1.isSuperHeadingOf(h2)).be.false

  # missings

  it 'recognizes with missing optionals', ->
    h1 = heading([maybe_a, b])
    h2 = heading([b])
    should(h1.isSuperHeadingOf(h2)).be.true

  it 'distinguishes with missing weakened', ->
    h1 = heading([a, b])
    h2 = heading([maybe_a, b])
    should(h1.isSuperHeadingOf(h2)).be.false

  # extra

  it 'recognizes with right-extra if allow extra', ->
    h1 = heading([a], allowExtra: true)
    h2 = heading([a, b])
    should(h1.isSuperHeadingOf(h2)).be.true

  it 'distinguishes with right-extra if not allow extra', ->
    h1 = heading([a], allowExtra: false)
    h2 = heading([a, b])
    should(h1.isSuperHeadingOf(h2)).be.false

  it 'distinguishes when sub allows extra while parent does not', ->
    h1 = heading([a])
    h2 = heading([a], allowExtra: true)
    should(h1.isSuperHeadingOf(h2)).be.false

