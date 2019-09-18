const path = require('path');
const stream = require('stream');
const mergeStream = require('merge-stream');
const slash = require('slash');
const rename = require("gulp-rename");
const template = require('gulp-template');
const file = require('gulp-file');
const minify = require('gulp-minify');
const gulpif = require('gulp-if');

const templateConf = {interpolate: /\$([0-9a-zA-Z\._]+?)\$/g};
const monifyConf = {
	ext: {min: '.js'},
	noSource: true,
	preserveComments: 'some',
	mangle: {keep_classnames: true},
	compress: {keep_classnames: true}
};

/**
 * Create gulp task for building of core file
 */
exports.buildCore = (gulp, taskName, distPath, corePath, conf) => {
	gulp.task(taskName, () => {
		return gulp.src(corePath.src)
			.on('error', error => console.error(error))
			.pipe(template(conf, templateConf))
			.pipe(gulpif(conf.min, minify(monifyConf)))
			.pipe(rename(corePath.name))
			.pipe(gulp.dest(distPath));
	});
};

/**
 * Create gulp task for modules building
 */
exports.buildModules = (gulp, taskName, distPath, modulePathList, conf) => {
	gulp.task(taskName, () => {
		let streams = [];

		for(let modulePath of modulePathList) {
			streams.push(
				gulp.src(modulePath.src)
					.on('error', error => console.error(error))
					.pipe(template(conf, templateConf))
					.pipe(gulpif(conf.min, minify(monifyConf)))
					.pipe(rename(modulePath.name))
					.pipe(gulp.dest(distPath))
			);
		}

		return mergeStream.apply(mergeStream, streams);
	});
};

/**
 * Create gulp task for building of main file
 */
exports.buildMain = (gulp, taskName, distPath, corePath, modulePathList, distFileName, conf) => {
	let content = `const $namespace$ = require('./${slash(path.relative(distPath, corePath.dist))}');`;
	for(let modulePath of modulePathList) {
		content += "\r\n" + `require('./${slash(path.relative(distPath, modulePath.dist))}')($namespace$);`;
	}

	content += "\r\n\r\n" + 'module.exports = $namespace$;';

	gulp.task(taskName, () => {
		return file(distFileName, content, {src: true})
			.pipe(template(conf, templateConf))
			.pipe(gulp.dest(distPath));
	});
};