module.exports = function(grunt) {
    
    var plugins = [
        'grunt-contrib-qunit'
    ];
    
    plugins.forEach(function(plugin) {
        grunt.loadNpmTasks(plugin);    
    });
    
    grunt.initConfig({
        qunit: {
            all: [
                'ui/tests/*.html'
            ]
        }
    });
    
    grunt.registerTask('default', ['qunit']);
};