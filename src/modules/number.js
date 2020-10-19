const $moduleNamespace$ = (helpLib) => {

	helpLib.regHelper('num', 'is', null, function(num) {
		let type = typeof num;
		switch(type) {
			case 'number': return true;
			case 'string': return num.trim().length == 0 || isNaN(parseStrNum.call(this, num)) ? false : true;
			default: return false;
		}
	});

	helpLib.regHelper('num', 'isFinite', null, function(num) {
		let type = typeof num;
		switch(type) {
			case 'number': break;
			case 'string': num = num.trim().length == 0 ? NaN : parseStrNum.call(this, num); break;
			default: num = NaN;
		}

		return Number.isFinite(num) ? true : false;
	});

	helpLib.regHelper('num', 'isInt', null, function(num) {
		if(this.num.isFinite(num)) {
			return parseStrNum.call(this, num) % 1 == 0 ? true : false;
		} else {
			return false;
		}
	});

	helpLib.regHelper('num', 'check', null, function(num, defValue = 0) {
		let type = typeof num;
		switch(type) {
			case 'number': break;
			case 'string': num = num.trim().length == 0 ? NaN : parseStrNum.call(this, num); break;
			default: num = NaN;
		}

		return Number.isFinite(num) ? num : defValue;
	});

	helpLib.regHelper('num', 'random', null, function(min = 0, max = Number.MAX_SAFE_INTEGER) {
		min = Math.ceil(this.num.check(min, 0));
		max = Math.floor(this.num.check(max, Number.MAX_SAFE_INTEGER));
		[min, max] = min > max ? [max, min] : [min, max];
		min = min < Number.MIN_SAFE_INTEGER ? Number.MIN_SAFE_INTEGER : min;
		max = max >= Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : max;

		let res = Math.floor(min + Math.random() * (max + 1 - min));
		res = res < min ? min : res;
		res = res > max ? max : res;

		return res;
	});

	helpLib.regHelper('num', 'format', {'.': 'isSet', str: 'check'}, function(num, intSize, fractSize = null) {
		num = this.num.check(num, 0);
		fractSize = this.num.check(fractSize, null);
		fractSize = fractSize !== null && fractSize < 0 ? 0 : fractSize;
		fractSize = fractSize !== null && fractSize > 20 ? 20 : fractSize;

		let isMinus = Number(fractSize !== null ? num.toFixed(fractSize) : num) < 0 ? true : false;
		let parts = this.str.check(fractSize !== null ? Math.abs(num).toFixed(fractSize) : Math.abs(num)).split('.');
		intSize = this.num.check(intSize, 0) - parts[0].length;
		intSize = intSize < 0 ? 0 : intSize;
		intSize = intSize + parts[0].length > 100 ? 100 - parts[0].length : intSize;

		let ret = '0'.repeat(intSize) + parts[0];
		if(this.isSet(parts[1])) {
			ret += '.' + parts[1];
		}

		return isMinus ? ('-' + ret) : ret;
	});

	helpLib.regHelper('num', 'inInterval', null, function(num, minValue, maxValue = null, defValue = null) {
		num = this.num.check(num);
		minValue = this.num.check(minValue, null);
		maxValue = this.num.check(maxValue, null);
		defValue = this.num.check(defValue, null);

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

	function parseStrNum(num) {
		if(typeof num === 'string') {
			let hasMinusX16 = num.indexOf('-0xf') >= 0 ? true : false;
			num = Number(hasMinusX16 ? num.replace('-0x', '0x') : num);
			num = hasMinusX16 && Number.isFinite(num) ? num * -1 : num;
		}

		return num;
	}
};

module.exports = $moduleNamespace$;