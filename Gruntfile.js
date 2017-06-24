module.exports = function (grunt) {

  grunt.initConfig({
    cucumberjs: {
      files: 'test/features',
      options: {
        steps: 'test/step_definitions',
        format: 'pretty'
      }
    }
  });

  grunt.loadNpmTasks('grunt-cucumber');

  grunt.registerTask('default', ['cucumberjs']);
};
