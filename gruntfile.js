module.exports = function(grunt) {

  // load all grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      install: {
        //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
      }
    },
    // configurable paths
    app: require('./bower.json').appPath || 'app',
    express: {
      options: {
        port: process.env.PORT || 8000
      },
      dev: {
        options: {
          script: 'server.js'
        }
      }
    },
    karma: {
      unit: {
        configFile: 'config/karma.conf.js'
      }
    },
    protractor: {
      e2e: {
        configFile: 'config/protractor-conf.js',
        keepAlive: true
      }
    },
    watch: {
      compass: {
        files: ['<%= app %>/css/{,*/}*.{scss,sass}'],
        tasks: ['compass:server']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        files: [
          '<%= app %>/views/**/*.html',
          '<%= app %>/views/**/*.html.js',
          '<%= app %>/css/{,*//*}*.css',
          '<%= app %>/js/**/*.js',
          '<%= app %>/services/**/*.js',
          '<%= app %>/directives/**/*.js',
          '<%= app %>/filters/**/*.js',
          '<%= app %>/views/**/*.js',
          '<%= app %>/*.js',
          '<%= app %>/index.html',
          '<%= app %>/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}',
        ],

        options: {
          livereload: true
        }
      },
      express: {
        files: [
          'server.js',
          'lib/**/*.{js,json}'
        ],
        tasks: ['express:dev', 'wait'],
        options: {
          livereload: true,
          nospawn: true //Without this option specified express won't be reloaded
        }
      }
    },
    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= app %>/css',
        cssDir: '<%= app %>/css',
        generatedImagesDir: 'images/generated',
        imagesDir: '<%= app %>/images',
        javascriptsDir: '<%= app %>/js',
        fontsDir: '<%= app %>/css/fonts',
        importPath: '<%= app %>/libs',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/css/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      server: {
        options: {
          debugInfo: false
        }
      }
    },
    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ]
    }
  });

  // Used for delaying livereload until after server has restarted
  grunt.registerTask('wait', function() {
    grunt.log.ok('Waiting for server reload...');

    var done = this.async();

    setTimeout(function() {
      grunt.log.writeln('Done waiting!');
      done();
    }, 500);
  });


  grunt.registerTask('serve', function(target) {
    grunt.task.run([
      'concurrent:server',
      // 'autoprefixer',
      'express:dev',
      'watch'
    ]);
  });

  grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
    this.async();
  });

  grunt.registerTask('default', ['serve']);
  grunt.registerTask('prot', ['protractor']);
};