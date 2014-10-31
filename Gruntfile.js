module.exports = function(grunt) {
    
    var plugins = [
        'grunt-contrib-qunit',
        'grunt-contrib-copy'
    ];
    
    plugins.forEach(function(plugin) {
        grunt.loadNpmTasks(plugin);    
    });
    
    grunt.initConfig({
        qunit: {
            all: [
                'ui/tests/*.html'
            ]
        },
        
        copy: {
            main: {
                expand: true,
                cwd: 'ui/assets/',
                src: '**',
                dest: 'backend/assets/'
            }
        }
    });
    
    grunt.registerTask('default', ['copy', 'qunit']);
};