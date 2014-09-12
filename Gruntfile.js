'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    var modRewrite = require('connect-modrewrite');

    // Configurable paths for the application
    var appConfig = {
        app:    'app',
        dist:   'dist',
        test:   'test',
        config: 'config',
        tmp:    '.tmp'
    };

    try {
        appConfig.app = require('./bower.json').appPath || appConfig.app;
    } catch (e) {
    }

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: appConfig,

        // Watches files for changes and runs tasks based on the changed files
        watch:  {
            options:    {
                livereload: true,
                nospawn:    true
            },
            bower:      {
                files: 'bower.json',
                tasks: 'wiredep'
            },
            js:         {
                files: '<%= yeoman.app %>/scripts/**/*.js',
                tasks: ['newer:jshint:all', 'karma:live']
            },
            jsTest:     {
                files:   '<%= yeoman.test %>/spec/**/*.js',
                tasks:   ['newer:jshint:test', 'karma:live'],
                options: {
                    livereload: true,
                    nospawn:    false
                }
            },
            haml:       {
                files: '<%= yeoman.app %>/**/*.haml',
                tasks: ['newer:haml:dist', 'wiredep']
            },
            less:       {
                files: '<%= yeoman.app %>/styles/**/*.less',
                tasks: 'less:dist'
            },
            gruntfile:  {
                files: 'Gruntfile.js'
            },
            livereload: {
                files: [
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        ngconstant:    {
            options: {
                name:      'config',
                dest:      '<%= yeoman.tmp %>/scripts/config.js',
                constants: {
                    facebookConfig: {
                        appId:     process.env.FB_APP_ID || '721263977929363',
                        namespace: process.env.FB_NAMESPACE || 'mercher_local'
                    }
                },
                values:    {
                    debug: true
                }
            },
            dist:    {
            }
        },

        // Compiles HAML to HTML
        haml:          {
            options: {
                format: 'html5'
            },
            dist:    {
                expand: true,
                cwd:    '<%= yeoman.app %>',
                src:    '**/*.haml',
                dest:   '<%= yeoman.tmp %>',
                ext:    '.html'
            }
        },

        // Compiles LESS to CSS
        less:          {
            dist: {
                expand: true,
                cwd:    '<%= yeoman.app %>/styles',
                src:    'main.less',
                dest:   '<%= yeoman.tmp %>/styles',
                ext:    '.css'
            }
        },

        // The actual grunt server settings
        connect:       {
            options:    {
                port:       9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname:   'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open:       true,
                    middleware: function (connect) {
                        return [
                            modRewrite(['!\\.html|\\.js|\\.svg|\\.css|\\.png$ /index.html [L]']),
                            connect.static(appConfig.tmp),
                            connect().use(
                                '/fonts',
                                connect.static('./bower_components/bootstrap/fonts')
                            ),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            test:       {
                options: {
                    port:       9001,
                    middleware: function (connect) {
                        return [
                            connect.static(appConfig.tmp),
                            connect.static(appConfig.test),
                            connect().use(
                                '/fonts',
                                connect.static('./bower_components/bootstrap/fonts')
                            ),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist:       {
                options: {
                    open: true,
                    base: '<%= yeoman.dist %>'
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint:        {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all:     {
                src: [
                    'Gruntfile.js',
                    '<%= yeoman.app %>/scripts/{,*/}*.js'
                ]
            },
            test:    {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src:     ['test/spec/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean:         {
            dist:   {
                files: [
                    {
                        dot: true,
                        src: [
                            '<%= yeoman.tmp %>',
                            '<%= yeoman.dist %>/{,*/}*',
                            '!<%= yeoman.dist %>/.git*'
                        ]
                    }
                ]
            },
            server: '<%= yeoman.tmp %>'
        },

        // Add vendor prefixed styles
        autoprefixer:  {
            options: {
                browsers: ['last 1 version']
            },
            dist:    {
                files: [
                    {
                        expand: true,
                        cwd:    '<%= yeoman.tmp %>/styles/',
                        src:    '{,*/}*.css',
                        dest:   '<%= yeoman.tmp %>/styles/'
                    }
                ]
            }
        },

        // Automatically inject Bower components into the app
        wiredep:       {
            app:     {
                src:        ['<%= yeoman.tmp %>/index.html'],
                ignorePath: /..\//,
                exclude:    [
                    'bower_components/es5-shim/es5-shim.js',
                    'bower_components/json3/lib/json3.js',
                    'bower_components/bootstrap/dist/css/bootstrap.css'
                ]
            }
        },

        // Renames files for browser caching purposes
        filerev:       {
            dist: {
                src: [
                    '<%= yeoman.dist %>/scripts/{,*/}*.js',
                    '<%= yeoman.dist %>/styles/{,*/}*.css'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html:    '<%= yeoman.tmp %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>',
                flow: {
                    html: {
                        steps: {
                            js:  ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post:  {}
                    }
                }
            }
        },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin:        {
            html:    ['<%= yeoman.tmp %>/{,*/}*.html'],
            css:     ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/images']
            }
        },

        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd:    '<%= yeoman.app %>/images',
                        src:    '{,*/}*.{png,jpg,jpeg,gif}',
                        dest:   '<%= yeoman.dist %>/images'
                    }
                ]
            }
        },

        svgmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd:    '<%= yeoman.app %>/images',
                        src:    '{,*/}*.svg',
                        dest:   '<%= yeoman.dist %>/images'
                    }
                ]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace:        true,
                    conservativeCollapse:      true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA:   true,
                    removeOptionalTags:        true
                },
                files:   [
                    {
                        expand: true,
                        cwd:    '<%= yeoman.tmp %>',
                        src:    ['*.html', 'views/{,*/}*.html'],
                        dest:   '<%= yeoman.dist %>'
                    }
                ]
            }
        },

        // ngmin tries to make the code safe for minification automatically by
        // using the Angular long form for dependency injection. It doesn't work on
        // things like resolve or inject so those have to be done manually.
        ngmin:   {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd:    '<%= yeoman.tmp %>/concat/scripts',
                        src:    '*.js',
                        dest:   '<%= yeoman.tmp %>/concat/scripts'
                    }
                ]
            }
        },

        copy:       {
            dist: {
                files: [
                    {
                        expand: true,
                        dot:    true,
                        cwd:    '<%= yeoman.app %>',
                        dest:   '<%= yeoman.dist %>',
                        src:    [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            'images/{,*/}*.{webp}',
                            'fonts/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd:    '<%= yeoman.tmp %>/images',
                        dest:   '<%= yeoman.dist %>/images',
                        src:    ['generated/*']
                    },
                    {
                        expand: true,
                        cwd:    'bower_components/bootstrap/dist',
                        src:    'fonts/*',
                        dest:   '<%= yeoman.dist %>'
                    }
                ]
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'haml:dist',
                'less:dist',
                'ngconstant:dist'
            ],
            test:   [
                'haml:dist',
                'less:dist',
                'ngconstant:dist'
            ],
            dist:   [
                'haml:dist',
                'less:dist',
                'imagemin',
                'svgmin',
                'ngconstant:dist'
            ]
        },

        // Test settings
        karma:      {
            options:    {
                configFile: '<%= yeoman.test %>/karma.conf.js',
                singleRun:  true,
                autoWatch:  false,
                browsers:   ['PhantomJS'],
                logLevel:   'INFO'
            },
            live:       {
                coverageReporter: {
                    type: 'html',
                    dir:  'coverage/'
                }
            },
            continuous: {
                logLevel:         'ERROR',
                coverageReporter: {
                    reporters: [
                        {
                            type: 'html',
                            dir:  'coverage/'
                        },
                        {
                            type: 'teamcity'
                        }
                    ]
                }
            }
        }
    });


    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'wiredep',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'connect:test',
        'karma:continuous'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'concurrent:dist',
        'wiredep',
        'useminPrepare',
        'autoprefixer',
        'concat',
        'ngmin',
        'copy:dist',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
};
