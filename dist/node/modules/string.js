const helpLibModule = (helpLib) => {

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
};

module.exports = helpLibModule;