'use strict';
module.exports = function(grunt){
    
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        seabuild:{
            options:{
                id:'gallery',
                //uglify:false
                // more http://lisperator.net/uglifyjs/compress
                uglify:{
                    min:true,
                    options:{
                        global_defs: {
                            DEBUG: true
                        }
                    },
                    output:{
                        beautify:false
                    }
                }
            },
            main:{
                expand:true,
                cwd:'./',
                src:['src/**/*.js','index.js'],
                dest: '../'
            }
        }
    });
    grunt.registerTask('default',['seabuild']);
}

