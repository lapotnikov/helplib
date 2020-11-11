/**
 * The date module of helLib library
 * @module  date
 * @author Artyom Lapotnikov <lapotnikov@gmail.com>
 * @copyright Artyom Lapotnikov
 * @license MIT
 * @version 1.0.0
 */

const $moduleNamespace$ = (helpLib) => {

	/**
	 * Function of checking the "date" parameter to object of Date class
	 * @function is
	 * @param {*} date - Checking parameter
	 * @return {boolean} Result of checking
	 * @this $namespace$
	 */
	helpLib.regHelper('date', 'is', null, function(date) {
		if(Object.prototype.toString.call(date) === '[object Date]') {
			return isNaN(date) ? false : true;
		}

		return false;
	});

	/**
	 * Function convert the "date" parameter to Date object.
	 * @function check
	 * @param {*} date - Checking parameter
	 * @param {*} [defValue = new Date()] - Default value
	 * @return {Date|*} The date object or Default value
	 * @requires module:common~isInstance
	 * @this $namespace$
	 */
	helpLib.regHelper('date', 'check', {'.': 'isInstance', str: 'is, trim', num: 'isFinite, check'}, function(date, defValue = new Date()) {
		if(this.isInstance(date, 'Date', true)) {
			return isNaN(date) ? defValue : date;
		} else if(this.num.isFinite(date)) {
			date = new Date(this.num.check(date));
			return isNaN(date) ? defValue : date;
		} else if(this.str.is(date)) {
			date = new Date(this.str.trim(date));
			return isNaN(date) ? defValue : date;
		} else {
			return defValue;
		}
	});
};

module.exports = $moduleNamespace$;