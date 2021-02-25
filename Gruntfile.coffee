shell = require 'shelljs'

'use strict'

module.exports = (grunt) ->

  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-shell'
  grunt.loadNpmTasks 'grunt-cucumber'
  grunt.loadNpmTasks 'grunt-peg'
  grunt.loadNpmTasks 'grunt-mocha-test'
  grunt.loadNpmTasks 'grunt-browserify'
  grunt.loadNpmTasks 'grunt-coffeelint'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-fixtures2js'

  ###################################################################### Tasks

  grunt.registerTask 'default', [
    'peg:build',
    'test:unit'
  ]

  grunt.registerTask 'build', [
    'clean',
    'peg:build',
    'stdlib:build',
    'copy:build',
    'coffee:build'
  ]

  grunt.registerTask 'stdlib:build', [
    'shell:stdlib'
  ]

  grunt.registerTask 'compile', [
    'build',
    'browserify:main',
    'uglify'
  ]

  grunt.registerTask 'test', [
    'build',
    'fixtures2js'
    'test:unit',
    'test:integration',
    'test:acceptance'
  ]
  grunt.registerTask 'test:unit', [
    'mochaTest:unit'
  ]
  grunt.registerTask 'test:integration', [
    'mochaTest:integration'
  ]
  grunt.registerTask 'test:acceptance', [
    'cucumberjs'
  ]

  grunt.registerTask 'lint', [
    'coffeelint'
  ]

  grunt.registerTask 'travis', [
    'build',
    'browserify',
    'uglify'
    'fixtures2js'
    'test:unit',
    'test:integration',
    'test:acceptance'
  ]

  ## Grunt's main config
  grunt.initConfig

    #################################################################### Watch

    watch:
      # Rebuild the parser ASAP
      parser:
        files: [ 'src/**/*.pegjs' ]
        tasks: [ 'peg:build' ]
      # Rebuild the fixtures ASAP
      fixtures:
        files: [ 'specs/integration/fixtures/**/*' ]
        tasks: [ 'fixtures2js:integration' ]
      # Run all tests when source files change
      test:
        files: [ 'src/**/*.js',   'src/**/*.coffee' ]
        tasks: [ 'test:unit', 'test:integration' ]
      # Run the unit tests when they change
      unit:
        files: [ 'specs/unit/**/*', 'specs/unit/**/*' ]
        tasks: [ 'test:unit' ]
      # Run the integration tests when they sources change
      integration:
        files: [ 'specs/integration/**/*', 'specs/integration/**/*' ]
        tasks: [ 'test:integration' ]
      # Run the acceptance tests when features change
      acceptance:
        files: [ 'features/**/*']
        tasks: [ 'test:acceptance' ]

    #################################################################### Build

    # Cleans compilation results
    clean: [ 'build' ]

    # Build .coffee sources to .js, from src/ to build/
    coffee:
      build:
        expand: true
        bare: true
        src: [ 'src/**/*.coffee', 'specs/**/*.coffee' ]
        dest: "build/"
        ext: ".js"

    # Build .js sources to .js, from src/ to build/
    copy:
      build:
        files: [
          expand: true
          src: [ 'package.json', 'src/**/*.js', 'specs/**/*.js' ]
          dest: 'build/'
          filter: 'isFile'
        ]

    # Build the parser from .pegjs in src/ to .js in build/src
    peg:
      build:
        src:  "src/finitio/parser.pegjs"
        dest: "src/finitio/parser.js"
        options:
          cache: true
          allowedStartRules: [
            'system',
            'type',
            'heading',
            'attribute',
            'contract',
            'constraint',
            'literal',
            'metadata',
            'lambda_expr',
            'type_def',
            'import_def'
          ]

    shell:
      stdlib:
        command: './bin/finitio-js.coffee --bundle --url http://finitio.io/0.4/stdlib/data src/finitio/stdlib/data.fio > src/finitio/stdlib/data.js'

    # Transforms the test fixtures to js files
    fixtures2js:
      integration:
        files:
          "specs/integration/fixtures-jsed.js": "specs/integration/fixtures/**/*"
        options:
          head: "module.exports = "

    ############################################################## Compilation

    # Browserify sources for main dist and CI tests
    browserify:
      main:
        files:
          'dist/finitio.js': ['build/src/finitio.js']
        options:
          standalone: 'Finitio'
          extensions: ['.js']
          ignore:     ['./node_modules/**/*.*', './package.json']

      tests:
        files:
          'dist/finitio.tests.js': ['build/specs/**/*.js']
        options:
          extensions: ['.js']

    # Minify distributed library
    uglify:
      my_target:
        files:
          'dist/finitio.min.js': [ 'dist/finitio.js' ]

    ######################################################## Metrics & Quality

    jshint:
      src: [
        'index.js',
        'src/**/*.js'
      ]
      test: [
        'specs/**/*.js'
      ]
      options:
        curly: true
        immed: true
        newcap: true
        noarg: true
        sub: true
        boss: true
        eqnull: true

    coffeelint:
      src:   ['src/**/*.coffee']
      tests: ['specs/**/*.coffee']

    ##################################################################### Test

    # Unit testing using mocha
    mochaTest:
      unit:
        src: ['specs/unit/**/*.coffee']
        options:
          require: 'coffee-script/register'
      integration:
        src: ['specs/integration/**/*.coffee']
        options:
          require: 'coffee-script/register'

    # Acceptance testing with cucumber
    cucumberjs:
      src: './features'

      options:
        steps: 'features/step_definitions'
        format: 'progress'
