const helpLibModule = (helpLib) => {

	helpLib.regHelper('func', 'is', null, function(callback) {
		return typeof callback === 'function' ? true : false;
	});

	helpLib.regHelper('func', 'check', null, function(callback, defValue = function() {}) {
		return this.func.is(callback) ? callback : defValue;
	});

	helpLib.regHelper('func', 'apply', {arr: 'check'}, function(scope, callback, args) {
		scope = this.isSet(scope) ? scope : null;
		return this.func.check(callback).apply(scope, this.arr.check(args));
	});

	helpLib.regHelper('func', 'saveApply', {arr: 'check'}, function(scope, callback, errorCallback, args) {
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
};

module.exports = helpLibModule;