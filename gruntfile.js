module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      scripts: {
        files: 'js/**/*.js',
        tasks: ['browserify'],
        options: {
          interrupt: true
        }
      },
    },

    concat: {
      scripts: {
        src: [
          'js/Models/*.js',
          'js/Collections/*.js',
          'js/Views/*.js',
          'js/*.js',
        ],
        dest: 'public/js/scripts.js',
      }
    },

   browserify: {
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

  // Default task(s).
  grunt.registerTask('default', [ 'concat', 'watch' ]);
};
