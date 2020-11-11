/**
 * The common gulp tasks to build of all libraries
 * @author Artyom Lapotnikov <lapotnikov@gmail.com>
 * @copyright Artyom Lapotnikov
 * @license MIT
 * @version 1.0
 */

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
	gulp.task(taskName, (callback) => {
		rimraf(path, callback);
	});
};