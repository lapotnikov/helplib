/**
 * @author Lapotnikov Artyom <conjecture.lapotnikov@gmail.com>
 * @copyright (c) 2018, Conjecture
 */

var crypto = require('crypto');
var comHelpers = require('./common.js');

module.exports.md5 = function(val) {
	return crypto.createHash('md5').update(module.exports.check(val)).digest('hex');
};

module.exports.uniqid = function(prefix) {
	var m = new Date().getTime();
	var k = Math.floor(Math.random() * 1000000);
	prefix = prefix ? (module.exports.check(prefix) + '-') : '';

	return prefix + module.exports.md5(String(m) + String(k));
};