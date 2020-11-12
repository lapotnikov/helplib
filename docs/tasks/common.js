/**
 * Gulp tasks to documentation build
 * @author Artyom Lapotnikov <lapotnikov@gmail.com>
 * @copyright Artyom Lapotnikov
 * @license MIT
 * @version 1.0
 */

const shell = require('gulp-shell');
const jsdoc = require('gulp-jsdoc3');

/**
 * Create gulp task for building of helpLib library with jsDoc
 */
exports.build = (gulp, taskName, rootPath, conf) => {
	gulp.task(taskName,	shell.task(
		`npm run build-${conf.eng} -- --conf="${conf.path.buildConf}"`,
		{cwd: rootPath, quiet: true}
	));
};

/**
 * Create gulp task for documentation build
 */
exports.doc = (gulp, taskName, rootPath, conf) => {
	gulp.task(taskName, () => {
		return gulp.src(`${rootPath}/**/*.js`, {read: false, cwd: rootPath})
			.pipe(jsdoc(require(conf.path.jsDocConf)))
			.on('error', error => console.error(error));
	});
};