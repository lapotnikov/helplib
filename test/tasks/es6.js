const shell = require('gulp-shell');
const open = require('gulp-open');
const mergeStream = require('merge-stream');
const slash = require('slash');

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
	gulp.task(taskName, (callback) => {
		if(conf.clients.length > 0) {
			let streams = [];
			for(let client of conf.clients) {
				streams.push(
					gulp.src(rootFilePath, {read: false})
						.pipe(open({uri: `file:///${slash(rootFilePath)}`, app: client}))
				);
			}

			return mergeStream.apply(mergeStream, streams);
		} else {
			callback();
		}
	});
};