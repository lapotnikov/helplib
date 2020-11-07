const $moduleNamespace$ = (helpLib) => {

	helpLib.regHelper('arr', 'is', null, function(arr) {
		return Object.prototype.toString.call(arr) === '[object Array]' ? true : false;
	});

	helpLib.regHelper('arr', 'check', {obj: 'is, toArray', str: 'is'}, function(arr, defValue = []) {
		let ret = defValue;
		if(this.arr.is(arr)) {
			ret = arr;
		} else if(this.obj.is(arr)) {
			ret = this.obj.toArray(arr);
		} else if(this.str.is(arr)) {
			ret = Array.from(arr);
		}

		return ret;
	});

	helpLib.regHelper('arr', 'exist', null, function(arr, val) {
		return this.arr.check(arr).indexOf(val) >= 0 ? true : false;
	});

	helpLib.regHelper('arr', 'copy', null, function(arr) {
		return this.arr.check(arr).slice();
	});

	helpLib.regHelper('arr', 'proection', {'.': 'isSet', str: 'trim', obj: 'is, isMap'}, function(arr, field) {
		let ret = [];
		field = this.str.trim(field);

		if(field.length > 0) {
			arr = this.arr.check(arr);
			for(let itm of arr) {
				if(this.obj.is(itm)) {
					let val = this.obj.isMap(itm) ? itm.get(field) : itm[field];
					if(this.isSet(val)) {
						ret.push(val);
					}
				}
			}
		}

		return ret;
	});

	helpLib.regHelper('arr', 'shuffle', null, function(arr) {
		arr = this.arr.copy(arr);
		return arr.sort(() => {
			return Math.random() - 0.5;
		});
	});

	helpLib.regHelper('arr', 'unique', null, function(arr) {
		arr = new Set(this.arr.check(arr));
		return Array.from(arr.values());
	});

	helpLib.regHelper('arr', 'toNumberArray', {num: 'check'}, function(arr, isAllConvert = false) {
		let ret = [];
		arr = this.arr.check(arr);

		for(var itm of arr) {
			if(isAllConvert == false && typeof itm === 'number' && Number.isFinite(itm)) {
				ret.push(itm);
			} else if(isAllConvert) {
				ret.push(this.num.check(itm));
			}
		}

		return ret;
	});
};

module.exports = $moduleNamespace$;