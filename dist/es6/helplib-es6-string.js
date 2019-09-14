(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.helLib = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = (() => {
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
},{}],2:[function(require,module,exports){
const $namespace$ = require('../helplib.js');

((helpLib) => {

	helpLib.regHelper('str', 'is', null, (str) => {
		return typeof str === 'string' ? true : false;
	});

	helpLib.regHelper('str', 'check', null, (str, defValue = '') => {
		return this.isSet(str) ? String(str) : defValue;
	});

	helpLib.regHelper('str', 'trim', null, (str) => {
		return this.str.check(str).trim();
	});

	helpLib.regHelper('str', 'clearDoubleSpace', null, (str) => {
		return this.str.check(str).replace(/]\s\s+/g, ' ');
	});

	helpLib.regHelper('str', 'ucFirst', null, (str) => {
		str = this.str.check(str);
		return str.length == 0 ? str : str[0].toUpperCase() + str.slice(1);
	});

	helpLib.regHelper('str', 'lcFirst', null, (str) => {
		str = this.str.check(str);
		return str.length == 0 ? str : str[0].toLowerCase() + str.slice(1);
	});

	helpLib.regHelper('str', 'reverse', null, (str) => {
		str = this.str.check(str);
		return str.split('').reverse().join('');
	});

	helpLib.regHelper('str', 'decodeHtmlEntity', null, (str) => {
		str = this.str.check(str);
		return str.replace(/&#(\d+);/g, (match, dec) => {
			return String.fromCharCode(dec);
		});
	});

	helpLib.regHelper('str', 'encodeHtmlEntity', null, (str) => {
		str = this.str.check(str);
		let buf = new Array();
		for(let i = str.length - 1; i >= 0; i--) {
			buf.unshift(`&#${str[i].charCodeAt()};`);
		}

		return buf.join('');
	});

	helpLib.regHelper('str', 'test', null, (str, regExp) => {
		try {
			regExp = regExp instanceof RegExp ? regExp : new RegExp(regExp);
			return regExp.test(this.str.check(str));
		} catch(excep) {
			return false;
		}
	});

	helpLib.regHelper('str', 'isHostname', null, (str) => {
		return this.str.test(str, /^[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
	});

	helpLib.regHelper('str', 'isEmail', null, (str) => {
		let regExp = '^(("[\\w-\\s]+")|([\\w-]+(?:\\.[\\w-]+)*)|("[\\w-\\s]+")([\\w-]+(?:\\.[\\w-]+)*))' +
			'(@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$)|' +
			'(@\\[?((25[0-5]\\.|2[0-4][0-9]\\.|1[0-9]{2}\\.|[0-9]{1,2}\\.))' +
				'((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\\.){2}' +
				'(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})' +
			'\\]?$)';

		return this.str.test(str, new RegExp(regExp, 'i'));
	});

	helpLib.regHelper('str', 'isBlackList', null, (str, list) => {
		checkArray(list, 'list of black values');

		let listSize = list.length;
		for(let i = 0; i < listSize; i++) {
			list[i] = this.str.check(list[i]);
			list[i] = list[i].replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
		}

		return this.str.test(str, '(?:' + list.join(')|(?:') + ')');
	});

	helpLib.regHelper('str', 'clear', null, (str, regExp) => {
		try {
			str = this.str.check(str);
			regExp = regExp instanceof RegExp ? regExp : new RegExp(regExp);
			return str.replace(regExp, '');
		} catch(excep) {
			return false;
		}
	});

	helpLib.regHelper('str', 'clearLow', null, (str, withNewLines) => {
		let exp = withNewLines ? '[\\x00-\\x09\\x0B\\x0C\\x0E-\\x1F\\x7F]+' : '[\\x00-\\x1F\\x7F]+';
		return this.str.clear(str, new RegExp(exp, 'g'));
	});

	helpLib.regHelper('str', 'clearBlackList', null, (str, list) => {
		checkArray(list, 'list of black values');

		let listSize = list.length;
		for(let i = 0; i < listSize; i++) {
			list[i] = this.str.check(list[i]);
			list[i] = list[i].replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
		}

		return this.str.clear(str, new RegExp('(?:' + list.join(')|(?:') + ')', 'g'));
	});

	function checkArray(arr, name) {
		if(Object.prototype.toString.call(arr) !== '[object Array]') {
			throw new TypeError(`The ${name} is not a Array`);
		}
	}

})($namespace$);
},{"../helplib.js":1}]},{},[2])(2)
});
