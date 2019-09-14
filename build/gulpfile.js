const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const mergeStream = require('merge-stream');
const minimist = require('minimist');
const browserify = require('browserify');

const gulp = require('gulp');
const gulpif = require('gulp-if');
//const minify = require('gulp-minify');
const rename = require("gulp-rename");
const tap = require('gulp-tap');
//const foreach = require('gulp-foreach');
const template = require('gulp-template');

//const zip = require('gulp-zip');

//Init command arguments

const argv = minimist(process.argv.slice(2), {
	string: ['eng', 'modules', 'namespace', 'dist'],
	boolean: 'min',
	default: {
		eng: 'node',
		modules: '',
		namespace: '',
		dist: '',
		min: null
	}
});

// Init path

const rootPath = path.resolve(__dirname, '../');
const configPath = `./config/def-${argv.eng}${argv.min ? '.min' : ''}.json`;
const modulePathList = [];

if(fs.existsSync(configPath) == false || (fs.statSync(configPath)).isFile() == false) {
	throw new TypeError(`The cfiguration file "${configPath}" is not exist"`);
}

// Init config files

const vars = require(configPath);

vars.namespace = String(argv.namespace || vars.namespace).trim();
vars.eng = String(vars.eng).trim();
vars.min = Boolean(argv.min !== null ? argv.min : vars.min);

vars.dist = String(argv.dist || vars.dist).trim();
vars.modules = Array.from(argv.modules ? argv.modules.split(',') : vars.modules, itm => String(itm).trim());

vars.path = vars.path instanceof Object ? vars.path : {};
vars.path.dist = path.resolve(rootPath, vars.path.dist);
vars.path.modules = Array.from(vars.path.modules, itm => path.resolve(rootPath, String(itm).trim()));

if((/^[a-zA-Z_\$][0-9a-zA-Z_\$]*$/u).test(vars.namespace) === false) {
	throw new TypeError(`The namespace "${vars.namespace}" is not valid"`);
}

(() => {
	let moduleList = [];

	vars.path.modules.forEach((path) => {
		if(fs.existsSync(path) && (fs.statSync(path)).isDirectory()) {
			moduleList = moduleList.concat(fs.readdirSync(path)
				.filter(file => (fs.statSync(`${path}/${file}`)).isFile())
				.map(file => [file, `${path}/${file}`])
			);
		}
	});

	vars.modules.forEach((module) => {
		let itm = moduleList.find(itm => itm[0] === `${module}.js`);
		if(itm) {
			modulePathList.push([itm[1], `${vars.dist}-${module}.js`]);
		} else {
			throw new TypeError(`The module "${module}" is not exist"`);
		}
	});
})();

// Init gulp clean task

gulp.task('clean', (callback) => {
	rimraf(`${vars.path.dist}/*`, callback);
});

// Init gulp js task

gulp.task('build-js-modules', () => {
	let streams = new Array();
	//let monifyConf = {ext: {min: '.js'}, noSource: true, preserveComments: 'some'};

	for(let module of modulePathList) {
		streams.push(
			gulp.src(module[0], {cwd: rootPath})
				.on('error', error => console.error(error))
				.pipe(template(vars, {interpolate: /\$([a-zA-Z\._]+?)\$/g}))
				.pipe(gulpif(vars.eng === 'es6', tap((file) => {
					file.contents = browserify(file.path, {debug: false, bundleExternal: false, standalone: vars.namespace}).bundle();
				})))
				.pipe(rename(module[1]))
				.pipe(gulp.dest(vars.path.dist, {cwd: rootPath}))
		);
	}

	return mergeStream.apply(mergeStream, streams);
});

// Init gulp default task

exports.default = gulp.series('clean', gulp.parallel('build-js-modules'));

//console.log(modulePathList);
//process.exit();
/*
exports.default = argv.state === 'prod' ?
	gulp.series('clean', gulp.parallel('build-js-files', 'build-css-files', 'build-data-files'), 'build-html-files', 'packing') :
	gulp.series('clean', gulp.parallel('build-js-files', 'build-css-files', 'build-data-files'), 'build-html-files');
	*/