/**
 * The gulp cofiguration file to run documentation build
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
	string: ['eng', 'conf'],
	default: {eng: 'node', conf: ''}
});

/**
 * Path handling
 */
const rootPath = path.resolve(__dirname, '../');

const configPath = argv.conf ? path.resolve(__dirname, argv.conf) : `./config/docs-${argv.eng}.json`;
if(fs.existsSync(configPath) == false || (fs.statSync(configPath)).isFile() == false) {
	throw new TypeError(`The cfiguration file "${configPath}" is not exist"`);
}

/**
 * Configuration handling
 */
const conf = require(configPath);

conf.eng = String(conf.eng).trim();

conf.path = conf.path instanceof Object ? conf.path : {};
conf.path.root = path.resolve(rootPath, conf.path.root);
conf.path.dist = path.resolve(rootPath, conf.path.dist);

conf.path.buildConf = path.resolve(rootPath, conf.path.buildConf);
if(fs.existsSync(conf.path.buildConf) == false || (fs.statSync(conf.path.buildConf)).isFile() == false) {
	throw new TypeError(`The build configuration file "${conf.path.buildConf}" is not exist"`);
}

/**
 * JSDoc Configuration handling
 */
conf.path.jsDocConf = path.resolve(rootPath, conf.path.jsDocConf);
if(fs.existsSync(conf.path.jsDocConf) == false || (fs.statSync(conf.path.jsDocConf)).isFile() == false) {
	throw new TypeError(`The JSDoc configuration file "${conf.path.jsDocConf}" is not exist"`);
}

conf.jsDocConf = require(conf.path.jsDocConf);
conf.jsDocConf.opts.destination = conf.path.root;

/**
 * Handling of gulp documents tasks
 */
const tasks = require(`./tasks/common.js`);
tasks.cleanDir(gulp, 'cleanDir', conf.path.root);
tasks.build(gulp, 'build', rootPath, conf);
tasks.doc(gulp, 'doc', rootPath, conf);

exports.default = gulp.series(gulp.parallel('build', 'cleanDir'), 'doc');