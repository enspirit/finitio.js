shell = require 'shelljs'

'use strict'

module.exports = (grunt) ->

  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'

    jasmine_node:
      specFolders: ['./specs']
      source: 'lib/'
      extensions: 'coffee'
      useCoffee: true
      useHelpers: true

    cucumberjs:
      src: './features'

    coffeelint:
      lib:   ['lib/**/*.coffee']
      tests: ['specs/**/*.coffee']

  #
  grunt.registerTask 'default',      ['build_parser', 'test']
  grunt.registerTask 'test',         ['jasmine_node']
  grunt.registerTask 'lint',         ['coffeelint']

  grunt.registerTask 'build_parser', ->
    shell.exec 'pegjs --allowed-start-rules type lib/syntax/parser.pegjs lib/syntax/parser.js'

  grunt.loadNpmTasks 'grunt-jasmine-node'
  grunt.loadNpmTasks 'grunt-cucumber'
  grunt.loadNpmTasks 'grunt-coffeelint'
