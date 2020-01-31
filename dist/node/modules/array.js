const helpLibModule = (helpLib) => {

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
};

module.exports = helpLibModule;