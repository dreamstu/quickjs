'use strict';
module.exports = function(grunt){

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        config:{
            dist:'dist',
            prefix:'gallery',
            id:'<%= config.prefix %>/<%= pkg.name%>/<%= pkg.version %>',
            dest:'../../../<%= config.id %>'
        },
        banner:
            '/*'+
            '\n Copyright <%= grunt.template.today("yyyy")%>, Quickjs v1.0 dev'+
            '\n MIT Licensed'+
            '\n build time <%=grunt.template.today("yyyy-mm-dd HH:MM:ss")%>'+
            '\n ' +
            '*/' +
            '\n',
        clean:{
            pre:['dist'],
            end:['Gruntfile.js']
        },
        transport:{
            target:{
                options:{
                    /*paths:['seajs-modules'],*/
                    alias:'<%= pkg.alias %>',
                    debug:false,
                    idleading:'<%= config.id %>/'
                },
                files:[{
                    expand:true,
                    src:['*.js','src/**/*.css','src/**/*.js','!Gruntfile.js'],
                    dest:'<%= config.dist %>'
                }]
            }
        },
        concat:{
            options:{
                banner:'<%= banner%>',
                stripBanners:true
            },
            dist:{
                src:['dist/*.js','!dist/*-debug.js'],
                dest:'dist/concat/all.js'
            }
        },
        uglify:{
            options:{
                banner:'<%= banner%>'
            },
            main:{
                files:[{
                    expand: true,
                    cwd:'<%= config.dist %>/',
                    src:['*.js','!*-debug.js'],
                    dest:'<%= config.dest %>/'
                }]
            },
            src:{
                files:[{
                    expand: true,
                    cwd:'<%= config.dist %>/src',
                    src:['**/*.js','**/*.css','!**/*-debug.js','!**/*-debug.css'],
                    dest:'src-dist'
                }]
            }
        },
        copy:{
            src:{
                files:[{
                    expand: true,
                    cwd: 'src-dist/',
                    src: '**',
                    dest:'<%= config.dest %>/src/'
                }]
            },
            debug:{
                expand: true,
                cwd:'<%= config.dist %>/',
                src:['**/*-debug.js','**/*-debug.css'],
                dest:'<%= config.dest %>'
            }
        }
    });

    grunt.registerTask('default',['clean:pre','transport','concat','uglify','copy','clean:end']);
}