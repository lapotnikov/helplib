const $moduleNamespace$ = (helpLib) => {

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
};

module.exports = $moduleNamespace$;