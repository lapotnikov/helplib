/**
 * @author Lapotnikov Artyom <conjecture.lapotnikov@gmail.com>
 * @copyright (c) 2018, Conjecture
 */

var comHelpers = require('./common.js');
var numHelpers = require('./number.js');
var strHelpers = require('./string.js');
var arrHelpers = require('./array.js');
var objHelpers = require('./object.js');


module.exports.inSize = function(str, min, max) {
	var ret = true;
	str = strHelpers.check(str);

	if(comHelpers.isset(min)) {
		ret = str.length < numHelpers.check(min) ? false : ret;
	}
	if(comHelpers.isset(max)) {
		ret = str.length > numHelpers.check(max) ? false : ret;
	}

	return ret;
};