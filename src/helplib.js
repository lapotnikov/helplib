/**
 * The core of helLib library
 * @author Artyom Lapotnikov <lapotnikov@gmail.com>
 * @copyright Artyom Lapotnikov
 * @license MIT
 * @version 1.0.0
 */

/**
 * The object of HelpLib class
 * @type {HelpLib}
 * @global
 */
const $namespace$ = (() => {
	/**
	 * The list of reserved names
	 * <p>You can not add the module or function of common module with name that is contained in this list.
	 *
	 * @type {string[]}
	 * @constant
	 * @memberof HelpLib
	 * @private
	 */
	const NAME_RESERVLIST = [];
	/**
	 * The name of common module
	 * @type {string}
	 * @constant
	 * @default
	 * @memberof HelpLib
	 * @private
	 */
	const NAME_COMMONLIB = '_common';
	/**
	 * The name of root module
	 * @type {string}
	 * @constant
	 * @default
	 * @memberof HelpLib
	 * @private
	 */
	const NAME_ROOTLIB = '.';

	/**
	 * The core class of helLib library
	 * <p>This class provides the addition, storage and execution of modules and their functions.
	 * 
	 * @private
	 */
	class HelpLib {
		/**
		 * The constructor
		 */
		constructor() {
			this.isInitialize = false;
			this.modList = {};

			NAME_RESERVLIST.push(NAME_COMMONLIB);
			NAME_RESERVLIST.push.apply(NAME_RESERVLIST, getOwnPropertyList.call(this));
		}

		/**
		 * The isInit methed
		 * @return {boolean} Is init
		 */
		isInit() {
			return this.isInitialize;
		}

		/**
		 * The regHelper method
		 * @param {string} mod - The module name
		 * @param {string} func - The function name
		 * @param {object|null|undefined} dependence - The dependence of function
		 * @param {function} callback - The function
		 * @throws {TypeError} If the module name is not a string
		 */
		regHelper(mod, func, dependence, callback) {
			if(mod !== null && mod !== undefined && typeof mod !== 'string') {
				throw new TypeError('The module name is incorrect');
			}
			if(typeof func !== 'string') {
				throw new TypeError('The helper function name is incorrect');
			}
			if(dependence !== null && dependence !== undefined && typeof dependence !== 'object') {
				throw new TypeError('The dependence value is incorrect');
			}

			mod = mod === null || mod === undefined ? NAME_COMMONLIB : mod.trim();
			mod = mod.length == 0 ? NAME_COMMONLIB : mod;
			mod = mod === NAME_ROOTLIB ? NAME_COMMONLIB : mod;
			func = func.trim();

			if(func.length == 0) {
				throw new TypeError('The helper function name is empty');
			}
			if(typeof callback !== 'function') {
				throw new TypeError('The callback of helper is not a function');
			}

			if(mod === NAME_COMMONLIB) {
				if(NAME_RESERVLIST.indexOf(func) >= 0) {
					throw new TypeError(`The helper function name "${func}" is reserved`);
				} else if(this.modList[mod] !== undefined && this.modList[mod][func] !== undefined) {
					throw new TypeError(`The helper function name "${func}" is already exist`);
				}
			} else if(NAME_RESERVLIST.indexOf(mod) >= 0) {
				throw new TypeError(`The module name "${mod}" is reserved`);
			} else if(this.modList[mod] !== undefined && this.modList[mod][func] !== undefined) {
				throw new TypeError(`The helper function name "${mod}.${func}" is already exist`);
			}

			if(this.isInitialize && dependence !== null && dependence !== undefined) {
				checkDependenceList.call(this, mod, func, dependence);
			}

			this.modList[mod] = this.modList[mod] === undefined ? {} : this.modList[mod];
			this.modList[mod][func] = {
				callback: callback.bind(this),
				dependence: dependence !== null && dependence !== undefined ? dependence : null
			};

			if(this.isInitialize) {
				if(mod === NAME_COMMONLIB) {
					this[func] = this.modList[mod][func].callback;
				} else {
					this[mod] = this[mod] === undefined ? {} : this[mod];
					this[mod][func] = this.modList[mod][func].callback;
				}
			}
		}

		/**
		 * The init methed
		 */
		init() {
			if(this.isInitialize === false) {
				for(let mod in this.modList) {
					for(let func in this.modList[mod]) {
						checkDependenceList.call(this, mod, func, this.modList[mod][func].dependence);

						if(mod === NAME_COMMONLIB) {
							this[func] = this.modList[mod][func].callback;
						} else {
							this[mod] = this[mod] === undefined ? {} : this[mod];
							this[mod][func] = this.modList[mod][func].callback;
						}
					}
				}

				this.isInitialize = true;
			}
		}
	}

	/**
	 * The checkDependenceList methed
	 * @param {string} mod - The module name
	 * @param {string} func - The function name
	 * @param {object} dependence - The dependence of function
	 * @throws {ReferenceError} If not all dependencies are met for the helper function
	 * @memberof HelpLib#
	 * @private
	 */
	function checkDependenceList(mod, func, dependence) {
		if(dependence !== null) {
			for(let depLib in dependence) {
				if(checkDependence.call(this, depLib, dependence[depLib]) === false) {
					let fullName = mod === NAME_COMMONLIB ? func : mod + '.' + func;
					throw new ReferenceError(`Not all dependencies are met for the helper function "${fullName}"`);
				}
			}
		}
	}

	/**
	 * The checkDependenceList methed
	 * @param {string} mod - The module name
	 * @param {string} func - The functions name
	 * @return {boolean} The result of check
	 * @memberof HelpLib#
	 * @private
	 */
	function checkDependence(mod, funcs) {
		mod = String(mod).trim();
		mod = mod === NAME_ROOTLIB ? NAME_COMMONLIB : mod;
		funcs = String(funcs).trim();

		if(this.modList[mod] === undefined) {
			return false;
		}

		if(funcs.length > 0) {
			funcs = String(funcs).split(',');
			for(let i in funcs) {
				funcs[i] = funcs[i].trim();
				if(funcs[i].length > 0 && this.modList[mod][funcs[i]] === undefined) {
					return false;
				}
			}
		}

		return true;
	}

	/**
	 * The getOwnPropertyList methed
	 * @return {string[]} The list of properties
	 * @memberof HelpLib#
	 * @private
	 */
	function getOwnPropertyList() {
		let curObj = this;
		let propList = [];

		do {
			propList = propList.concat(Object.getOwnPropertyNames(curObj));
		} while((curObj = Object.getPrototypeOf(curObj)));

		return propList;
	}

	return new HelpLib();
})();

module.exports = $namespace$;