const $moduleNamespace$ = (helpLib) => {

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
};

module.exports = $moduleNamespace$;