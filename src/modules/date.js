const $moduleNamespace$ = (helpLib) => {

	helpLib.regHelper('date', 'is', null, function(date) {
		if(Object.prototype.toString.call(date) === '[object Date]') {
			return isNaN(date) ? false : true;
		}

		return false;
	});

	helpLib.regHelper('date', 'check', {'.': 'isInstance', str: 'is', num: 'isFinite, check'}, function(date, defValue = new Date()) {
		if(this.isInstance(date, 'Date', true)) {
			return isNaN(date) ? defValue : date;
		} else if(this.num.isFinite(date)) {
			date = new Date(this.num.check(date));
			return isNaN(date) ? defValue : date;
		} else if(this.str.is(date)) {
			date = new Date(date);
			return isNaN(date) ? defValue : date;
		} else {
			return defValue;
		}
	});
};

module.exports = $moduleNamespace$;