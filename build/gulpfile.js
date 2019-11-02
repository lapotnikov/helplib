const path = require('path');
const fs = require('fs');
const minimist = require('minimist');
const gulp = require('gulp');

/**
 * Handling of shell parameters
 */
const argv = minimist(process.argv.slice(2), {
	string: ['eng', 'modules', 'namespace', 'dist', 'conf'],
	boolean: 'min',
	default: {
		eng: 'node',
		modules: '',
		namespace: '',
		dist: '',
		conf: '',
		min: null
	}
});

/**
 * Path handling
 */
const rootPath = path.resolve(__dirname, '../');

const configPath = argv.conf ? path.resolve(__dirname, argv.conf) : `./config/def-${argv.eng}.json`;
if(fs.existsSync(configPath) == false || (fs.statSync(configPath)).isFile() == false) {
	throw new TypeError(`The cfiguration file "${configPath}" is not exist"`);
}

const corePath = {src: '', name: '', dist: ''};
const modulePathList = [];

/**
 * Configuration handling
 */
const conf = require(configPath);

conf.namespace = String(argv.namespace || conf.namespace).trim();
if((/^[a-zA-Z_\$][0-9a-zA-Z_\$]*$/u).test(conf.namespace) === false) {
	throw new TypeError(`The namespace "${conf.namespace}" is not valid"`);
}

conf.moduleNamespace = `${conf.namespace}Module`;
conf.eng = String(conf.eng).trim();
conf.min = Boolean(argv.min !== null ? argv.min : conf.min);
conf.dist = String(argv.dist || conf.dist).trim();
conf.modules = Array.from(argv.modules ? argv.modules.split(',') : conf.modules, itm => String(itm).trim());

conf.path = conf.path instanceof Object ? conf.path : {};
conf.path.core = path.resolve(rootPath, conf.path.core);
conf.path.dist = path.resolve(rootPath, conf.path.dist);
conf.path.modulesDist = conf.path.modulesDist ? path.resolve(rootPath, conf.path.modulesDist) : conf.path.dist;
conf.path.modules = Array.from(conf.path.modules, itm => path.resolve(rootPath, String(itm).trim()));

/**
 * Handling of core path
 */
(() => {
	if(fs.existsSync(conf.path.core) && (fs.statSync(conf.path.core)).isFile()) {
		let ext = path.extname(conf.path.core);
		let fileName = path.basename(conf.path.core, ext).trim();
		fileName = fileName === conf.dist ? fileName + '-core' : fileName;

		corePath.src = conf.path.core;
		corePath.name = fileName + (conf.min ? '.min' : '') + ext;
		corePath.dist = `${conf.path.dist}/${corePath.name}`;
	} else {
		throw new TypeError(`The core file "${conf.path.core}" is not exist"`);
	}
})();

/**
 * Handling of modules path
 */
(() => {
	let moduleList = [];

	conf.path.modules.forEach((path) => {
		if(fs.existsSync(path) && (fs.statSync(path)).isDirectory()) {
			moduleList = moduleList.concat(fs.readdirSync(path)
				.map(file => `${path}/${file}`)
				.filter(file => (fs.statSync(file)).isFile())
			);
		}
	});

	conf.modules.forEach((module) => {
		let file = moduleList.find(file => path.basename(file) === `${module}.js`);
		if(file) {
			let ext = path.extname(conf.path.core);
			let fileName = path.basename(file, ext).trim() + (conf.min ? '.min' : '') + ext;
			modulePathList.push({
				src: file,
				name: fileName,
				dist: `${conf.path.modulesDist}/${fileName}`
			});
		} else {
			throw new TypeError(`The module "${module}" is not exist"`);
		}
	});
})();

/**
 * Handling of gulp building tasks
 */
const common = require('./tasks/common.js');
const builder = require(`./tasks/${conf.eng}.js`);

builder.buildCore(gulp, 'build-core', conf.path.dist, corePath, conf);
builder.buildModules(gulp, 'build-modules', conf.path.modulesDist, modulePathList, conf);

switch(conf.eng) {
	case 'node':
		common.cleanDir(gulp, 'clean-dist', conf.path.dist);
		builder.buildMain(gulp, 'build-main', conf.path.dist, corePath, modulePathList, conf.dist + '.js', conf);

		exports.default = gulp.series(
			'clean-dist',
			gulp.parallel('build-core', 'build-modules', 'build-main')
		);

		break;
	case 'es6': {
		let mainFileName = conf.dist + (conf.min ? '.min' : '') + '.js';

		common.removeItem(gulp, 'clean-dist', mainFileName);
		common.removeItem(gulp, 'remove-core', corePath.dist);
		common.removeItem(gulp, 'remove-modules', conf.path.modulesDist);
		builder.buildMain(gulp, 'build-main', conf.path.dist, corePath, modulePathList, mainFileName, conf);
		builder.concatMain(gulp, 'concat-main', conf.path.dist, mainFileName, conf);

		exports.default = gulp.series(
			'clean-dist',
			gulp.parallel('build-core', 'build-modules', 'build-main'),
			'concat-main',
			'remove-core',
			'remove-modules'
		);

		break;
	}
}