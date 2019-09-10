const path = require('path');
//const rimraf = require('rimraf');
//const mergeStream = require('merge-stream');
const minimist = require('minimist');

const gulp = require('gulp');
//const gulpif = require('gulp-if');
//const minify = require('gulp-minify');
//const concat = require('gulp-concat');
//const cssnano = require('gulp-cssnano');
//const jsonminify = require('gulp-jsonminify');
//const embedSvg = require('gulp-embed-svg');
//const svgmin = require('gulp-svgmin');
//const foreach = require('gulp-foreach');
//const rename = require("gulp-rename");
//const template = require('gulp-template');
//const fileinclude = require('gulp-file-include');
//const htmlmin = require('gulp-htmlmin');
//const zip = require('gulp-zip');

//Init command arguments

const argv = minimist(process.argv.slice(2), {
	//string: ['app', 'state'],
	//default: {app: 'site', 'state': 'dev'}
});

console.log(argv);
exit();

// Init config files

const jsFiles = require(`./config/js-${argv.app}.json`);
const cssFiles = require(`./config/css-${argv.app}.json`);
const dataFiles = require(`./config/data-${argv.app}.json`);
const stateDataFiles = require(`./config/data-${argv.state}.json`);
const htmlFiles = require(`./config/html-${argv.app}.json`);

// Init path

const rootPath = path.resolve(__dirname, '../');
const buildPath = `build/${argv.state}/${argv.app}`;
const publicPath = {root: '', js: '/js', css: '/css'};

for(let dir in Object.assign({}, dataFiles, stateDataFiles, htmlFiles)) {
	if(dir !== '.') {
		publicPath[dir] = `${publicPath.root}/${dir}`;
	}
}

// Init template vars

const pjson = require(`./package.json`);
const tplVars = {
	dir: publicPath,
	title: pjson.title,
	description: pjson.description,
	version: pjson.version,
	state: argv.state === 'prod' ? 'prod' : 'dev'
};

// Init gulp clean task

gulp.task('clean', (callback) => {
	rimraf(path.resolve(rootPath, `${buildPath}/*`), callback);
});

// Init gulp packing task

gulp.task('packing', () => {
	return gulp.src(`${buildPath}/**`, {cwd: rootPath})
		.on('error', error => console.error(error))
		.pipe(gulpif(argv.state === 'prod', zip(`v.${pjson.version}.zip`, {compress: true})))
		.pipe(gulp.dest(buildPath, {cwd: rootPath}));
});

// Init gulp js task

gulp.task('build-js-files', () => {
	var streams = new Array();
	var monifyConf = {ext: {min: '.js'}, noSource: true, preserveComments: 'some'};

	for(let resultFile in jsFiles) {
		streams.push(
			gulp.src(jsFiles[resultFile], {cwd: rootPath})
				.on('error', error => console.error(error))
				.pipe(template(tplVars, {interpolate: /<%=([\s\S]+?)%>/g }))
				.pipe(gulpif(argv.state === 'prod', minify(monifyConf)))
				.pipe(concat(resultFile))
				.pipe(gulp.dest(`${buildPath}/${publicPath.js}`, {cwd: rootPath}))
		);
	}

	return mergeStream.apply(mergeStream, streams);
});

// Init gulp css task

gulp.task('build-css-files', () => {
	var streams = new Array();
	for(let resultFile in cssFiles) {
		streams.push(
			gulp.src(cssFiles[resultFile], {cwd: rootPath})
				.on('error', error => console.error(error))
				.pipe(template(tplVars, {interpolate: /<%=([\s\S]+?)%>/g }))
				.pipe(gulpif(argv.state === 'prod', cssnano({discardUnused: false, zindex: false})))
				.pipe(concat(resultFile))
				.pipe(gulp.dest(`${buildPath}/${publicPath.css}`, {cwd: rootPath}))
		);
	}

	return mergeStream.apply(mergeStream, streams);
});

// Init gulp data files task

gulp.task('build-data-files', () => {
	var streams = new Array();
	var stremListener = (stream, file) => {
		let ext = path.extname(file.path);
		switch(ext) {
			case '.json':
				stream.pipe(template(tplVars, {interpolate: /<%=([\s\S]+?)%>/g }));
				if(argv.state === 'prod') {
					stream.pipe(jsonminify());
				}
			break;

			case '.svg':
				if(argv.state === 'prod') {
					stream.pipe(svgmin());
				}
			break;
		}

		return stream;
	};

	for(let resultDir in dataFiles) {
		streams.push(
			gulp.src(dataFiles[resultDir], {cwd: rootPath})
				.on('error', error => console.error(error))
				.pipe(foreach(stremListener))
				.pipe(gulp.dest(`${buildPath}/${resultDir}`, {cwd: rootPath}))
		);
	}

	for(let resultDir in stateDataFiles) {
		for(let resultFile in stateDataFiles[resultDir]) {
			streams.push(
				gulp.src(stateDataFiles[resultDir][resultFile], {cwd: rootPath})
					.on('error', error => console.log(error))
					.pipe(foreach(stremListener))
					.pipe(rename(resultFile))
					.pipe(gulp.dest(`${buildPath}/${resultDir}`, {cwd: rootPath}))
			);
		}
	}

	return mergeStream.apply(mergeStream, streams);
});

// Init gulp html task

gulp.task('build-html-files', () => {
	var streams = new Array();
	for(let resultDir in htmlFiles) {
		streams.push(
			gulp.src(htmlFiles[resultDir], {cwd: rootPath})
				.on('error', error => console.error(error))
				.pipe(fileinclude({prefix: '<% ', suffix: ' %>', basepath: rootPath}))
				.pipe(template(tplVars, {interpolate: /<%=([\s\S]+?)%>/g }))
				.pipe(embedSvg({root: `${rootPath}/${buildPath}`}))
				.pipe(gulpif(argv.state === 'prod', htmlmin({collapseWhitespace: true})))
				.pipe(gulp.dest(`${buildPath}/${resultDir}`, {cwd: rootPath}))
		);
	}

	return mergeStream.apply(mergeStream, streams);
});

// Init gulp watch task

const watcherList = new Array();
const exit = () => {
	for(let i in watcherList) {
		watcherList[i].close();
	}

	watcherList.length = 0;
};

process.on('exit', exit);
process.on('SIGINT', exit);
process.on('uncaughtException', exit);

gulp.task('watch', () => {
	var jsList = new Array();
	var cssList = new Array();
	var dataList = new Array();
	var htmlList = ['./common/tpl/**', `./${argv.app}/tpl/**`];

	var fillList = (list, source) => {
		for(let i in source) {
			list = list.concat(source[i]);
		}

		return list;
	};

	jsList = fillList(jsList, jsFiles);
	cssList = fillList(cssList, cssFiles);
	htmlList = fillList(htmlList, htmlFiles);
	dataList = fillList(dataList, dataFiles);
	for(let i in stateDataFiles) {
		for(let j in stateDataFiles[i]) {
			dataList = dataList.concat(stateDataFiles[i][j]);
		}
	}

	watcherList.push(gulp.watch(jsList, {cwd: rootPath}, gulp.series('build-js-files')));
	watcherList.push(gulp.watch(cssList, {cwd: rootPath}, gulp.series('build-css-files')));
	watcherList.push(gulp.watch(dataList, {cwd: rootPath}, gulp.series('build-data-files')));
	watcherList.push(gulp.watch(htmlList, {cwd: rootPath}, gulp.series('build-html-files')));
});

// Init gulp default task

exports.default = argv.state === 'prod' ?
	gulp.series('clean', gulp.parallel('build-js-files', 'build-css-files', 'build-data-files'), 'build-html-files', 'packing') :
	gulp.series('clean', gulp.parallel('build-js-files', 'build-css-files', 'build-data-files'), 'build-html-files');

