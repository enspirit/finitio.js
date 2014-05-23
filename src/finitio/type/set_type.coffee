{TypeType}      = require '../support/ic'
$u              = require '../support/utils'
Type            = require '../type'
CollectionType  = require '../support/collection_type'

class SetType extends CollectionType
  TypeType this, 'set', ['elmType', 'name', 'metadata']

  defaultName: ->
    "{#{@elmType.name}}"

  _include: (value) ->
    return false unless value instanceof Array
    return false unless $u.every(value, (v) => @elmType.include(v))
    $u.uniq(value).length == value.length

  # Apply the element type's `dress` transformation to each element of
  # `value` (expected to respond to `each`). Return converted values in an
  # Array.
  _dress: (value, helper) ->
    helper.failed(this, value) unless value instanceof Array

    array = []
    helper.iterate value, (elm, index) =>
      dressed = @elmType.dress(elm, helper)
      if $u.include(array, dressed)
        helper.fail("Duplicate value `#{dressed}`")
      else
        array.push dressed
    array

  _undress: (value, as)->
    unless as instanceof CollectionType
      $u.undressError("Unable to undress `#{value}` to `#{as}`")
    super

#
module.exports = SetType
