shell = require 'shelljs'

'use strict'

module.exports = (grunt) ->

  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'

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

  grunt.registerTask 'jasmine_node', ->
    shell.exec './node_modules/jasmine-node/bin/jasmine-node --coffee specs/'

  grunt.loadNpmTasks 'grunt-cucumber'
  grunt.loadNpmTasks 'grunt-coffeelint'
