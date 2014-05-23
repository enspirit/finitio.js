{TypeType}      = require '../support/ic'
$u              = require '../support/utils'
Type            = require '../type'
CollectionType  = require '../support/collection_type'

class SeqType extends CollectionType
  TypeType this, 'seq', ['elmType', 'name', 'metadata']

  defaultName: ->
    "[#{@elmType.name}]"

  _include: (value) ->
    value instanceof Array and $u.every(value, (v) => @elmType.include(v))

  # Apply the element type's `dress` transformation to each element of
  # `value` (expected to respond to `each`). Return converted values in an
  # Array.
  _dress: (value, helper) ->
    helper.failed(this, value) unless value instanceof Array

    array = []
    helper.iterate value, (elm, index) =>
      array.push @elmType.dress(elm, helper)
    array

  _undress: (value, as)->
    unless as instanceof SeqType
      $u.undressError("Unable to undress `#{value}` to `#{as}`")
    super

#
module.exports = SeqType
