module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            css: {
                src: [
                    'css/font_lato.css', 'css/style.css', 'css/about.css', 'css/colors.css', 'css/map.css', 'css/error.css', 'css/navbar.css', 'css/details.css'
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
        clean: {
            dist: ["dist/*"],
            gh: [".grunt"]
        },
        'gh-pages': {
            options: {
                base: '',
                branch: 'gh-pages',
                message: 'Site auto-published on gh-pages by Grunt',
                push: true
            },
            src: ['index.html', 'partials/*', 'dist/*min*', 'font/*', 'img/*', 'img/navbar_icons/mono_black/*', 'img/*/*', 'trentoleaf.appcache', 'CNAME', 'README.md']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.registerTask('default', ['clean:dist', 'concat:css', 'cssmin:css', 'concat:js', 'uglify:js']);
    grunt.registerTask('publish', ['clean:gh', 'gh-pages']);
};
