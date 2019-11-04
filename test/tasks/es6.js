const shell = require('gulp-shell');

/**
 * Create gulp task for building of testing library
 */
exports.build = (gulp, taskName, rootPath, conf) => {
	gulp.task(taskName,	shell.task(
		`npm run build-es6 -- --conf="${conf.path.buildConf}" ${conf.min ? '--min' : ''}`,
		{cwd: rootPath, quiet: true}
	));
};

/**
 * Create gulp task for testing of testing library
 */
exports.test = (gulp, taskName, rootFilePath, conf) => {
	gulp.task(taskName,  () => {
		return gulp.src(rootFilePath, {read: false, cwd: conf.path.root});
	});
};