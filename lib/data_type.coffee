Qjs         = require './qjs'
DressHelper = require './support/dress_helper'

class DataType

  @contracts: ->
    @_contracts ?= {}

  @adType: ->
    @_adType ?= Qjs.adt(this, @contracts())

  @dress: (value, helper) ->
    helper ?= new DressHelper
    @adType().dress(value, helper)

  @contract: (name, infotype) ->
    @contracts()[name] = [ Qjs.type(infotype) ,
                           this[name],
                           (d)-> d[name]() ]

#
module.exports = DataType