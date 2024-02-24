module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-cucumber');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-fixtures2js');

  //##################################################################### Tasks

  grunt.registerTask('default', [
    'test:unit',
  ]);

  grunt.registerTask('build', [
    'shell:peggy',
    'shell:tsup',
    'shell:stdlib',
    'shell:tsup',
    'shell:tsc',
    'browserify'
  ]);

  grunt.registerTask('compile', [
    'browserify:main',
    'uglify',
  ]);

  grunt.registerTask('test', [
    'build',
    'fixtures2js',
    'test:unit',
    'test:integration',
    'test:acceptance',
  ]);
  grunt.registerTask('test:unit', [
    'mochaTest:unit',
  ]);
  grunt.registerTask('test:integration', [
    'mochaTest:integration',
  ]);
  grunt.registerTask('test:acceptance', [
    'cucumberjs',
  ]);

  grunt.registerTask('travis', [
    'build',
    'browserify',
    'uglify',
    'fixtures2js',
    'test:unit',
    'test:integration',
    'test:acceptance',
  ]);

  //# Grunt's main config
  return grunt.initConfig({

    //################################################################### Watch

    watch: {
      // Rebuild the parser ASAP
      parser: {
        files: ['src/**/*.pegjs'],
        tasks: ['shell:peggy'],
      },
      // Rebuild the fixtures ASAP
      fixtures: {
        files: ['specs/integration/fixtures/**/*'],
        tasks: ['fixtures2js:integration'],
      },
      // Run all tests when source files change
      test: {
        files: ['src/**/*.js'],
        tasks: ['test:unit', 'test:integration'],
      },
      // Run the unit tests when they change
      unit: {
        files: ['specs/unit/**/*', 'specs/unit/**/*'],
        tasks: ['test:unit'],
      },
      // Run the integration tests when they sources change
      integration: {
        files: ['specs/integration/**/*', 'specs/integration/**/*'],
        tasks: ['test:integration'],
      },
      // Run the acceptance tests when features change
      acceptance: {
        files: ['features/**/*'],
        tasks: ['test:acceptance'],
      },
    },

    //################################################################### Build

    // Cleans compilation results
    clean: ['build'],

    shell: {
      peggy: {
        command: 'peggy src/finitio/parser/parser.pegjs --allowed-start-rules system,type,heading,attribute,contract,constraint,literal,metadata,lambda_expr,type_def,generic_def,import_def,type_instantiate --cache -o src/finitio/parser/parser.js'
      },
      stdlib: {
        command: './bin/finitio-js bundle src/finitio/stdlib/data.fio --url http://finitio.io/0.4/stdlib/data > src/finitio/stdlib/data.js',
      },
      tsup: {
        command: 'tsup',
      },
      tsc: {
        command: 'tsc'
      }
    },

    // Transforms the test fixtures to js files
    fixtures2js: {
      integration: {
        files: {
          'specs/integration/fixtures-jsed.js': 'specs/integration/fixtures/**/*',
        },
        options: {
          head: 'module.exports = ',
        },
      },
    },

    //############################################################# Compilation

    // Browserify sources for main dist and CI tests
    browserify: {
      main: {
        files: {
          'dist/finitio.global.js': ['index.js'],
        },
        options: {
          ignore:     ['./node_modules/**/*.*'],
          browserifyOptions: {
            standalone: 'Finitio',
            extensions: ['.js'],
          },
        },
      },

      tests: {
        files: {
          'dist/finitio.tests.js': ['lib/specs/**/*.js'],
        },
        options: {
          extensions: ['.js'],
        },
      },
    },

    // Minify distributed library
    uglify: {
      my_target: {
        files: {
          'dist/finitio.min.js': ['dist/finitio.js'],
        },
      },
    },

    //####################################################### Metrics & Quality

    jshint: {
      src: [
        'index.js',
        'src/**/*.js',
      ],
      test: [
        'specs/**/*.js',
      ],
      options: {
        curly: true,
        immed: true,
        newcap: true,
        noarg: true,
        sub: true,
        boss: true,
        eqnull: true,
      },
    },

    //#################################################################### Test

    // Acceptance testing with cucumber
    cucumberjs: {
      src: './features',

      options: {
        steps: 'features/step_definitions',
        format: 'progress',
      },
    },
  });
};
