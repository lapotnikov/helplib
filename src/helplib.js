const $namespace$ = (() => {
	const NAME_RESERVLIST = [];
	const NAME_COMMONLIB = '_common';
	const NAME_ROOTLIB = '.';

	class HelpLib {
		constructor() {
			this.isInitialize = false;
			this.libList = {};

			NAME_RESERVLIST.push(NAME_COMMONLIB);
			for(let name in this) {
				NAME_RESERVLIST.push(name);
			}
		}

		isInit() {
			return this.isInitialize;
		}

		regHelper(lib, func, dependence, callback) {
			lib = lib === null || lib === undefined ? NAME_COMMONLIB : String(lib).trim();
			lib = lib === NAME_ROOTLIB ? NAME_COMMONLIB : lib;
			func = String(func).trim();

			if(func.length == 0) {
				throw new TypeError('The helper function name is empty');
			}
			if(typeof callback !== 'function') {
				throw new TypeError('The callback of helper is not a function');
			}

			if(lib === NAME_COMMONLIB) {
				if(NAME_RESERVLIST.indexOf(func) >= 0) {
					throw new TypeError(`The helper function name "${func}" is reserved`);
				} else if(this.libList[lib] !== undefined && this.libList[lib][func] !== undefined) {
					throw new TypeError(`The helper function name "${func}" is already exist`);
				}
			} else if(NAME_RESERVLIST.indexOf(lib) >= 0) {
				throw new TypeError(`The library name "${lib}" is reserved`);
			} else if(this.libList[lib] !== undefined && this.libList[lib][func] !== undefined) {
				throw new TypeError(`The helper function name "${lib}.${func}" is already exist`);
			}

			if(this.isInitialize && dependence !== null && typeof dependence === 'object') {
				checkDependenceList.call(this, lib, func, dependence);
			}

			this.libList[lib] = this.libList[lib] === undefined ? {} : this.libList[lib];
			this.libList[lib][func] = {
				callback: callback.bind(this),
				dependence: dependence !== null && typeof dependence === 'object' ? dependence : null
			};

			if(this.isInitialize) {
				if(lib === NAME_COMMONLIB) {
					this[func] = this.libList[lib][func].callback;
				} else {
					this[lib] = this[lib] === undefined ? {} : this[lib];
					this[lib][func] = this.libList[lib][func].callback;
				}
			}
		}

		init() {
			if(this.isInitialize === false) {
				for(let lib in this.libList) {
					for(let func in this.libList[lib]) {
						checkDependenceList.call(this, lib, func, this.libList[lib][func].dependence);

						if(lib === NAME_COMMONLIB) {
							this[func] = this.libList[lib][func].callback;
						} else {
							this[lib] = this[lib] === undefined ? {} : this[lib];
							this[lib][func] = this.libList[lib][func].callback;
						}
					}
				}

				this.isInitialize = true;
			}
		}
	}

	function checkDependenceList(lib, func, dependence) {
		if(dependence !== null) {
			for(let depLib in dependence) {
				if(checkDependence.call(this, depLib, dependence[depLib]) === false) {
					let fullName = lib === NAME_COMMONLIB ? func : lib + '.' + func;
					throw new ReferenceError(`Not all dependencies are met for the helper function "${fullName}"`);
				}
			}
		}
	}

	function checkDependence(lib, funcs) {
		lib = String(lib).trim();
		lib = lib === NAME_ROOTLIB ? NAME_COMMONLIB : lib;

		if(this.libList[lib] === undefined) {
			return false;
		}

		funcs = String(funcs).split(',');
		for(let i in funcs) {
			if(this.libList[lib][funcs[i].trim()] === undefined) {
				return false;
			}
		}

		return true;
	}

	return new HelpLib();
})();

module.exports = $namespace$;