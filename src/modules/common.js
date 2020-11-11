/**
 * The common module of helLib library
 * @module common
 * @author Artyom Lapotnikov <lapotnikov@gmail.com>
 * @copyright Artyom Lapotnikov
 * @license MIT
 * @version 1.0.0
 */

const $moduleNamespace$ = (helpLib) => {

	/**
	 * Function of checking the value of "val" to exist
	 * @function isSet
	 * @alias isSetSet
	 * @param {*} val - Checking parameter
	 * @return {boolean} Result of checking
	 * @this $namespace$
	 */
	helpLib.regHelper('.', 'isSet', null, function(val) {
		return val === null || val === undefined ? false : true;
	});

	/**
	 * Function of checking the type of "val" parameter to scalar value
	 * @function isScalar
	 * @param {*} val - Checking parameter
	 * @return {boolean} Result of checking
	 * @this $namespace$
	 */
	helpLib.regHelper('.', 'isScalar', null, function(val) {
		return (/boolean|number|string/).test(typeof val);
	});

	/**
	 * Function of checking the value of "val" parameter to empty
	 * @function isEmpty
	 * @param {*} val - Checking parameter
	 * @return {boolean} Result of checking
	 * @this $namespace$
	 */
	helpLib.regHelper('.', 'isEmpty', null, function(val) {
		if(this.isSet(val) == false) {
			return true;
		} else {
			var type = typeof(val);
			switch(type) {
				case 'boolean': return val == false ? true : false;
				case 'number': return isNaN(val) || val == 0 ? true : false;
				case 'string': return val.trim().length == 0 ? true : false;
				case 'object': return Object.keys(val).length == 0 ? true : false;
				default: return false;
			}
		}
	});

	/**
	 * Function of checking the instance of "obj" parameter to "cls" parameter
	 * @function isInstance
	 * @param {object} obj - Checking object
	 * @param {object|function|string} cls - The class, or object of class, or name of class
	 * @param {boolean} onlyFirstLevel - Checking obly in first level
	 * @return {boolean} Result of checking
	 * @this $namespace$
	 */
	helpLib.regHelper('.', 'isInstance', null, function(obj, cls, onlyFirstLevel = false) {
		if(this.isSet(cls)) {
			let clsType = typeof cls;
			switch(clsType) {
				case 'string': cls = cls.trim(); break
				case 'object': cls = cls.constructor.name; break
				case 'function': cls = cls.name; break
				default: cls = null;
			}
		} else {
			cls = null;
		}

		if(typeof obj === 'object' && cls !== null) {
			while(obj !== null) {
				if(cls === obj.constructor.name) {
					return true;
				} else {
					obj = obj.__proto__;
				}

				if(onlyFirstLevel) {
					break;
				}
			}
		}

		return false;
	});
};

module.exports = $moduleNamespace$;