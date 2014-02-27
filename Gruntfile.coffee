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
      
  #
  grunt.registerTask 'default', ['test-unit']
  #grunt.registerTask 'test', ['jasmine_node', 'cucumberjs']
  grunt.registerTask 'test-unit', ['jasmine_node']
  
  grunt.loadNpmTasks 'grunt-jasmine-node'
  grunt.loadNpmTasks 'grunt-cucumber'
