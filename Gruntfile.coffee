shell = require 'shelljs'

'use strict'

module.exports = (grunt) ->

  ## Grunt's main config
  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'

    #
    clean: ['dist', 'lib']

    # Compile the .coffee sources to .js
    #    from src/ to lib/
    coffee:
      all:
        expand: true
        bare: true
        cwd: "src/"
        src: ['**/*.coffee']
        dest: "lib/"
        ext: ".js"

    # Compile the .js sources to .js
    #    from src/ to lib/
    copy:
      main:
        files: [
          expand: true
          cwd: "src/"
          src: ['**/*.js']
          dest: 'lib/'
          filter: 'isFile'
        ]

    connect:
      server:
        options:
          base: "."
          port: 9999

    watch:
      lib:
        files: ['index.js', 'src/**/*.js', 'src/**/*.coffee'],
        tasks: 'compile'

    cucumberjs:
      src: './features'

      options:
        format: 'pretty'
        steps: 'features/step_definitions'

    mochaTest:
      test:
        src: ['specs/**/*.coffee']
        options:
          reporter: 'spec'
          require: 'coffee-script/register'

    browserify:
      main:
        files:
          'dist/q-lang.js': ['index.js']
        options:
          standalone: 'Qjs'
          transform:  ['coffeeify']
          extensions: ['.coffee', '.js']
          ignore:     ['./node_modules/**/*.*']

      tests:
        files:
          'dist/test_bundle.js': ['specs/**/*.coffee']
        options:
          transform:  ['coffeeify']
          extensions: ['.coffee']

    coffeelint:
      lib:   ['lib/**/*.coffee']
      tests: ['specs/**/*.coffee']

    "saucelabs-mocha":
      all:
        options:
          urls: ["http://localhost:9999/specs/SpecRunner.html"]
          build: process.env.TRAVIS_JOB_ID
          concurrency: 3
          browsers: [
            {browserName: 'chrome'},
            {browserName: 'chrome', version: '32', platform: "Windows 8"},
            {browserName: 'chrome', version: '31', platform: "Windows 8"},
            {browserName: 'chrome', version: '30', platform: "Windows 8"},
            {browserName: 'chrome', version: '26', platform: "Windows 8"},

            {browserName: 'firefox'},
            {browserName: 'firefox', version: '26', platform: "Windows 8"},
            {browserName: 'firefox', version: '25', platform: "Windows 8"},
            {browserName: 'firefox', version: '24', platform: "Windows 8"},
            {browserName: 'firefox', version: '20', platform: "Windows 8"},
            {browserName: 'firefox', version: '10', platform: "Windows 8"},

            {browserName: 'safari', version: "7", platform: 'OS X 10.9'},
            {browserName: 'safari', version: "6", platform: 'OS X 10.8'},

            {browserName: 'iphone', version: '7',   platform: 'OS X 10.9'},
            {browserName: 'iphone', version: '6.0', platform: 'OS X 10.8'},

            {browserName: 'ipad', version: '7',   platform: 'OS X 10.9'},
            {browserName: 'ipad', version: '6.0', platform: 'OS X 10.8'},

            {browserName: 'android', version: '4.3', platform: 'Linux'},

            {browserName: 'internet explorer', version: 11, platform: 'Windows 8.1'},
            {browserName: 'internet explorer', version: 10, platform: 'Windows 8'}
          ]
          testname: "Qjs tests"
          tags: ["master"]

  #
  grunt.registerTask 'default',      ['compile', 'test']
  grunt.registerTask 'compile',      ['clean', 'coffee', 'copy', 'browserify']
  grunt.registerTask 'test',         ['mochaTest', 'cucumberjs']
  grunt.registerTask 'lint',         ['coffeelint']

  grunt.registerTask 'travis',       ['default', 'connect', 'saucelabs-mocha']
  grunt.registerTask 'dev',          ['default', 'connect', 'watch']

  grunt.registerTask 'build_parser', ->
    shell.exec 'pegjs --allowed-start-rules system,type,attribute,heading lib/syntax/parser.pegjs lib/syntax/parser.js'

  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-cucumber'
  grunt.loadNpmTasks 'grunt-mocha-test'
  grunt.loadNpmTasks 'grunt-browserify'
  grunt.loadNpmTasks 'grunt-coffeelint'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-saucelabs'