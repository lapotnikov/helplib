const rimraf = require('rimraf');

/**
 * Create gulp task of cleaning dist directory
 */
exports.clean = (gulp, taskName, distPath) => {
	gulp.task(taskName, (callback) => {
		rimraf(`${distPath}/*`, callback);
	});
};