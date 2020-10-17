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



	helpLib.regHelper('str', 'decodeHtmlEntity', null, function(str) {
		str = this.str.check(str);
		return str.replace(/&#(\d+);/g, (match, dec) => {
			return String.fromCharCode(dec);
		});
	});

	helpLib.regHelper('str', 'encodeHtmlEntity', null, function(str) {
		str = this.str.check(str);
		let buf = [];
		for(let i = str.length - 1; i >= 0; i--) {
			buf.unshift(`&#${str[i].charCodeAt()};`);
		}

		return buf.join('');
	});