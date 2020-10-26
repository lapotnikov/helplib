const $moduleNamespace$ = (helpLib) => {

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
		str = this.str.check(str);
		return str.replace(/[\t\xA0]+/g, ' ').replace(/  +/g, ' ');
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

	helpLib.regHelper('str', 'test', {'.': 'isSet'}, function(str, regExp) {
		if(this.isSet(str) == false || this.isSet(regExp) == false) {
			return false;
		}

		try {
			regExp = regExp instanceof RegExp ? regExp : new RegExp(this.str.check(regExp));
			return regExp.test(this.str.check(str));
		} catch(excep) {
			return false;
		}
	});

	helpLib.regHelper('str', 'testList', {'.': 'isSet', arr: 'check'}, function(str, list) {
		if(this.isSet(str) == false) {
			return false;
		}

		str = this.str.check(str, '');
		list = this.arr.check(list);
		let listSize = list.length;

		for(let i = 0; i < listSize; i++) {
			if(this.str.test(str, list[i])) {
				return true;
			}
		}

		return false;
	});

	helpLib.regHelper('str', 'isEmail', null, function(str) {
		let addr = '[а-я\\w!#$%&\'*\\-/=?^`{|}~]';
		let dom1 = '[а-яa-z0-9\\-]';
		let dom2 = '[а-яa-z]';
		let regExp = `^((${addr}+(\\.${addr}+)*)|((${addr}+(\\.${addr}+)*)+(\\+${addr}+)*))` +
			`(@((${dom1}+\\.)*${dom2}${dom1}{0,66})\\.(${dom2}{2,6}(\\.${dom2}{2})?)$)|` +
			`(@\\[?((25[0-5]\\.|2[0-4][0-9]\\.|1[0-9]{2}\\.|[0-9]{1,2}\\.))` +
				`((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\\.){2}` +
				`(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})` +
			`\\]?$)`;

		if(this.str.test(str, new RegExp(regExp, 'i'))) {
			return this.str.check(str).split(/@[^@]+$/)[0].length <= 64 ? true : false;
		} else {
			return false;
		}
	});

	helpLib.regHelper('str', 'clear', {'.': 'isSet'}, function(str, regExp) {
		if(this.isSet(str) == false || this.isSet(regExp) == false) {
			return this.str.check(str);
		}

		try {
			regExp = new RegExp(regExp instanceof RegExp ? regExp.source : this.str.check(regExp), 'g');
			return this.str.check(str).replace(regExp, '');
		} catch(excep) {
			return this.str.check(str);
		}
	});

	helpLib.regHelper('str', 'clearList', {arr: 'check'}, function(str, list) {
		str = this.str.check(str, '');
		if(str.length > 0) {
			list = this.arr.check(list);
			let listSize = list.length;

			for(let i = 0; i < listSize; i++) {
				str = this.str.clear(str, list[i]);
			}
		}

		return str;
	});
};

module.exports = $moduleNamespace$;