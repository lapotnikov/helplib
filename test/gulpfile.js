/**
 * The gulp cofiguration file to run testing scripts
 * @author Artyom Lapotnikov <lapotnikov@gmail.com>
 * @copyright Artyom Lapotnikov
 * @license MIT
 * @version 1.0
 */

const path = require('path');
const fs = require('fs');
const minimist = require('minimist');
const gulp = require('gulp');

/**
 * Handling of shell parameters
 */
const argv = minimist(process.argv.slice(2), {
	string: ['eng', 'conf', 'clients'],
	boolean: ['min', 'testonly'],
	default: {
		eng: 'node',
		conf: '',
		clients: '',
		min: null,
		testonly: null
	}
});

/**
 * Path handling
 */
const rootPath = path.resolve(__dirname, '../');
let rootFile = '';

const configPath = argv.conf ? path.resolve(__dirname, argv.conf) : `./config/test-${argv.eng}.json`;
if(fs.existsSync(configPath) == false || (fs.statSync(configPath)).isFile() == false) {
	throw new TypeError(`The cfiguration file "${configPath}" is not exist"`);
}

/**
 * Configuration handling
 */
const conf = require(configPath);

conf.eng = String(conf.eng).trim();
conf.min = Boolean(argv.min !== null ? argv.min : conf.min);
conf.testonly = Boolean(argv.testonly !== null ? argv.testonly : conf.testonly);
conf.root = String(argv.root || conf.root).trim();
conf.clients = Array.from(argv.clients ? argv.clients.split(',') : conf.clients, itm => String(itm).trim());

conf.path = conf.path instanceof Object ? conf.path : {};
conf.path.root = path.resolve(rootPath, conf.path.root);

conf.path.buildConf = path.resolve(rootPath, conf.path.buildConf);
if(fs.existsSync(conf.path.buildConf) == false || (fs.statSync(conf.path.buildConf)).isFile() == false) {
	throw new TypeError(`The build configuration file "${conf.path.buildConf}" is not exist"`);
}

/**
 * Handling of root file path
 */
(() => {
	if(fs.existsSync(conf.path.root) && (fs.statSync(conf.path.root)).isDirectory()) {
		let rootFileName = conf.root + (conf.eng === 'es6' && conf.min ? '.min' : '') + (conf.eng === 'node' ? '.js' : '.html');
		rootFile = `${conf.path.root}/${rootFileName}`;

		if(fs.existsSync(rootFile) == false || (fs.statSync(rootFile)).isFile() == false) {
			throw new TypeError(`The root file "${rootFile}" is not exist"`);
		}
	} else {
		throw new TypeError(`The root directory "${conf.path.root}" is not exist"`);
	}
})();

/**
 * Handling of gulp testing tasks
 */
const tester = require(`./tasks/${conf.eng}.js`);
tester.test(gulp, 'test', rootFile, conf);

if(conf.testonly) {
	exports.default = gulp.series('test');
} else {
	tester.build(gulp, 'build', rootPath, conf);
	exports.default = gulp.series('build', 'test');
}