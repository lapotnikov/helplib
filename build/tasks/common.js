const rimraf = require('rimraf');

/**
 * Create gulp task of cleaning directory
 */
exports.cleanDir = (gulp, taskName, path) => {
	gulp.task(taskName, (callback) => {
		rimraf(`${path}/*`, callback);
	});
};

/**
 * Create gulp task of remove directory or file and all of its content
 */
exports.removeItem = (gulp, taskName, path) => {
	console.log(path);
	gulp.task(taskName, (callback) => {
		rimraf(path, callback);
	});
};