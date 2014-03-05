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
    shell.exec './node_modules/jasmine-node/bin/jasmine-node --coffee specs/'

  grunt.loadNpmTasks 'grunt-cucumber'
