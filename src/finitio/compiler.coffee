TypeFactory = require './support/factory'
Parser = require './parser'

class Compiler

  constructor: (@system)->
    # Install the factory methods
    for method in TypeFactory.PUBLIC_DSL_METHODS
      this[method] = @system[method].bind(@system)

    # Install delegation to system
    this.addType = @system.addType.bind(@system)
    this.getType = @system.getType.bind(@system)
    this.fetch   = @system.fetch.bind(@system)

  compile: (source, options)->
    options ?= {}
    options.compiler = this
    Parser.parse(source, options)
    @system

  setMain: (main)->
    @system.main = main;

module.exports = Compiler