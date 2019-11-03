const run = require('gulp-run-command').default;

/**
 * Create gulp task for building of testing library
 */
exports.build = (gulp, taskName, rootPath, confPath) => {
	gulp.task(taskName, run(`npm run build-node -- --conf=${confPath}`, {cwd: rootPath}));
};