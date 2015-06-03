module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    concat: {
      plugins: {
        src: [
          /* jQuery. */
          'bower_components/jquery/dist/jquery.js',

          /*
           * Twitter Bootstrap.
           * Note: Only include the files you need!
           */
          // 'bower_components/bootstrap/js/transition.js',
          // 'bower_components/bootstrap/js/alert.js',
          // 'bower_components/bootstrap/js/button.js',
          // 'bower_components/bootstrap/js/carousel.js',
          // 'bower_components/bootstrap/js/collapse.js',
          // 'bower_components/bootstrap/js/dropdown.js',
          // 'bower_components/bootstrap/js/modal.js',
          // 'bower_components/bootstrap/js/tooltip.js',
          // 'bower_components/bootstrap/js/popover.js',
          // 'bower_components/bootstrap/js/scrollspy.js',
          // 'bower_components/bootstrap/js/tab.js',
          // 'bower_components/bootstrap/js/affix.js',

          /* OctoberCMS Framework. */
          '../../modules/system/assets/js/framework.js',
          '../../modules/system/assets/js/framework.extras.js'
        ],
        dest: 'assets/js-dist/plugins.js'
      }
    },

    jshint: {
      app: {
        options: {
          jshintrc: 'assets/js/.jshintrc'
        },
        src: 'assets/js/**/*.js'
      }
    },

    jscs: {
      app: {
        options: {
          config: 'assets/js/.jscsrc'
        },
        src: '<%= jshint.app.src %>'
      }
    },

    uglify: {
      options: {
        compress: {
          warnings: false
        },
        mangle: true,
        preserveComments: 'some'
      },

      plugins: {
        files: {
          'assets/js-dist/plugins.min.js': [
            'assets/js-dist/plugins.js'
          ]
        }
      },

      app: {
        options: {
          sourceMap: true
        },
        files: {
          'assets/js-dist/app.js': [
            'assets/js/app.js'
          ]
        }
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 7,
          progressive: true,
          use: [require('imagemin-mozjpeg')()]
        },
        files: [{
          expand: true,
          cwd: 'assets/images/',
          src: ['**/*.{png,jpg,jpeg,gif,svg}'],
          dest: 'assets/images/'
        }]
      }
    },

    less: {
      options: {
        strictImports: true,
        strictMath: true,
        strictUnits: true,
        sourceMap: true,
        sourceMapURL: 'app.css.map',
        sourceMapRootpath: '../../'
      },

      app: {
        files: {
          'assets/css/app.css': 'assets/less/app/app.less'
        }
      }
    },

    postcss: {
      options: {
        map: {
          inline: false,
          prev: 'assets/css/'
        },
        processors: [
          require('autoprefixer-core')({browsers: [
            'Android 2.3',
            'Android >= 4',
            'Chrome >= 20',
            'Firefox >= 24',
            'Explorer >= 8',
            'iOS >= 6',
            'Opera >= 12',
            'Safari >= 6'
          ]}),
          require('csswring')
        ]
      },

      app: {
        src: 'assets/css/app.css'
      }
    },

    watch: {
      options: {
        livereload: {
          port: 35729
        }
      },

      js: {
        files: '<%= jshint.app.src %>',
        tasks: ['jshint:app', 'uglify:app']
      },

      less: {
        files: 'assets/less/**/*.less',
        tasks: ['less:app', 'css']
      },

      twig: {
        files: '{content,layouts,pages,partials}/**/*.htm'
        // Just to trigger livereload.
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-postcss');

  grunt.registerTask(
    'css',
    'Compile LESS to CSS and run postcss for production.',
    ['less:app', 'postcss:app']
  );

  grunt.registerTask(
    'images',
    'Run imagemin on images.',
    ['imagemin:images']
  );

  grunt.registerTask(
    'js',
    'Build all JS files for production.',
    ['concat:plugins', 'uglify:plugins', 'jshint:app', 'jscs:app', 'uglify:app']
  );

  grunt.registerTask(
    'default',
    'Build the theme for production',
    ['css', 'js', 'images']
  );

  grunt.registerTask(
    'dev',
    'Development mode',
    ['less:app', 'js', 'watch']
  );

  grunt.registerTask(
    'lint:js',
    'Run jshint and jscs on app js',
    ['jshint:app', 'jscs:app']
  );
};
