const helpLib = (() => {
	const NAME_RESERVLIST = [];

	class HelLib {
		construct() {
			for(let name in this) {
				NAME_RESERVLIST.push(name);
			}
		}

		regHelper(lib, func, dependence, callback) {
			lib = this.isSet(lib) ? String(lib).trim() : '';
			func = String(func).trim();

			if(this.isEmpty(func)) {
				throw new TypeError('The helper function name is empty');
			}
			if(typeof callback !== 'function') {
				throw new TypeError('The callback of helper is not a function');
			}

			if(dependence !== null && typeof dependence === 'object') {
				for(let depLib in dependence) {
					if(this.checkDependence(depLib, dependence[depLib]) === false) {
						let funcName = this.isEmpty(lib) ? func : lib + '.' + func;
						throw new ReferenceError(`Not all dependencies are met for the helper function "${funcName}"`);
					}
				}
			}

			if(this.isEmpty(lib)) {
				if(NAME_RESERVLIST.indexOf(func) >= 0) {
					throw new TypeError(`This helper function name "${func}" is reserved`);
				} else {
					this[func] = callback.bind(this);
				}
			} else if(NAME_RESERVLIST.indexOf(lib) >= 0) {
				throw new TypeError(`This helper library name "${lib}" is reserved`);
			} else {
				this[lib] = this[lib] === undefined ? new Object() : this[lib];
				this[lib][func]	= callback.bind(this);
			}
		}

		checkDependence(lib, funcs) {
			lib = this.isSet(lib) ? this[String(lib)] : this;
			if(lib === undefined) {
				return false;
			}

			funcs = String(funcs).split(',');
			for(let i in funcs) {
				if(lib[funcs[i].trim()] === undefined) {
					return false;
				}
			}

			return true;
		}

		isSet(val) {
			return val === null || val === undefined ? false : true;
		}

		isScalar(val) {
			return (/boolean|number|string/).test(typeof val);
		}

		isEmpty(val) {
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
		}

		isInstance(obj, cls, onlyFirstLevel = false) {
			if(this.isSet(cls)) {
				cls = null;
			} else {
				let clsType = typeof cls;
				switch(clsType) {
					case 'string': cls = cls.trim(); break
					case 'object': cls = cls.constructor.name; break
					case 'function': cls = cls.name; break
					default: cls = null;
				}
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
		}
	}

	return new HelLib;
})();

module.exports = helpLib;