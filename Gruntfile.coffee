shell = require 'shelljs'

'use strict'

module.exports = (grunt) ->

  # List of browsers to use with sauce labs
  browsers = [{
      browserName: "firefox",
      platform: "Linux",
      version: "17"
  }, {
      browserName: "firefox",
      platform: "Linux",
      version: "16"
  }, {
      browserName: "firefox",
      platform: "Linux",
      version: "15"
  }, {
      browserName: "safari",
      platform: "Mac 10.6",
      version: "5"
  }, {
      browserName: "chrome",
      platform: "Windows 2008"
  }, {
      browserName: "chrome",
      platform: "Mac 10.8"
  }, {
      browserName: "chrome",
      platform: "Linux"
  }, {
      browserName: "ipad",
      platform: "Mac 10.8",
      version: "6"
  }, {
      browserName: "iphone",
      platform: "Mac 10.8",
      version: "6"
  }, {
      browserName: "android",
      platform: "Linux",
      version: "4"
  }]

  ## Grunt's main config
  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'

    connect:
      server:
        options:
          base: ""
          port: 9999

    watch: {}

    cucumberjs:
      src: './features'

      options:
        format: 'pretty'
        steps: 'features/step_definitions'

    browserify:
      main:
        files:
          'dist/q-lang.js': ['index.coffee']
        options:
          standalone: 'Qjs'
          transform:  ['coffeeify']
          extensions: ['.coffee', '.js']
          ignore:     ['./node_modules/**/*.*']

      tests:
        files:
          'dist/test_bundle.js': ['specs/**/*.coffee']
        options:
          alias: [
            './specs/spec_helpers.coffee:helpers'
          ]
          transform:  ['coffeeify']
          extensions: ['.coffee']

    coffeelint:
      lib:   ['lib/**/*.coffee']
      tests: ['specs/**/*.coffee']

    "saucelabs-jasmine":
      all:
        options:
          urls: ["http://127.0.0.1:9999/specs/SpecRunner.html"]
          tunnelTimeout: 5
          build: process.env.TRAVIS_JOB_ID,
          concurrency: 3
          browsers: browsers
          testname: "Qjs tests"
          tags: ["master"]

  #
  grunt.registerTask 'default',      ['test', 'browserify']
  grunt.registerTask 'test',         ['build_parser', 'jasmine_node', 'cucumberjs']
  grunt.registerTask 'lint',         ['coffeelint']
  grunt.registerTask 'sauce',        ['connect', 'saucelabs-jasmine']

  grunt.registerTask 'build_parser', ->
    shell.exec 'pegjs --allowed-start-rules system,type,attribute,heading lib/syntax/parser.pegjs lib/syntax/parser.js'

  grunt.registerTask 'jasmine_node', ->
    res = shell.exec './node_modules/jasmine-node/bin/jasmine-node --coffee specs/'
    unless res.code == 0
      grunt.util.error("jasmine tests failed")

  grunt.loadNpmTasks 'grunt-cucumber'
  grunt.loadNpmTasks 'grunt-browserify'
  grunt.loadNpmTasks 'grunt-coffeelint'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-saucelabs'