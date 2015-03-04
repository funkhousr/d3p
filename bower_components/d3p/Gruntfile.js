module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      d3p: {
        src: [
          'src/<%= pkg.name %>.js', 
          'src/*.js'
        ],
        dest: '<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        mangle: false,
        sourceMap: true
      },
      d3p: {
        files: {
          '<%= pkg.name %>.min.js': ['<%= pkg.name %>.js']
        }
      }
    }
  });

  // Minify Themes
  grunt.file.expand({ cwd: 'themes' }, "*").forEach(function(theme){
    var uglify = grunt.config.get('uglify'),
        path   = 'themes/' + theme + '/',
        target = path + theme + '.min.js',
        base   = path + theme + '.js';
    uglify[theme] = {files: {}};
    uglify[theme].files[target] = [base, path + '*.js'];
    grunt.config.set('uglify', uglify);
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['concat', 'uglify']);
};
