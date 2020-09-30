const helpLib = (() => {
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

((core) => {const helpLibModule = (helpLib) => {

	helpLib.regHelper('.', 'isSet', null, function(val) {
		return val === null || val === undefined ? false : true;
	});

	helpLib.regHelper('.', 'isScalar', null, function(val) {
		return (/boolean|number|string/).test(typeof val);
	});

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

	helpLib.regHelper('.', 'isInstance', null, function(obj, cls, onlyFirstLevel = false) {
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
	});
};helpLibModule(core);})(helpLib);

((core) => {const helpLibModule = (helpLib) => {

	helpLib.regHelper('str', 'is', null, function(str) {
		return typeof str === 'string' ? true : false;
	});

	helpLib.regHelper('str', 'check', {'.': 'isSet'}, function(str, defValue = '') {
		return this.isSet(str) ? String(str) : defValue;
	});

	helpLib.regHelper('str', 'trim', null, function(str) {
		return this.str.check(str).trim();
	});

	helpLib.regHelper('str', 'clearDoubleSpace', null, function(str) {
		return this.str.check(str).replace(/]\s\s+/g, ' ');
	});

	helpLib.regHelper('str', 'ucFirst', null, function(str) {
		str = this.str.check(str);
		return str.length == 0 ? str : str[0].toUpperCase() + str.slice(1);
	});

	helpLib.regHelper('str', 'lcFirst', null, function(str) {
		str = this.str.check(str);
		return str.length == 0 ? str : str[0].toLowerCase() + str.slice(1);
	});

	helpLib.regHelper('str', 'reverse', null, function(str) {
		str = this.str.check(str);
		return str.split('').reverse().join('');
	});

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

	helpLib.regHelper('str', 'test', null, function(str, regExp) {
		try {
			regExp = regExp instanceof RegExp ? regExp : new RegExp(regExp);
			return regExp.test(this.str.check(str));
		} catch(excep) {
			return false;
		}
	});

	helpLib.regHelper('str', 'isHostname', null, function(str) {
		return this.str.test(str, /^[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
	});

	helpLib.regHelper('str', 'isEmail', null, function(str) {
		let regExp = '^(("[\\w-\\s]+")|([\\w-]+(?:\\.[\\w-]+)*)|("[\\w-\\s]+")([\\w-]+(?:\\.[\\w-]+)*))' +
			'(@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$)|' +
			'(@\\[?((25[0-5]\\.|2[0-4][0-9]\\.|1[0-9]{2}\\.|[0-9]{1,2}\\.))' +
				'((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\\.){2}' +
				'(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})' +
			'\\]?$)';

		return this.str.test(str, new RegExp(regExp, 'i'));
	});

	helpLib.regHelper('str', 'isBlackList', {arr: 'check'}, function(str, list) {
		list = this.arr.check(list);
		let listSize = list.length;

		for(let i = 0; i < listSize; i++) {
			list[i] = this.str.check(list[i]);
			list[i] = list[i].replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
		}

		return this.str.test(str, '(?:' + list.join(')|(?:') + ')');
	});

	helpLib.regHelper('str', 'clear', null, function(str, regExp) {
		try {
			str = this.str.check(str);
			regExp = regExp instanceof RegExp ? regExp : new RegExp(regExp);
			return str.replace(regExp, '');
		} catch(excep) {
			return false;
		}
	});

	helpLib.regHelper('str', 'clearLow', null, function(str, withNewLines) {
		let exp = withNewLines ? '[\\x00-\\x09\\x0B\\x0C\\x0E-\\x1F\\x7F]+' : '[\\x00-\\x1F\\x7F]+';
		return this.str.clear(str, new RegExp(exp, 'g'));
	});

	helpLib.regHelper('str', 'clearBlackList', {arr: 'check'}, function(str, list) {
		list = this.arr.check(list);
		let listSize = list.length;

		for(let i = 0; i < listSize; i++) {
			list[i] = this.str.check(list[i]);
			list[i] = list[i].replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
		}

		return this.str.clear(str, new RegExp('(?:' + list.join(')|(?:') + ')', 'g'));
	});
};helpLibModule(core);})(helpLib);

((core) => {const helpLibModule = (helpLib) => {

	helpLib.regHelper('num', 'is', null, function(num) {
		let type = typeof num;
		switch(type) {
			case 'number': return true;
			case 'string': return isNaN(Number(num)) ? false : true;
			default: return false;
		}
	});

	helpLib.regHelper('num', 'isInt', null, function(num) {
		if(this.num.is(num)) {
			return Number(num) % 1 == 0 ? true : false;
		} else {
			return false;
		}
	});

	helpLib.regHelper('num', 'check', null, function(num, defValue = 0) {
		return this.num.is(num) ? Number(num) : defValue;
	});

	helpLib.regHelper('num', 'random', null, function(min = 0, max = Number.MAX_SAFE_INTEGER) {
		min = this.num.check(min);
		max = this.num.check(max);
		return Math.round(min - 0.5 + Math.random() * (max - min + 1));
	});

	helpLib.regHelper('num', 'format', {'.': 'isSet', str: 'check'}, function(value, intSize, fractSize) {
		let parts = this.str.check(this.num.check(value).toFixed(this.num.check(fractSize))).split('.');
		intSize = this.num.check(intSize) - parts[0].length;
		intSize = intSize < 0 ? 0 : intSize;

		let ret = '0'.repeat(intSize) + parts[0];
		if(this.isSet(parts[1])) {
			ret += '.' + parts[1];
		}

		return ret;
	});

	helpLib.regHelper('num', 'inInterval', {'.': 'isSet'}, function(num, minValue, maxValue, defValue = null) {
		num = this.num.check(num);
		minValue = this.isSet(minValue) ? this.num.check(minValue) : null;
		maxValue = this.isSet(maxValue) ? this.num.check(maxValue) : null;
		defValue = this.isSet(defValue) ? this.num.check(defValue) : null;

		if(minValue !== null && num < minValue) {
			return defValue !== null ? defValue : false;
		} else if(maxValue !== null && num > maxValue) {
			return defValue !== null ? defValue : false;
		} else {
			return defValue !== null ? num : true;
		}
	});

	helpLib.regHelper('num', 'toFlag', null, function(num) {
		return Number(Boolean(num));
	});
};helpLibModule(core);})(helpLib);

((core) => {const helpLibModule = (helpLib) => {

	helpLib.regHelper('obj', 'is', null, function(obj) {
		return typeof obj === 'object' && obj !== null ? true : false;
	});

	helpLib.regHelper('obj', 'isSet', {'.': 'isInstance'}, function(obj) {
		return this.obj.is(obj) && this.isInstance(obj,' Set') ? true : false;
	});

	helpLib.regHelper('obj', 'isWeakSet', {'.': 'isInstance'}, function(obj) {
		return this.obj.is(obj) && this.isInstance(obj,' WeakSet') ? true : false;
	});

	helpLib.regHelper('obj', 'isMap', {'.': 'isInstance'}, function(obj) {
		return this.obj.is(obj) && this.isInstance(obj,' Map') ? true : false;
	});

	helpLib.regHelper('obj', 'isWeakMap', {'.': 'isInstance'}, function(obj) {
		return this.obj.is(obj) && this.isInstance(obj,' WeakMap') ? true : false;
	});

	helpLib.regHelper('obj', 'isCollection', null, function(obj) {
		return this.obj.isSet(obj) || this.obj.isMap(obj) ? true : false;
	});

	helpLib.regHelper('obj', 'isWeakCollection', null, function(obj) {
		return this.obj.isWeakSet(obj) || this.obj.isWeakMap(obj) ? true : false;
	});

	helpLib.regHelper('obj', 'check', null, function(obj, defValue = {}) {
		return this.obj.is(obj) ? obj : defValue;
	});

	helpLib.regHelper('obj', 'checkSet', null, function(obj, defValue = new Set()) {
		return this.obj.isSet(obj) ? obj : defValue;
	});

	helpLib.regHelper('obj', 'checkWeakSet', null, function(obj, defValue = new WeakSet()) {
		return this.obj.isWeakSet(obj) ? obj : defValue;
	});

	helpLib.regHelper('obj', 'checkMap', null, function(obj, defValue = new Map()) {
		return this.obj.isMap(obj) ? obj : defValue;
	});

	helpLib.regHelper('obj', 'checkWeakMap', null, function(obj, defValue = new WeakMap()) {
		return this.obj.isWeakMap(obj) ? obj : defValue;
	});

	helpLib.regHelper('obj', 'size', {'.': 'isInstance'}, function(obj) {
		let ret = 0;
		objTypify(obj,
			() => ret = Object.keys(obj).length,
			() => ret = obj.size
		);

		return ret;
	});

	helpLib.regHelper('obj', 'forEach', {'.': 'isInstance', func: 'is'}, function(obj, callback) {
		if(this.func.is(callback)) {
			objTypify(obj,
				() => {
					for(let prop in obj) {
						if(Object.prototype.hasOwnProperty.call(obj, prop)) {
							callback(obj[prop], prop, obj);
						}
					}
				},
				() => obj.forEach(callback)
			);
		}
	});

	helpLib.regHelper('obj', 'toArray', {'.': 'isInstance'}, function(obj) {
		let ret = [];
		objTypify(obj,
			() => ret = Object.values(obj),
			() => ret = Array.from(obj.values())
		);

		return ret;
	});

	helpLib.regHelper('obj', 'copy', {'.': 'isInstance'}, function(obj) {
		let ret = {};
		objTypify(obj,
			() => ret = Object.assign({}, obj),
			(className) =>  {
				if(className === 'Set') {
					ret = new Set(obj);
				} else {
					ret = new Map(obj);
				}
			}
		);

		return ret;
	});

	helpLib.regHelper('obj', 'merge', {'.': 'isInstance'}, function(...objList) {
		let ret = {};
		let collection = 'Object';

		let fillRet = (prop, value) => {
			switch(collection) {
				case 'Object': ret[prop] = value; break;
				case 'Set': ret.add(value); break;
				case 'Map': ret.set(prop, value); break;
			}
		};

		for(let i of objList) {
			let obj = objList[i];
			objTypify(obj,
				() => {
					for(let prop in obj) {
						if(Object.prototype.hasOwnProperty.call(obj, prop)) {
							fillRet(prop, obj[prop]);
						}
					}
				},
				(className) =>  {
					if(i === 0) {
						collection = className;
						ret = className === 'Set' ? new Set() : new Map();
					}

					if(className === 'Map') {
						for(let prop of obj) {
							fillRet(prop[0], prop[1]);
						}
					} else if(collection === 'Set') {
						for(let prop of obj) {
							fillRet(null, prop);
						}
					}
				}
			);
		}

		return ret;
	});

	function objTypify(obj, defCallback, collectionCallback, weakCollectionCallback) {
		if(helpLib.obj.is(obj)) {
			if(helpLib.isInstance(obj,' Set')) {
				collectionCallback('Set');
			} else if(helpLib.isInstance(obj,' Map')) {
				collectionCallback('Map');
			} else if(helpLib.isInstance(obj,' WeakSet')) {
				weakCollectionCallback('WeakSet');
			} else if(helpLib.isInstance(obj,' WeakMap')) {
				weakCollectionCallback('WeakMap');
			} else {
				defCallback('Object');
			}
		}
	}
};helpLibModule(core);})(helpLib);

((core) => {const helpLibModule = (helpLib) => {

	helpLib.regHelper('arr', 'is', null, function(arr) {
		return Object.prototype.toString.call(arr) === '[object Array]' ? true : false;
	});

	helpLib.regHelper('arr', 'check', null, function(arr, defValue = []) {
		return this.arr.is(arr) ? arr : defValue;
	});

	helpLib.regHelper('arr', 'toArray', null, function(val) {
		try {
			return Array.from(val);
		} catch(excep) {
			return [];
		}
	});

	helpLib.regHelper('arr', 'exist', null, function(arr, val) {
		return this.arr.check(arr).indexOf(val) >= 0 ? true : false;
	});

	helpLib.regHelper('arr', 'copy', null, function(arr) {
		return this.arr.check(arr).slice();
	});

	helpLib.regHelper('arr', 'proection', {'.': 'isSet', str: 'trim', obj: 'is, isMap'}, function(arr, field) {
		let ret = [];
		arr = this.arr.check(arr);
		field = this.str.trim(field);

		for(let itm of arr) {
			if(this.obj.is(itm)) {
				let val = this.obj.isMap(itm) ? itm.get(field) : itm[field];
				if(this.isSet(val)) {
					ret.push(val);
				}
			}
		}

		return ret;
	});

	helpLib.regHelper('arr', 'shuffle', null, function(arr) {
		arr = this.arr.copy(arr);
		return list.sort(() => {
			return Math.random() - 0.5;
		});
	});

	helpLib.regHelper('arr', 'random', {num: 'check'}, function(arr, count) {
		let ret = [];
		arr = this.arr.copy(arr);
		count = Math.floor(this.num.check(count));

		while(count > 0 && arr.length > 0) {
			let i = Math.floor(Math.random() * arr.length);
			ret.push(arr[i]);
			arr.splice(i, 1);
			count--;
		}

		return ret;
	});

	helpLib.regHelper('arr', 'unique', null, function(arr) {
		arr = this.arr.check(arr);
		return arr.filter((elem, index, array) => {
			return index == array.indexOf(elem);
		});
	});

	helpLib.regHelper('arr', 'toNumberArray', {num: 'is, check'}, function(arr, isAllConvert = false) {
		let ret = [];
		arr = this.arr.check(arr);

		for(var itm of arr) {
			if(isAllConvert || this.num.is(itm)) {
				ret.push(this.num.check(itm));
			}
		}

		return ret;
	});
};helpLibModule(core);})(helpLib);

((core) => {const helpLibModule = (helpLib) => {

	helpLib.regHelper('func', 'is', null, function(callback) {
		return typeof callback === 'function' ? true : false;
	});

	helpLib.regHelper('func', 'check', null, function(callback, defValue = function() {}) {
		return this.func.is(callback) ? callback : defValue;
	});

	helpLib.regHelper('func', 'apply', {'.': 'isSet', arr: 'check'}, function(scope, callback, args) {
		scope = this.isSet(scope) ? scope : null;
		return this.func.check(callback).apply(scope, this.arr.check(args));
	});

	helpLib.regHelper('func', 'saveApply', {'.': 'isSet', arr: 'check'}, function(scope, callback, errorCallback, args) {
		scope = this.isSet(scope) ? scope : null;
		try {
			return this.func.apply(scope, callback, this.arr.check(args));
		} catch(excep) {
			return this.func.check(errorCallback).call(scope, excep);
		}
	});

	helpLib.regHelper('func', 'call', null, function(scope, callback, ...args) {
		return this.func.apply(scope, callback, args);
	});

	helpLib.regHelper('func', 'saveCall', null, function(scope, callback, errorCallback, ...args) {
		return this.func.saveApply(scope, callback, errorCallback, args);
	});
};helpLibModule(core);})(helpLib);

((core) => {const helpLibModule = (helpLib) => {

	helpLib.regHelper('date', 'is', null, function(date) {
		if(Object.prototype.toString.call(date) === '[object Date]') {
			return isNaN(date) ? false : true;
		}

		return false;
	});

	helpLib.regHelper('date', 'check', {'.': 'isInstance', str: 'is', num: 'is'}, function(date, defValue = new Date()) {
		if(this.isInstance(date, 'Date', true)) {
			return date;
		} else if(this.num.is(date) || this.str.is(date)) {
			date = new Date(date);
			if(isNaN(date) == false) {
				return date;
			}
		}

		return defValue;
	});

	helpLib.regHelper('date', 'getWeek', null, function(date) {
		date = this.date.check(date);
		let firstDay = new Date(date.getFullYear(), 0, 1);

		return Math.ceil((((date - firstDay) / 86400000) + firstDay.getDay() + 1) / 7);
	});

	helpLib.regHelper('date', 'getTimestamp', null, function(date = new Date()) {
		date = this.date.check(date);
		return date.getTime();
	});

	helpLib.regHelper('date', 'getUTCTimestamp', null, function(date = new Date()) {
		date = this.date.check(date);
		date = new Date(date.getTime() + (date.getTimezoneOffset() * 60000));
		return date.getTime();
	});

	helpLib.regHelper('date', 'getDateFromTimestamp', {num: 'check'}, function(timestamp) {
		return new Date(this.num.check(timestamp));
	});

	helpLib.regHelper('date', 'getDateFromUTCTimestamp', {num: 'check'}, function(timestamp) {
		let date = new Date();
		date.setTime(this.num.check(timestamp) - (date.getTimezoneOffset() * 60000));
		return date;
	});
};helpLibModule(core);})(helpLib);

helpLib.init();