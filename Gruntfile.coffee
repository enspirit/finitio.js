shell = require 'shelljs'

'use strict'

module.exports = (grunt) ->

  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'

    cucumberjs:
      src: './features'

  #
  grunt.registerTask 'default', ['test']
  grunt.registerTask 'test', ['test-unit']
  grunt.registerTask 'test-unit', ['jasmine_node']

  grunt.registerTask 'jasmine_node', ->
    res = shell.exec './node_modules/jasmine-node/bin/jasmine-node --coffee specs/'
    unless res.code == 0
      grunt.util.error("jasmine tests failed")

  grunt.loadNpmTasks 'grunt-cucumber'

  process.on 'uncaughtException', (e) ->
    grunt.log.error('Caught unhandled exception: ' + e.toString())
    grunt.log.error(e.stack)
