module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		recess: {
			options: {
				compile: true
			},
			dist: {
				options: {
				  compress: true
				},
				files: {
					'_site/css/main.css': '_source/css/main.less',
				}
			}
		},

		watch: {
			scripts: {
				files: ['_source/css/main.less'],
				tasks: ['recess']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-recess');

	grunt.registerTask('default', ['recess']);
};
