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
  grunt.loadNpmTasks('grunt-babel');

  //##################################################################### Tasks

  grunt.registerTask('default', [
    'test:unit',
  ]);

  grunt.registerTask('build', [
    'browserify',
    'uglify',
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
        tasks: ['peg:build'],
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
    babel: {
      options: {
        sourceMap: true,
        presets: ['@babel/preset-env'],
      },
      files: {
        expand: true,
        cwd: 'src/',
        src: ['**/*.js'],
        dest: 'lib/',
      },
    },
    //################################################################### Build

    // Cleans compilation results
    clean: ['build'],

    shell: {
      stdlib: {
        command: '',
      },
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
          'dist/finitio.js': ['index.js'],
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

    // Unit testing using mocha
    mochaTest: {
      unit: {
        src: ['specs/unit/**/*.js'],
        options: {
          require: '@babel/register',
        },
      },
      integration: {
        src: ['specs/integration/**/*.js'],
        options: {
          require: '@babel/register',
        },
      },
    },

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
