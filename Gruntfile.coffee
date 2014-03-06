shell = require 'shelljs'

'use strict'

module.exports = (grunt) ->

  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'

    cucumberjs:
      src: './features'

      options:
        format: 'pretty'

    browserify:
      main:
        files:
          'dist/q.js': ['index.coffee']
        options:
          alias:      ['./lib/qjs:qjs']
          transform:  ['coffeeify']
          extensions: ['.coffee']

      tests:
        files:
          'dist/test_bundle.js': ['specs/**/*.coffee']
        options:
          #external:   ['./lib/**/*.coffee']
          ignore: ['./node_modules/**/*.js']
          transform:  ['coffeeify']
          extensions: ['.coffee']

    coffeelint:
      lib:   ['lib/**/*.coffee']
      tests: ['specs/**/*.coffee']

  #
  grunt.registerTask 'default',      ['build_parser', 'test']
  grunt.registerTask 'test',         ['jasmine_node']
  grunt.registerTask 'lint',         ['coffeelint']

  grunt.registerTask 'build_parser', ->
    shell.exec 'pegjs --allowed-start-rules system,type,attribute,heading lib/syntax/parser.pegjs lib/syntax/parser.js'

  grunt.registerTask 'jasmine_node', ->
    res = shell.exec './node_modules/jasmine-node/bin/jasmine-node --coffee specs/'
    unless res.code == 0
      grunt.util.error("jasmine tests failed")

  grunt.loadNpmTasks 'grunt-cucumber'
  grunt.loadNpmTasks 'grunt-browserify'
  grunt.loadNpmTasks 'grunt-coffeelint'