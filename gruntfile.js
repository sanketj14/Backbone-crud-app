var path = require('path');

var lessDir = 'assets/less';
// var rendrDir = 'node_modules/rendr';
// var rendrHandlebarsDir = 'node_modules/rendr-handlebars';
// var rendrModulesDir = rendrDir + '/node_modules';

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    handlebars: {
      compile: {
        options: {
          namespace: false,
          commonjs: true,
          processName: function(filename) {
            return filename.replace('templates/', '').replace('.html', '');
          }
        },
        src: "templates/*.html",
        dest: "templates/compiledTemplates.js",
        filter: function(filepath) {
          var filename = path.basename(filepath);
          // Exclude files that begin with '__' from being sent to the client,
          // i.e. __layout.hbs.
          return filename.slice(0, 2) !== '__';
        }
      }
    },

    less: {
      development: {
        options: {
          paths: [lessDir]
        },
        files: {
          'public/css/main.css': 'less/main.less',
        }
      }
    },

    watch: {
      scripts: {
        files: 'js/*.js',
        tasks: ['browserify'],
        options: {
          interrupt: true
        }
      },
      templates: {
        files: 'templates/*.html',
        tasks: ['handlebars'],
        options: {
          interrupt: true
        }
      },
      less: {
        files: [ 'less/*.less', 'less/**/*.less' ],
        tasks: [ 'less' ],
        options: {
          interrupt: true
        }
      }
    },

    concat: {
      vendor: {
        src: [
        ],
        dest: 'public/js/vendor.js',
      },
      scripts: {
        src: [
        ],
        dest: 'public/js/scripts.js',
      }
    },

    concat_css: {
      options: {
        // Task-specific options go here.
      },
      all: {
        // src: ['public/css/vendor/*.css'],
        // dest: "public/css/vendor.css"
      },
    },

   browserify: {
      // options: {
      //   debug: true,
      //   alias: [
      //     'node_modules/rendr-handlebars/index.js:rendr-handlebars'
      //   ],
      //   aliasMappings: [{
      //     cwd: 'app/',
      //     src: [ '**/*.js' ],
      //     dest: 'app/'
      //   }],
      //   external: [ 'jquery' ]
      // },
      app: {
        src: [
          '**/*.js'
        ],
        dest: 'public/js/main.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('runNode', function () {
    grunt.util.spawn({
      cmd: 'node',
      args: ['./node_modules/nodemon/bin/nodemon.js', 'index.js'],
      opts: {
        stdio: 'inherit'
      }
    }, function () {
      grunt.fail.fatal(new Error("ERROR: nodemon quit logged"));
    });
  });

  grunt.registerTask('compile', [ 'handlebars', 'concat', 'browserify'  ]);

  grunt.registerTask('dev', [ 'compile' ]);
  grunt.registerTask('master', [ 'compile' ]);


  // Run the server and watch for file changes
  grunt.registerTask('server', [ 'runNode',  'watch' ]);

  // Default task(s).
  grunt.registerTask('default', [ 'compile' ]);
};
