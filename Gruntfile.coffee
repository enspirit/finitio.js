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

    browserify:
      dist:
        files:
          'build/q.js': ['index.coffee']
        options:
          alias:      ['./lib/qjs:qjs']
          transform:  ['coffeeify']
          extensions: ['.coffee']
      
  #
  grunt.registerTask 'default', ['test']
  grunt.registerTask 'test', ['test-unit']
  grunt.registerTask 'test-unit', ['jasmine_node']
  
  grunt.loadNpmTasks 'grunt-jasmine-node'
  grunt.loadNpmTasks 'grunt-cucumber'
  grunt.loadNpmTasks 'grunt-browserify'
