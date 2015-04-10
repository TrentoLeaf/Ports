module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            css: {
                src: [
                    'css/*'
                ],
                dest: 'dist/combined.css'
            },
            js: {
                src: [
                    'js/*',
                    'js/controllers/*',
                    'js/services/*',
                    'js/utilities/*'
                ],
                dest: 'dist/combined.js'
            }
        },
        cssmin: {
            css: {
                src: 'dist/combined.css',
                dest: 'dist/combined.min.css'
            }
        },
        uglify: {
            js: {
                options: {
                    sourceMap: true
                },
                files: {
                    'dist/combined.min.js': ['dist/combined.js']
                }
            }
        },
        clean: ["dist/*"],
        'gh-pages': {
            options: {
                base: '',
                branch: 'gh-pages',
                message: 'Site auto-published on gh-pages by Grunt',
                push: true
            },
            src: ['index.html', 'partials/*', 'dist/*min*', 'font/*', 'img/*', 'img/navbar_icons/mono_black/*', 'img/*/*', 'trentoleaf.appcache']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.registerTask('default', ['clean', 'concat:css', 'cssmin:css', 'concat:js', 'uglify:js']);
};