const $moduleNamespace$ = (helpLib) => {

	helpLib.regHelper('func', 'is', null, function(callback) {
		return typeof callback === 'function' ? true : false;
	});

	helpLib.regHelper('func', 'check', null, function(callback, defValue = function() {}) {
		return this.func.is(callback) ? callback : defValue;
	});

	helpLib.regHelper('func', 'apply', {'.': 'isSet', arr: 'check', obj: 'is'}, function(scope, callback, args = []) {
		scope = this.isSet(scope) ? scope : null;
		scope = this.obj.is(scope) || this.func.is(scope) ? scope : null;

		return this.func.is(callback) ? callback.apply(scope, this.arr.sCheck(args)) : false;
	});

	helpLib.regHelper('func', 'saveApply', {'.': 'isSet', arr: 'check', obj: 'is'}, function(scope, callback, errorCallback = function() {}, args = []) {
		scope = this.isSet(scope) ? scope : null;
		scope = this.obj.is(scope) || this.func.is(scope) ? scope : null;

		try {
			return this.func.is(callback) ? callback.apply(scope, this.arr.sCheck(args)) : false;
		} catch(excep) {
			return this.func.is(errorCallback) ? errorCallback.call(scope, excep) : false;
		}
	});

	helpLib.regHelper('func', 'call', null, function(scope, callback, ...args) {
		return this.func.apply(scope, callback, args);
	});

	helpLib.regHelper('func', 'saveCall', null, function(scope, callback, errorCallback, ...args) {
		return this.func.saveApply(scope, callback, errorCallback, args);
	});
};

module.exports = $moduleNamespace$;