/**
 * Testing "fuc" module to work with functions
 * @author Artyom Lapotnikov <lapotnikov@gmail.com>
 * @copyright Artyom Lapotnikov
 * @license MIT
 * @version 1.0.0
 */

/**
 * Create the export variable in the browser
 * If the testing happens in browser then the value of export variable is a window
 */
exports = typeof window !== 'undefined' ? window : exports;

exports.testFunc = (describe, it, assert, helpLib) => {
	/**
	 * If "func" module is not exist in current version of helpLib, then we shouldn't test it
	 */
	if(helpLib.func === undefined) {
		return;
	}

	/**
	 * Creates a set of functions for tests
	 * @returns {object} A set of functions
	 */
	function getTestFuncs() {
		return {
			f1: function f1(s1, s2) {return 'f1' + (s1 = s1 === undefined ? '' : s1) + (s2 = s2 === undefined ? '' : s2);},
			f2: (s1, s2) => {return 'f2' + (s1 = s1 === undefined ? '' : s1) + (s2 = s2 === undefined ? '' : s2);},
			f3: function(s1, s2) {return 'f3' + (s1 = s1 === undefined ? '' : s1) + (s2 = s2 === undefined ? '' : s2);},
			f4: new Function('s1', 's2', 'return \'f4\' + (s1 = s1 === undefined ? \'\' : s1) + (s2 = s2 === undefined ? \'\' : s2);'),

			sf1: function sf1() {return this;},
			sf2: () => {return this;},
			sf3: function() {return this;},
			sf4: new Function('return this;'),

			tf1: function tf1() {throw new Error('tf1');},
			tf2: () => {throw new Error('tf2');},
			tf3: function() {throw new Error('tf3');},
			tf4: new Function('throw new Error(\'tf4\');'),

			rtf1: function rtf1(e) {return 'rtf1-' + e.message;},
			rtf2: (e) => {return 'rtf2-' + e.message;},
			rtf3: function(e) {return 'rtf3-' + e.message;},
			rtf4: new Function('e', 'return \'rtf4-\' + e.message;')
		};
	}

	describe('Test "fuc" module', () => {
		describe('checking "is" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.func.is, 'function "is" is not added or is not a function');
			});

			let fs = getTestFuncs();

			it('call with a function as parameters', () => {
				assert.isTrue(helpLib.func.is(fs.f1), 'result with "(function) f1" parameter is incorrect');
				assert.isTrue(helpLib.func.is(fs.f2), 'result with "(function) f2" parameter is incorrect');
				assert.isTrue(helpLib.func.is(fs.f3), 'result with "(function) f3" parameter is incorrect');
				assert.isTrue(helpLib.func.is(fs.f4), 'result with "(function) f4" parameter is incorrect');
			});

			it('call without parameters or with null or undefined values', () => {
				assert.isFalse(helpLib.func.is(), 'result with empty parameter is incorrect');
				assert.isFalse(helpLib.func.is(undefined), 'result with "undefined" parameter is incorrect');
				assert.isFalse(helpLib.func.is(null), 'result with "null" parameter is incorrect');
			});

			it('call with a not function as parameters', () => {
				assert.isFalse(helpLib.func.is(true), 'result with "(bool) true" parameter is incorrect');
				assert.isFalse(helpLib.func.is(false), 'result with "(bool) false" parameter is incorrect');

				assert.isFalse(helpLib.func.is(0), 'result with "(number) 0" parameter is incorrect');
				assert.isFalse(helpLib.func.is(1), 'result with "(number) 1" parameter is incorrect');

				assert.isFalse(helpLib.func.is(''), 'result with "(string) \'\'" parameter is incorrect');
				assert.isFalse(helpLib.func.is('test'), 'result with "(string) \'test\'" parameter is incorrect');

				assert.isFalse(helpLib.func.is([]), 'result with "(array) []" parameter is incorrect');
				assert.isFalse(helpLib.func.is(['test']), 'result with "(array) [\'test\']" parameter is incorrect');

				assert.isFalse(helpLib.func.is({}), 'result with "(object) {}" parameter is incorrect');
				assert.isFalse(helpLib.func.is({test: 'test'}), 'result with "(object) {test: \'test\'}" parameter is incorrect');
				assert.isFalse(helpLib.func.is(new Object()), 'result with "(object) new Object()" parameter is incorrect');
				assert.isFalse(helpLib.func.is(new fs.f1()), 'result with "(object) new f1()" parameter is incorrect');
				assert.isFalse(helpLib.func.is(new fs.f3()), 'result with "(object) new f3()" parameter is incorrect');
				assert.isFalse(helpLib.func.is(new fs.f4()), 'result with "(object) new f4()" parameter is incorrect');

				assert.isFalse(helpLib.func.is(NaN), 'result with "NaN" parameter is incorrect');
				assert.isFalse(helpLib.func.is(Infinity), 'result with "Infinity" parameter is incorrect');
			});
		});

		describe('checking "check" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.func.check, 'function "check" is not added or is not a function');
			});

			let fs = getTestFuncs();

			it('call with a function as parameters', () => {
				assert.isFunction(helpLib.func.check(fs.f1), 'result with "(function) f1" parameter is incorrect');
				assert.isFunction(helpLib.func.check(fs.f2), 'result with "(function) f2" parameter is incorrect');
				assert.isFunction(helpLib.func.check(fs.f3), 'result with "(function) f3" parameter is incorrect');
				assert.isFunction(helpLib.func.check(fs.f4), 'result with "(function) f4" parameter is incorrect');
			});

			it('call with a function as "callback" parameter and some "defValue" parameter', () => {
				assert.isFunction(helpLib.func.check(fs.f1, 'test'),
					'result with "(function) f1, (string) \'test\'" parameters is incorrect');
				assert.isFunction(helpLib.func.check(fs.f2, 'test'),
					'result with "(function) f2, (string) \'test\'" parameters is incorrect');
				assert.isFunction(helpLib.func.check(fs.f3, 'test'),
					'result with "(function) f3, (string) \'test\'" parameters is incorrect');
				assert.isFunction(helpLib.func.check(fs.f4, 'test'),
					'result with "(function) f4, (string) \'test\'" parameters is incorrect');
			});

			it('call without parameters or with null or undefined values', () => {
				assert.isFunction(helpLib.func.check(), 'result without parameter is incorrect');

				assert.isFunction(helpLib.func.check(undefined),'result with "undefined" parameter is incorrect');
				assert.isFunction(helpLib.func.check(undefined, undefined), 'result with "undefined, undefined" parameters is incorrect');

				assert.isFunction(helpLib.func.check(null), 'result with "null" parameter is incorrect');
				assert.isNull(helpLib.func.check(null, null), 'result with "null, null" parameters is incorrect');

			});

			it('call with not a function as parameters', () => {
				assert.isFunction(helpLib.func.check(true),
					'result with "(bool) true" parameter is incorrect');
				assert.isFunction(helpLib.func.check(false),
					'result with "(bool) false" parameter is incorrect');

				assert.isFunction(helpLib.func.check(0),
					'result with "(number) 0" parameter is incorrect');
				assert.isFunction(helpLib.func.check(1),
					'result with "(number) 1" parameter is incorrect');

				assert.isFunction(helpLib.func.check(''),
					'result with "(string) \'\'" parameter is incorrect');
				assert.isFunction(helpLib.func.check('test'),
					'result with "(string) \'test\'" parameter is incorrect');

				assert.isFunction(helpLib.func.check([]),
					'result with "(array) []" parameter is incorrect');
				assert.isFunction(helpLib.func.check(['test']),
					'result with "(array) [\'test\']" parameter is incorrect');

				assert.isFunction(helpLib.func.check({}),
					'result with "(object) {}" parameter is incorrect');
				assert.isFunction(helpLib.func.check({test: 'test'}),
					'result with "(object) {test: \'test\'}" parameter is incorrect');
				assert.isFunction(helpLib.func.check(new Object()),
					'result with "(object) new Object()" parameter is incorrect');
				assert.isFunction(helpLib.func.check(new fs.f1()),
					'result with "(object) new f1()" parameter is incorrect');
				assert.isFunction(helpLib.func.check(new fs.f3()),
					'result with "(object) new f3()" parameter is incorrect');
				assert.isFunction(helpLib.func.check(new fs.f4()),
					'result with "(object) new f4()" parameter is incorrect');

				assert.isFunction(helpLib.func.check(NaN),
					'result with "NaN" parameter is incorrect');
				assert.isFunction(helpLib.func.check(Infinity),
					'result with "Infinity" parameter is incorrect');
			});

			it('call with not a function as "callback" parameter and some "defValue" parameter', () => {
				assert.strictEqual(helpLib.func.check(true, 'test'), 'test',
					'result with "(bool) true, (string) \'test\'" parameters is incorrect');
				assert.strictEqual(helpLib.func.check(false, 'test'), 'test',
					'result with "(bool) false, null" parameters is incorrect');

				assert.strictEqual(helpLib.func.check(0, 'test'), 'test',
					'result with "(number) 0, (string) \'test\'" parameters is incorrect');
				assert.strictEqual(helpLib.func.check(1, 'test'), 'test',
					'result with "(number) 1, (string) \'test\'" parameters is incorrect');

				assert.strictEqual(helpLib.func.check('', 'test'), 'test',
					'result with "(string) \'\', (string) \'test\'" parameters is incorrect');
				assert.strictEqual(helpLib.func.check('test', 'test'), 'test',
					'result with "(string) \'test\', (string) \'test\'" parameters is incorrect');

				assert.strictEqual(helpLib.func.check([], 'test'), 'test',
					'result with "(array) [], (string) \'test\'" parameters is incorrect');
				assert.strictEqual(helpLib.func.check(['test'], 'test'), 'test',
					'result with "(array) [\'test\'], (string) \'test\'" parameters is incorrect');

				assert.strictEqual(helpLib.func.check({}, 'test'), 'test',
					'result with "(object) {}, (string) \'test\'" parameters is incorrect');
				assert.strictEqual(helpLib.func.check({test: 'test'}, 'test'), 'test',
					'result with "(object) {test: \'test\'}, (string) \'test\'" parameters is incorrect');
				assert.strictEqual(helpLib.func.check(new Object(), 'test'), 'test',
					'result with "(object) new Object(), (string) \'test\'" parameters is incorrect');
				assert.strictEqual(helpLib.func.check(new fs.f1(), 'test'), 'test',
					'result with "(object) new f1(), (string) \'test\'" parameters is incorrect');
				assert.strictEqual(helpLib.func.check(new fs.f3(), 'test'), 'test',
					'result with "(object) new f3(), (string) \'test\'" parameters is incorrect');
				assert.strictEqual(helpLib.func.check(new fs.f4(), 'test'), 'test',
					'result with "(object) new f4(), (string) \'test\'" parameters is incorrect');

				assert.strictEqual(helpLib.func.check(NaN, 'test'), 'test',
					'result with "NaN, (string) \'test\'" parameters is incorrect');
				assert.strictEqual(helpLib.func.check(Infinity, 'test'), 'test',
					'result with "Infinity, (string) \'test\'" parameters is incorrect');
				assert.strictEqual(helpLib.func.check(undefined, 'test'), 'test',
					'result with "undefined, (string) \'test\'" parameters is incorrect');
				assert.strictEqual(helpLib.func.check(null, 'test'), 'test',
					'result with "null, (string) \'test\'" parameters is incorrect');
			});
		});

		describe('checking "apply" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.func.apply, 'function "apply" is not added or is not a function');
			});

			let globalScope = typeof window !== 'undefined' ? window : global;
			let objScope = {};
			let arrScope = [];
			let fs = getTestFuncs();

			it('checking a function calling without parameters', () => {
				assert.strictEqual(helpLib.func.apply(objScope, fs.f1), 'f1',
					'result with "(object) objScope, (function) f1" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(objScope, fs.f2), 'f2',
					'result with "(object) objScope, (function) f2" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(objScope, fs.f3), 'f3',
					'result with "(object) objScope, (function) f3" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(objScope, fs.f4), 'f4',
					'result with "(object) objScope, (function) f4" parameters is incorrect');
			});

			it('checking a function calling with parameters', () => {
				assert.strictEqual(helpLib.func.apply(objScope, fs.f1, ['-t']), 'f1-t',
					'result with "(object) objScope, (function) f1, (array) [\'-t\']" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(objScope, fs.f2, ['-t']), 'f2-t',
					'result with "(object) objScope, (function) f2, (array) [\'-t\']" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(objScope, fs.f3, ['-t']), 'f3-t',
					'result with "(object) objScope, (function) f3, (array) [\'-t\']" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(objScope, fs.f4, ['-t']), 'f4-t',
					'result with "(object) objScope, (function) f4, (array) [\'-t\']" parameters is incorrect');

				assert.strictEqual(helpLib.func.apply(objScope, fs.f1, ['-t', '-t']), 'f1-t-t',
					'result with "(object) objScope, (function) f1, (array) [\'-t\', \'-t\']" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(objScope, fs.f2, ['-t', '-t']), 'f2-t-t',
					'result with "(object) objScope, (function) f2, (array) [\'-t\', \'-t\']" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(objScope, fs.f3, ['-t', '-t']), 'f3-t-t',
					'result with "(object) objScope, (function) f3, (array) [\'-t\', \'-t\']" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(objScope, fs.f4, ['-t', '-t']), 'f4-t-t',
					'result with "(object) objScope, (function) f4, (array) [\'-t\', \'-t\']" parameters is incorrect');

				assert.strictEqual(helpLib.func.apply(objScope, fs.f1, ['-', [1, 2, 3]]), 'f1-1,2,3',
					'result with "(object) objScope, (function) f1, (array) [\'-\', [1, 2, 3]]" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(objScope, fs.f2, ['-', [1, 2, 3]]), 'f2-1,2,3',
					'result with "(object) objScope, (function) f2, (array) [\'-\', [1, 2, 3]]" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(objScope, fs.f3, ['-', [1, 2, 3]]), 'f3-1,2,3',
					'result with "(object) objScope, (function) f3, (array) [\'-\', [1, 2, 3]]" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(objScope, fs.f4, ['-', [1, 2, 3]]), 'f4-1,2,3',
					'result with "(object) objScope, (function) f4, (array) [\'-\', [1, 2, 3]]" parameters is incorrect');
			});

			it('checking a scope of calling with a object as "scope" parameter', () => {
				assert.strictEqual(helpLib.func.apply(objScope, fs.sf1), objScope,
					'scope when executing a function with "(object) objScope, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(objScope, fs.sf2), globalScope,
					'scope when executing a function with "(object) objScope, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(objScope, fs.sf3), objScope,
					'scope when executing a function with "(object) objScope, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(objScope, fs.sf4), objScope,
					'scope when executing a function with "(object) objScope, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.apply(arrScope, fs.sf1), arrScope,
					'scope when executing a function with "(object) arrScope, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(arrScope, fs.sf2), globalScope,
					'scope when executing a function with "(object) arrScope, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(arrScope, fs.sf3), arrScope,
					'scope when executing a function with "(object) arrScope, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(arrScope, fs.sf4), arrScope,
					'scope when executing a function with "(object) arrScope, (function) sf4" parameters is incorrect');
			});

			it('checking a scope of calling with a function as "scope" parameter', () => {
				assert.strictEqual(helpLib.func.apply(Array, fs.sf1), Array,
					'scope when executing a function with "(function) Array, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(Array, fs.sf2), globalScope,
					'scope when executing a function with "(function) Array, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(Array, fs.sf3), Array,
					'scope when executing a function with "(function) Array, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(Array, fs.sf4), Array,
					'scope when executing a function with "(function) Array, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.apply(fs.f1, fs.sf1), fs.f1,
					'scope when executing a function with "(function) f1, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(fs.f1, fs.sf2), globalScope,
					'scope when executing a function with "(function) f1, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(fs.f1, fs.sf3), fs.f1,
					'scope when executing a function with "(function) f1, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(fs.f1, fs.sf4), fs.f1,
					'scope when executing a function with "(function) f1, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.apply(fs.f2, fs.sf1), fs.f2,
					'scope when executing a function with "(function) f2, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(fs.f2, fs.sf2), globalScope,
					'scope when executing a function with "(function) f2, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(fs.f2, fs.sf3), fs.f2,
					'scope when executing a function with "(function) f2, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(fs.f2, fs.sf4), fs.f2,
					'scope when executing a function with "(function) f2, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.apply(fs.f3, fs.sf1), fs.f3,
					'scope when executing a function with "(function) f3, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(fs.f3, fs.sf2), globalScope,
					'scope when executing a function with "(function) f3, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(fs.f3, fs.sf3), fs.f3,
					'scope when executing a function with "(function) f3, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(fs.f3, fs.sf4), fs.f3,
					'scope when executing a function with "(function) f3, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.apply(fs.f4, fs.sf1), fs.f4,
					'scope when executing a function with "(function) f4, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(fs.f4, fs.sf2), globalScope,
					'scope when executing a function with "(function) f4, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(fs.f4, fs.sf3), fs.f4,
					'scope when executing a function with "(function) f4, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(fs.f4, fs.sf4), fs.f4,
					'scope when executing a function with "(function) f4, (function) sf4" parameters is incorrect');
			});

			it('checking a scope of calling with a global or this objects as "scope" parameter', () => {
				assert.strictEqual(helpLib.func.apply(globalScope, fs.sf1), globalScope,
					'scope when executing a function with "(object) globalScope, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(globalScope, fs.sf2), globalScope,
					'scope when executing a function with "(object) globalScope, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(globalScope, fs.sf3), globalScope,
					'scope when executing a function with "(object) globalScope, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(globalScope, fs.sf4), globalScope,
					'scope when executing a function with "(object) globalScope, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.apply(this, fs.sf1), this,
					'scope when executing a function with "(object) this, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(this, fs.sf2), globalScope,
					'scope when executing a function with "(object) this, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(this, fs.sf3), this,
					'scope when executing a function with "(object) this, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(this, fs.sf4), this,
					'scope when executing a function with "(object) this, (function) sf4" parameters is incorrect');
			});

			it('checking a scope of calling with a undefined or null as "scope" parameter', () => {
				assert.strictEqual(helpLib.func.apply(undefined, fs.sf1), globalScope,
					'scope when executing a function with "undefined, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(undefined, fs.sf2), globalScope,
					'scope when executing a function with "undefined, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(undefined, fs.sf3), globalScope,
					'scope when executing a function with "undefined, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(undefined, fs.sf4), globalScope,
					'scope when executing a function with "undefined, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.apply(null, fs.sf1), globalScope,
					'scope when executing a function with "null, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(null, fs.sf2), globalScope,
					'scope when executing a function with "null, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(null, fs.sf3), globalScope,
					'scope when executing a function with "null, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(null, fs.sf4), globalScope,
					'scope when executing a function with "null, (function) sf4" parameters is incorrect');
			});

			it('checking a throwable functions', () => {
				assert.throws(helpLib.func.apply.bind(helpLib, null, fs.tf1), Error, 'tf1',
					'result with "null, (function) tf1" parameters is incorrect');
				assert.throws(helpLib.func.apply.bind(helpLib, null, fs.tf2), Error, 'tf2',
					'result with "null, (function) tf2" parameters is incorrect');
				assert.throws(helpLib.func.apply.bind(helpLib, null, fs.tf3), Error, 'tf3',
					'result with "null, (function) tf3" parameters is incorrect');
				assert.throws(helpLib.func.apply.bind(helpLib, null, fs.tf4), Error, 'tf4',
					'result with "null, (function) tf4" parameters is incorrect');
			});

			it('call without parameters or with null or undefined values', () => {
				assert.strictEqual(helpLib.func.apply(), false, 'result without parameter is incorrect');

				assert.strictEqual(helpLib.func.apply(undefined), false,
					'result with "undefined" parameter is incorrect');
				assert.strictEqual(helpLib.func.apply(undefined, undefined), false,
					'result with "undefined, undefined" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(undefined, undefined, undefined), false,
					'result with "undefined, undefined, undefined" parameters is incorrect');

				assert.strictEqual(helpLib.func.apply(null), false, 'result with "null" parameter is incorrect');
				assert.strictEqual(helpLib.func.apply(null, null), false, 'result with "null, null" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(null, null, null), false, 'result with "null, null, null" parameters is incorrect');
			});

			it('call with incorrect "scope" parameter', () => {
				assert.strictEqual(helpLib.func.apply(true, fs.sf1), globalScope,
					'result with "(bool) true, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(false, fs.sf1), globalScope,
					'result with "(bool) false, (function) sf1" parameters is incorrect');

				assert.strictEqual(helpLib.func.apply(0, fs.sf1), globalScope,
					'result with "(number) 0, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(1, fs.sf1), globalScope,
					'result with "(number) 1, (function) sf1" parameters is incorrect');

				assert.strictEqual(helpLib.func.apply('', fs.sf1), globalScope,
					'result with "(string) \'\', (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply('test', fs.sf1), globalScope,
					'result with "(string) \'test\', (function) sf1" parameters is incorrect');

				assert.strictEqual(helpLib.func.apply(NaN, fs.sf1), globalScope,
					'result with "NaN, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(Infinity, fs.sf1), globalScope,
					'result with "Infinity, (function) sf1" parameters is incorrect');
			});

			it('call with incorrect "callback" parameter', () => {
				assert.strictEqual(helpLib.func.apply(null, true), false,
					'result with "null, (bool) true" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(null, false), false,
					'result with "null, (bool) false" parameters is incorrect');

				assert.strictEqual(helpLib.func.apply(null, 0), false,
					'result with "null, (number) 0" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(null, 1), false,
					'result with "null, (number) 1" parameters is incorrect');

				assert.strictEqual(helpLib.func.apply(null, ''), false,
					'result with "null, (string) \'\'" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(null, 'test'), false,
					'result with "null, (string) \'test\'" parameters is incorrect');

				assert.strictEqual(helpLib.func.apply(null, []), false,
					'result with "null, (array) []" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(null, ['test']), false,
					'result with "null, (array) [\'test\']" parameters is incorrect');

				assert.strictEqual(helpLib.func.apply(null, {}), false,
					'result with "null, (object) {}" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(null, {test: 'test'}), false,
					'result with "null, (object) {test: \'test\'}" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(null, new Object()), false,
					'result with "null, (object) new Object()" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(null, new fs.f1()), false,
					'result with "null, (object) new f1()" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(null, new fs.f3()), false,
					'result with "null, (object) new f3()" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(null, new fs.f4()), false,
					'result with "null, (object) new f4()" parameters is incorrect');

				assert.strictEqual(helpLib.func.apply(null, NaN), false,
					'result with "null, NaN" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(null, Infinity), false,
					'result with "null, Infinity" parameters is incorrect');
			});

			it('call with incorrect "args" parameter', () => {
				assert.strictEqual(helpLib.func.apply(null, fs.f1, true), 'f1',
					'result with "null, (function) f1, (bool) true" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(null, fs.f1, false), 'f1',
					'result with "null, (function) f1, (bool) true" parameters is incorrect');

				assert.strictEqual(helpLib.func.apply(null, fs.f1, 0), 'f1',
					'result with "null, (function) f1, (number) 0" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(null, fs.f1, 1), 'f1',
					'result with "null, (function) f1, (number) 1" parameters is incorrect');

				assert.strictEqual(helpLib.func.apply(null, fs.f1, ''), 'f1',
					'result with "null, (function) f1, (string) \'\'" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(null, fs.f1, 'test'), 'f1',
					'result with "null, (function) f1, (string) \'test\'" parameters is incorrect');

				assert.strictEqual(helpLib.func.apply(null, fs.f1, {}), 'f1',
					'result with "null, (function) f1, (object) {}" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(null, fs.f1, {test: 'test'}), 'f1',
					'result with "null, (function) f1, (object) {test: \'test\'}" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(null, fs.f1, new Object()), 'f1',
					'result with "null, (function) f1, (object) new Object()" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(null, fs.f1, new fs.f1()), 'f1',
					'result with "null, (function) f1, (object) new fs.f1()" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(null, fs.f1, new fs.f3()), 'f1',
					'result with "null, (function) f1, (object) new fs.f3()" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(null, fs.f1, new fs.f4()), 'f1',
					'result with "null, (function) f1, (object) new fs.f4()" parameters is incorrect');

				assert.strictEqual(helpLib.func.apply(null, fs.f1, fs.f1), 'f1',
					'result with "null, (function) f1, (function) f1" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(null, fs.f1, fs.f2), 'f1',
					'result with "null, (function) f1, (function) f2" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(null, fs.f1, fs.f3), 'f1',
					'result with "null, (function) f1, (function) f3" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(null, fs.f1, fs.f4), 'f1',
					'result with "null, (function) f1, (function) f4" parameters is incorrect');

				assert.strictEqual(helpLib.func.apply(null, fs.f1, undefined), 'f1',
					'result with "null, (function) f1, undefined" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(null, fs.f1, null), 'f1',
					'result with "null, (function) f1, null" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(null, fs.f1, NaN), 'f1',
					'result with "null, (function) f1, NaN" parameters is incorrect');
				assert.strictEqual(helpLib.func.apply(null, fs.f1, Infinity), 'f1',
					'result with "null, (function) f1, Infinity" parameters is incorrect');
			});
		});

		describe('checking "saveApply" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.func.saveApply, 'function "apply" is not added or is not a function');
			});

			let globalScope = typeof window !== 'undefined' ? window : global;
			let objScope = {};
			let arrScope = [];
			let fs = getTestFuncs();

			it('checking a function calling without parameters', () => {
				assert.strictEqual(helpLib.func.saveApply(objScope, fs.f1, fs.rtf1), 'f1',
					'result with "(object) objScope, (function) f1, (function) rtf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(objScope, fs.f2, fs.rtf2), 'f2',
					'result with "(object) objScope, (function) f2, (function) rtf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(objScope, fs.f3, fs.rtf3), 'f3',
					'result with "(object) objScope, (function) f3, (function) rtf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(objScope, fs.f4, fs.rtf4), 'f4',
					'result with "(object) objScope, (function) f4, (function) rtf4" parameters is incorrect');
			});

			it('checking a function calling with parameters', () => {
				assert.strictEqual(helpLib.func.saveApply(objScope, fs.f1, fs.rtf1, ['-t']), 'f1-t',
					'result with "(object) objScope, (function) f1, (function) rtf1, (array) [\'-t\']" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(objScope, fs.f2, fs.rtf2, ['-t']), 'f2-t',
					'result with "(object) objScope, (function) f2, (function) rtf2, (array) [\'-t\']" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(objScope, fs.f3, fs.rtf3, ['-t']), 'f3-t',
					'result with "(object) objScope, (function) f3, (function) rtf3, (array) [\'-t\']" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(objScope, fs.f4, fs.rtf4, ['-t']), 'f4-t',
					'result with "(object) objScope, (function) f4, (function) rtf4, (array) [\'-t\']" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(objScope, fs.f1, fs.rtf1, ['-t', '-t']), 'f1-t-t',
					'result with "(object) objScope, (function) f1, (function) rtf1, (array) [\'-t\', \'-t\']" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(objScope, fs.f2, fs.rtf2, ['-t', '-t']), 'f2-t-t',
					'result with "(object) objScope, (function) f2, (function) rtf2, (array) [\'-t\', \'-t\']" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(objScope, fs.f3, fs.rtf3, ['-t', '-t']), 'f3-t-t',
					'result with "(object) objScope, (function) f3, (function) rtf3, (array) [\'-t\', \'-t\']" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(objScope, fs.f4, fs.rtf4, ['-t', '-t']), 'f4-t-t',
					'result with "(object) objScope, (function) f4, (function) rtf4, (array) [\'-t\', \'-t\']" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(objScope, fs.f1, fs.rtf1, ['-', [1, 2, 3]]), 'f1-1,2,3',
					'result with "(object) objScope, (function) f1, (function) rtf1, (array) [\'-\', [1, 2, 3]]" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(objScope, fs.f2, fs.rtf2, ['-', [1, 2, 3]]), 'f2-1,2,3',
					'result with "(object) objScope, (function) f2, (function) rtf2, (array) [\'-\', [1, 2, 3]]" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(objScope, fs.f3, fs.rtf3, ['-', [1, 2, 3]]), 'f3-1,2,3',
					'result with "(object) objScope, (function) f3, (function) rtf3, (array) [\'-\', [1, 2, 3]]" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(objScope, fs.f4, fs.rtf4, ['-', [1, 2, 3]]), 'f4-1,2,3',
					'result with "(object) objScope, (function) f4, (function) rtf4, (array) [\'-\', [1, 2, 3]]" parameters is incorrect');
			});

			it('checking a throwable functions', () => {
				assert.strictEqual(helpLib.func.saveApply(null, fs.tf1, fs.rtf1), 'rtf1-tf1',
					'result with "null, (function) tf1, (function) rtf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.tf2, fs.rtf1), 'rtf1-tf2',
					'result with "null, (function) tf2, (function) rtf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.tf3, fs.rtf1), 'rtf1-tf3',
					'result with "null, (function) tf3, (function) rtf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.tf4, fs.rtf1), 'rtf1-tf4',
					'result with "null, (function) tf4, (function) rtf1" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(null, fs.tf1, fs.rtf2), 'rtf2-tf1',
					'result with "null, (function) tf1, (function) rtf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.tf2, fs.rtf2), 'rtf2-tf2',
					'result with "null, (function) tf2, (function) rtf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.tf3, fs.rtf2), 'rtf2-tf3',
					'result with "null, (function) tf3, (function) rtf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.tf4, fs.rtf2), 'rtf2-tf4',
					'result with "null, (function) tf4, (function) rtf2" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(null, fs.tf1, fs.rtf3), 'rtf3-tf1',
					'result with "null, (function) tf1, (function) rtf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.tf2, fs.rtf3), 'rtf3-tf2',
					'result with "null, (function) tf2, (function) rtf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.tf3, fs.rtf3), 'rtf3-tf3',
					'result with "null, (function) tf3, (function) rtf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.tf4, fs.rtf3), 'rtf3-tf4',
					'result with "null, (function) tf4, (function) rtf3" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(null, fs.tf1, fs.rtf4), 'rtf4-tf1',
					'result with "null, (function) tf1, (function) rtf4" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.tf2, fs.rtf4), 'rtf4-tf2',
					'result with "null, (function) tf2, (function) rtf4" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.tf3, fs.rtf4), 'rtf4-tf3',
					'result with "null, (function) tf3, (function) rtf4" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.tf4, fs.rtf4), 'rtf4-tf4',
					'result with "null, (function) tf4, (function) rtf4" parameters is incorrect');

				assert.throws(helpLib.func.saveApply.bind(helpLib, null, fs.tf1, fs.tf4), Error, 'tf4',
					'result with "null, (function) tf1, (function) tf4" parameters is incorrect');
				assert.throws(helpLib.func.saveApply.bind(helpLib, null, fs.tf2, fs.tf3), Error, 'tf3',
					'result with "null, (function) tf2, (function) tf3" parameters is incorrect');
				assert.throws(helpLib.func.saveApply.bind(helpLib, null, fs.tf3, fs.tf2), Error, 'tf2',
					'result with "null, (function) tf3, (function) tf2" parameters is incorrect');
				assert.throws(helpLib.func.saveApply.bind(helpLib, null, fs.tf4, fs.tf1), Error, 'tf1',
					'result with "null, (function) tf4, (function) tf1" parameters is incorrect');
			});

			it('checking a scope of calling with a object as "scope" parameter', () => {
				assert.strictEqual(helpLib.func.saveApply(objScope, fs.sf1), objScope,
					'scope when executing a function with "(object) objScope, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(objScope, fs.sf2), globalScope,
					'scope when executing a function with "(object) objScope, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(objScope, fs.sf3), objScope,
					'scope when executing a function with "(object) objScope, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(objScope, fs.sf4), objScope,
					'scope when executing a function with "(object) objScope, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(arrScope, fs.sf1), arrScope,
					'scope when executing a function with "(object) arrScope, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(arrScope, fs.sf2), globalScope,
					'scope when executing a function with "(object) arrScope, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(arrScope, fs.sf3), arrScope,
					'scope when executing a function with "(object) arrScope, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(arrScope, fs.sf4), arrScope,
					'scope when executing a function with "(object) arrScope, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(objScope, fs.tf1, fs.sf1), objScope,
					'scope when executing a function with "(object) objScope, (function) tf1, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(objScope, fs.tf2, fs.sf2), globalScope,
					'scope when executing a function with "(object) objScope, (function) tf2, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(objScope, fs.tf3, fs.sf3), objScope,
					'scope when executing a function with "(object) objScope, (function) tf3, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(objScope, fs.tf4, fs.sf4), objScope,
					'scope when executing a function with "(object) objScope, (function) tf4, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(arrScope, fs.tf1, fs.sf1), arrScope,
					'scope when executing a function with "(object) arrScope, (function) tf1, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(arrScope, fs.tf2, fs.sf2), globalScope,
					'scope when executing a function with "(object) arrScope, (function) tf2, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(arrScope, fs.tf3, fs.sf3), arrScope,
					'scope when executing a function with "(object) arrScope, (function) tf3, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(arrScope, fs.tf4, fs.sf4), arrScope,
					'scope when executing a function with "(object) arrScope, (function) tf4, (function) sf4" parameters is incorrect');
			});

			it('checking a scope of calling with a function as "scope" parameter', () => {
				assert.strictEqual(helpLib.func.saveApply(Array, fs.sf1), Array,
					'scope when executing a function with "(function) Array, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(Array, fs.sf2), globalScope,
					'scope when executing a function with "(function) Array, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(Array, fs.sf3), Array,
					'scope when executing a function with "(function) Array, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(Array, fs.sf4), Array,
					'scope when executing a function with "(function) Array, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(fs.f1, fs.sf1), fs.f1,
					'scope when executing a function with "(function) f1, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(fs.f1, fs.sf2), globalScope,
					'scope when executing a function with "(function) f1, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(fs.f1, fs.sf3), fs.f1,
					'scope when executing a function with "(function) f1, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(fs.f1, fs.sf4), fs.f1,
					'scope when executing a function with "(function) f1, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(fs.f2, fs.sf1), fs.f2,
					'scope when executing a function with "(function) f2, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(fs.f2, fs.sf2), globalScope,
					'scope when executing a function with "(function) f2, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(fs.f2, fs.sf3), fs.f2,
					'scope when executing a function with "(function) f2, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(fs.f2, fs.sf4), fs.f2,
					'scope when executing a function with "(function) f2, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(fs.f3, fs.sf1), fs.f3,
					'scope when executing a function with "(function) f3, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(fs.f3, fs.sf2), globalScope,
					'scope when executing a function with "(function) f3, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(fs.f3, fs.sf3), fs.f3,
					'scope when executing a function with "(function) f3, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(fs.f3, fs.sf4), fs.f3,
					'scope when executing a function with "(function) f3, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(fs.f4, fs.sf1), fs.f4,
					'scope when executing a function with "(function) f4, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(fs.f4, fs.sf2), globalScope,
					'scope when executing a function with "(function) f4, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(fs.f4, fs.sf3), fs.f4,
					'scope when executing a function with "(function) f4, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(fs.f4, fs.sf4), fs.f4,
					'scope when executing a function with "(function) f4, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(Array, fs.tf1, fs.sf1), Array,
					'scope when executing a function with "(function) Array, (function) tf1, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(Array, fs.tf2, fs.sf2), globalScope,
					'scope when executing a function with "(function) Array, (function) tf2, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(Array, fs.tf3, fs.sf3), Array,
					'scope when executing a function with "(function) Array, (function) tf3, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(Array, fs.tf4, fs.sf4), Array,
					'scope when executing a function with "(function) Array, (function) tf4, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(fs.f1, fs.tf1, fs.sf1), fs.f1,
					'scope when executing a function with "(function) f1, (function) tf1, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(fs.f1, fs.tf2, fs.sf2), globalScope,
					'scope when executing a function with "(function) f1, (function) tf2, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(fs.f1, fs.tf3, fs.sf3), fs.f1,
					'scope when executing a function with "(function) f1, (function) tf3, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(fs.f1, fs.tf4, fs.sf4), fs.f1,
					'scope when executing a function with "(function) f1, (function) tf4, (function) sf4" parameters is incorrect');
			});

			it('checking a scope of calling with a global or this objects as "scope" parameter', () => {
				assert.strictEqual(helpLib.func.saveApply(globalScope, fs.sf1), globalScope,
					'scope when executing a function with "(object) globalScope, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(globalScope, fs.sf2), globalScope,
					'scope when executing a function with "(object) globalScope, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(globalScope, fs.sf3), globalScope,
					'scope when executing a function with "(object) globalScope, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(globalScope, fs.sf4), globalScope,
					'scope when executing a function with "(object) globalScope, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(this, fs.sf1), this,
					'scope when executing a function with "(object) this, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(this, fs.sf2), globalScope,
					'scope when executing a function with "(object) this, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(this, fs.sf3), this,
					'scope when executing a function with "(object) this, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(this, fs.sf4), this,
					'scope when executing a function with "(object) this, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(globalScope, fs.tf1, fs.sf1), globalScope,
					'scope when executing a function with "(object) globalScope, (function) tf1, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(globalScope, fs.tf2, fs.sf2), globalScope,
					'scope when executing a function with "(object) globalScope, (function) tf2, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(globalScope, fs.tf3, fs.sf3), globalScope,
					'scope when executing a function with "(object) globalScope, (function) tf3, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(globalScope, fs.tf4, fs.sf4), globalScope,
					'scope when executing a function with "(object) globalScope, (function) tf4, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(this, fs.tf1, fs.sf1), this,
					'scope when executing a function with "(object) this, (function) tf1, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(this, fs.tf2, fs.sf2), globalScope,
					'scope when executing a function with "(object) this, (function) tf2, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(this, fs.tf3, fs.sf3), this,
					'scope when executing a function with "(object) this, (function) tf3, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(this, fs.tf4, fs.sf4), this,
					'scope when executing a function with "(object) this, (function) tf4, (function) sf4" parameters is incorrect');
			});

			it('checking a scope of calling with a undefined or null as "scope" parameter', () => {
				assert.strictEqual(helpLib.func.saveApply(undefined, fs.sf1), globalScope,
					'scope when executing a function with "undefined, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(undefined, fs.sf2), globalScope,
					'scope when executing a function with "undefined, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(undefined, fs.sf3), globalScope,
					'scope when executing a function with "undefined, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(undefined, fs.sf4), globalScope,
					'scope when executing a function with "undefined, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(null, fs.sf1), globalScope,
					'scope when executing a function with "null, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.sf2), globalScope,
					'scope when executing a function with "null, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.sf3), globalScope,
					'scope when executing a function with "null, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.sf4), globalScope,
					'scope when executing a function with "null, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(undefined, fs.tf1, fs.sf1), globalScope,
					'scope when executing a function with "undefined, (function) tf1, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(undefined, fs.tf2, fs.sf2), globalScope,
					'scope when executing a function with "undefined, (function) tf2, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(undefined, fs.tf3, fs.sf3), globalScope,
					'scope when executing a function with "undefined, (function) tf3, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(undefined, fs.tf4, fs.sf4), globalScope,
					'scope when executing a function with "undefined, (function) tf4, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(null, fs.tf1, fs.sf1), globalScope,
					'scope when executing a function with "null, (function) tf1, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.tf2, fs.sf2), globalScope,
					'scope when executing a function with "null, (function) tf2, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.tf3, fs.sf3), globalScope,
					'scope when executing a function with "null, (function) tf3, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.tf4, fs.sf4), globalScope,
					'scope when executing a function with "null, (function) tf4, (function) sf4" parameters is incorrect');
			});

			it('call without parameters or with null or undefined values', () => {
				assert.strictEqual(helpLib.func.saveApply(), false, 'result without parameter is incorrect');

				assert.strictEqual(helpLib.func.saveApply(undefined), false,
					'result with "undefined" parameter is incorrect');
				assert.strictEqual(helpLib.func.saveApply(undefined, undefined), false,
					'result with "undefined, undefined" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(undefined, undefined, undefined), false,
					'result with "undefined, undefined, undefined" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(undefined, undefined, undefined, undefined), false,
					'result with "undefined, undefined, undefined, undefined" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(null), false,
					'result with "null" parameter is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, null), false,
					'result with "null, null" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, null, null), false,
					'result with "null, null, null" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, null, null, null), false,
					'result with "null, null, null, null" parameters is incorrect');
			});

			it('call with incorrect "scope" parameter', () => {
				assert.strictEqual(helpLib.func.saveApply(true, fs.sf1), globalScope,
					'result with "(bool) true, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(false, fs.sf1), globalScope,
					'result with "(bool) false, (function) sf1" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(0, fs.sf1), globalScope,
					'result with "(number) 0, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(1, fs.sf1), globalScope,
					'result with "(number) 1, (function) sf1" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply('', fs.sf1), globalScope,
					'result with "(string) \'\', (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply('test', fs.sf1), globalScope,
					'result with "(string) \'test\', (function) sf1" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(NaN, fs.sf1), globalScope,
					'result with "NaN, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(Infinity, fs.sf1), globalScope,
					'result with "Infinity, (function) sf1" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(true, fs.tf1, fs.sf1), globalScope,
					'result with "(bool) true, (function) tf1, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(false, fs.tf1, fs.sf1), globalScope,
					'result with "(bool) false, (function) tf1, (function) sf1" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(0, fs.tf1, fs.sf1), globalScope,
					'result with "(number) 0, (function) tf1, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(1, fs.tf1, fs.sf1), globalScope,
					'result with "(number) 1, (function) tf1, (function) sf1" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply('', fs.tf1, fs.sf1), globalScope,
					'result with "(string) \'\', (function) tf1, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply('test', fs.tf1, fs.sf1), globalScope,
					'result with "(string) \'test\', (function) tf1, (function) sf1" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(NaN, fs.tf1, fs.sf1), globalScope,
					'result with "NaN, (function) tf1, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(Infinity, fs.tf1, fs.sf1), globalScope,
					'result with "Infinity, (function) tf1, (function) sf1" parameters is incorrect');
			});

			it('call with incorrect "callback" parameter', () => {
				assert.strictEqual(helpLib.func.saveApply(null, true), false,
					'result with "null, (bool) true" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, false), false,
					'result with "null, (bool) false" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(null, 0), false,
					'result with "null, (number) 0" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, 1), false,
					'result with "null, (number) 1" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(null, ''), false,
					'result with "null, (string) \'\'" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, 'test'), false,
					'result with "null, (string) \'test\'" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(null, []), false,
					'result with "null, (array) []" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, ['test']), false,
					'result with "null, (array) [\'test\']" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(null, {}), false,
					'result with "null, (object) {}" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, {test: 'test'}), false,
					'result with "null, (object) {test: \'test\'}" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, new Object()), false,
					'result with "null, (object) new Object()" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, new fs.f1()), false,
					'result with "null, (object) new f1()" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, new fs.f3()), false,
					'result with "null, (object) new f3()" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, new fs.f4()), false,
					'result with "null, (object) new f4()" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(null, NaN), false,
					'result with "null, NaN" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, Infinity), false,
					'result with "null, Infinity" parameters is incorrect');
			});

			it('call with incorrect "errorCallback" parameter', () => {
				assert.strictEqual(helpLib.func.saveApply(null, fs.tf1, true), false,
					'result with "null, (function) tf1, (bool) true" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.tf1, false), false,
					'result with "null, (function) tf1, (bool) false" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(null, fs.tf1, 0), false,
					'result with "null, (function) tf1, (number) 0" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.tf1, 1), false,
					'result with "null, (function) tf1, (number) 1" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(null, fs.tf1, ''), false,
					'result with "null, (function) tf1, (string) \'\'" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.tf1, 'test'), false,
					'result with "null, (function) tf1, (string) \'test\'" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(null, fs.tf1, []), false,
					'result with "null, (function) tf1, (array) []" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.tf1, ['test']), false,
					'result with "null, (function) tf1, (array) [\'test\']" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(null, fs.tf1, {}), false,
					'result with "null, (function) tf1, (object) {}" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.tf1, {test: 'test'}), false,
					'result with "null, (function) tf1, (object) {test: \'test\'}" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.tf1, new Object()), false,
					'result with "null, (function) tf1, (object) new Object()" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.tf1, new fs.f1()), false,
					'result with "null, (function) tf1, (object) new f1()" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.tf1, new fs.f3()), false,
					'result with "null, (function) tf1, (object) new f3()" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.tf1, new fs.f4()), false,
					'result with "null, (function) tf1, (object) new f4()" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(null, fs.tf1, undefined), undefined,
					'result with "null, (function) tf1, undefined" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.tf1, null), false,
					'result with "null, (function) tf1, null" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.tf1, NaN), false,
					'result with "null, (function) tf1, NaN" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.tf1, Infinity), false,
					'result with "null, (function) tf1, Infinity" parameters is incorrect');
			});

			it('call with incorrect "args" parameter', () => {
				assert.strictEqual(helpLib.func.saveApply(null, fs.f1, fs.rtf1, true), 'f1',
					'result with "null, (function) f1, (function) rtf1, (bool) true" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.f1, fs.rtf1, false), 'f1',
					'result with "null, (function) f1, (function) rtf1, (bool) true" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(null, fs.f1, fs.rtf1, 0), 'f1',
					'result with "null, (function) f1, (function) rtf1, (number) 0" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.f1, fs.rtf1, 1), 'f1',
					'result with "null, (function) f1, (function) rtf1, (number) 1" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(null, fs.f1, fs.rtf1, ''), 'f1',
					'result with "null, (function) f1, (function) rtf1, (string) \'\'" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.f1, fs.rtf1, 'test'), 'f1',
					'result with "null, (function) f1, (function) rtf1, (string) \'test\'" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(null, fs.f1, fs.rtf1, {}), 'f1',
					'result with "null, (function) f1, (function) rtf1, (object) {}" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.f1, fs.rtf1, {test: 'test'}), 'f1',
					'result with "null, (function) f1, (function) rtf1, (object) {test: \'test\'}" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.f1, fs.rtf1, new Object()), 'f1',
					'result with "null, (function) f1, (function) rtf1, (object) new Object()" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.f1, fs.rtf1, new fs.f1()), 'f1',
					'result with "null, (function) f1, (function) rtf1, (object) new fs.f1()" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.f1, fs.rtf1, new fs.f3()), 'f1',
					'result with "null, (function) f1, (function) rtf1, (object) new fs.f3()" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.f1, fs.rtf1, new fs.f4()), 'f1',
					'result with "null, (function) f1, (function) rtf1, (object) new fs.f4()" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(null, fs.f1, fs.rtf1, fs.f1), 'f1',
					'result with "null, (function) f1, (function) rtf1, (function) f1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.f1, fs.rtf1, fs.f2), 'f1',
					'result with "null, (function) f1, (function) rtf1, (function) f2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.f1, fs.rtf1, fs.f3), 'f1',
					'result with "null, (function) f1, (function) rtf1, (function) f3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.f1, fs.rtf1, fs.f4), 'f1',
					'result with "null, (function) f1, (function) rtf1, (function) f4" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveApply(null, fs.f1, fs.rtf1, undefined), 'f1',
					'result with "null, (function) f1, (function) rtf1, undefined" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.f1, fs.rtf1, null), 'f1',
					'result with "null, (function) f1, (function) rtf1, null" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.f1, fs.rtf1, NaN), 'f1',
					'result with "null, (function) f1, (function) rtf1, NaN" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveApply(null, fs.f1, fs.rtf1, Infinity), 'f1',
					'result with "null, (function) f1, (function) rtf1, Infinity" parameters is incorrect');
			});
		});

		describe('checking "call" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.func.call, 'function "apply" is not added or is not a function');
			});

			let globalScope = typeof window !== 'undefined' ? window : global;
			let objScope = {};
			let arrScope = [];
			let fs = getTestFuncs();

			it('checking a function calling without parameters', () => {
				assert.strictEqual(helpLib.func.call(objScope, fs.f1), 'f1',
					'result with "(object) objScope, (function) f1" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(objScope, fs.f2), 'f2',
					'result with "(object) objScope, (function) f2" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(objScope, fs.f3), 'f3',
					'result with "(object) objScope, (function) f3" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(objScope, fs.f4), 'f4',
					'result with "(object) objScope, (function) f4" parameters is incorrect');
			});

			it('checking a function calling with parameters', () => {
				assert.strictEqual(helpLib.func.call(objScope, fs.f1, '-t'), 'f1-t',
					'result with "(object) objScope, (function) f1, (string) \'-t\'" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(objScope, fs.f2, '-t'), 'f2-t',
					'result with "(object) objScope, (function) f2, (string) \'-t\'" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(objScope, fs.f3, '-t'), 'f3-t',
					'result with "(object) objScope, (function) f3, (string) \'-t\'" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(objScope, fs.f4, '-t'), 'f4-t',
					'result with "(object) objScope, (function) f4, (string) \'-t\'" parameters is incorrect');

				assert.strictEqual(helpLib.func.call(objScope, fs.f1, '-t', '-t'), 'f1-t-t',
					'result with "(object) objScope, (function) f1, (string) \'-t\', (string) \'-t\'" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(objScope, fs.f2, '-t', '-t'), 'f2-t-t',
					'result with "(object) objScope, (function) f2, (string) \'-t\', (string) \'-t\'" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(objScope, fs.f3, '-t', '-t'), 'f3-t-t',
					'result with "(object) objScope, (function) f3, (string) \'-t\', (string) \'-t\'" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(objScope, fs.f4, '-t', '-t'), 'f4-t-t',
					'result with "(object) objScope, (function) f4, (string) \'-t\', (string) \'-t\'" parameters is incorrect');

				assert.strictEqual(helpLib.func.call(objScope, fs.f1, '-', [1, 2, 3]), 'f1-1,2,3',
					'result with "(object) objScope, (function) f1, (string) \'-\', (array) [1, 2, 3]" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(objScope, fs.f2, '-', [1, 2, 3]), 'f2-1,2,3',
					'result with "(object) objScope, (function) f2, (string) \'-\', (array) [1, 2, 3]" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(objScope, fs.f3, '-', [1, 2, 3]), 'f3-1,2,3',
					'result with "(object) objScope, (function) f3, (string) \'-\', (array) [1, 2, 3]" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(objScope, fs.f4, '-', [1, 2, 3]), 'f4-1,2,3',
					'result with "(object) objScope, (function) f4, (string) \'-\', (array) [1, 2, 3]" parameters is incorrect');
			});

			it('checking a function calling with null or undefined values of parameters', () => {
				assert.strictEqual(helpLib.func.call(objScope, fs.f1, '-', undefined), 'f1-',
					'result with "(object) objScope, (function) f1, (string) \'-\', undefined" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(objScope, fs.f2, '-', undefined), 'f2-',
					'result with "(object) objScope, (function) f2, (string) \'-\', undefined" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(objScope, fs.f3, '-', undefined), 'f3-',
					'result with "(object) objScope, (function) f3, (string) \'-\', undefined" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(objScope, fs.f4, '-', undefined), 'f4-',
					'result with "(object) objScope, (function) f4, (string) \'-\', undefined" parameters is incorrect');

				assert.strictEqual(helpLib.func.call(objScope, fs.f1, '-', null), 'f1-null',
					'result with "(object) objScope, (function) f1, (string) \'-\', null" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(objScope, fs.f2, '-', null), 'f2-null',
					'result with "(object) objScope, (function) f2, (string) \'-\', null" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(objScope, fs.f3, '-', null), 'f3-null',
					'result with "(object) objScope, (function) f3, (string) \'-\', null" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(objScope, fs.f4, '-', null), 'f4-null',
					'result with "(object) objScope, (function) f4, (string) \'-\', null" parameters is incorrect');
			});

			it('checking a scope of calling with a object as "scope" parameter', () => {
				assert.strictEqual(helpLib.func.call(objScope, fs.sf1), objScope,
					'scope when executing a function with "(object) objScope, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(objScope, fs.sf2), globalScope,
					'scope when executing a function with "(object) objScope, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(objScope, fs.sf3), objScope,
					'scope when executing a function with "(object) objScope, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(objScope, fs.sf4), objScope,
					'scope when executing a function with "(object) objScope, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.call(arrScope, fs.sf1), arrScope,
					'scope when executing a function with "(object) arrScope, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(arrScope, fs.sf2), globalScope,
					'scope when executing a function with "(object) arrScope, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(arrScope, fs.sf3), arrScope,
					'scope when executing a function with "(object) arrScope, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(arrScope, fs.sf4), arrScope,
					'scope when executing a function with "(object) arrScope, (function) sf4" parameters is incorrect');
			});

			it('checking a scope of calling with a function as "scope" parameter', () => {
				assert.strictEqual(helpLib.func.call(Array, fs.sf1), Array,
					'scope when executing a function with "(function) Array, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(Array, fs.sf2), globalScope,
					'scope when executing a function with "(function) Array, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(Array, fs.sf3), Array,
					'scope when executing a function with "(function) Array, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(Array, fs.sf4), Array,
					'scope when executing a function with "(function) Array, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.call(fs.f1, fs.sf1), fs.f1,
					'scope when executing a function with "(function) f1, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(fs.f1, fs.sf2), globalScope,
					'scope when executing a function with "(function) f1, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(fs.f1, fs.sf3), fs.f1,
					'scope when executing a function with "(function) f1, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(fs.f1, fs.sf4), fs.f1,
					'scope when executing a function with "(function) f1, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.call(fs.f2, fs.sf1), fs.f2,
					'scope when executing a function with "(function) f2, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(fs.f2, fs.sf2), globalScope,
					'scope when executing a function with "(function) f2, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(fs.f2, fs.sf3), fs.f2,
					'scope when executing a function with "(function) f2, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(fs.f2, fs.sf4), fs.f2,
					'scope when executing a function with "(function) f2, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.call(fs.f3, fs.sf1), fs.f3,
					'scope when executing a function with "(function) f3, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(fs.f3, fs.sf2), globalScope,
					'scope when executing a function with "(function) f3, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(fs.f3, fs.sf3), fs.f3,
					'scope when executing a function with "(function) f3, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(fs.f3, fs.sf4), fs.f3,
					'scope when executing a function with "(function) f3, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.call(fs.f4, fs.sf1), fs.f4,
					'scope when executing a function with "(function) f4, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(fs.f4, fs.sf2), globalScope,
					'scope when executing a function with "(function) f4, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(fs.f4, fs.sf3), fs.f4,
					'scope when executing a function with "(function) f4, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(fs.f4, fs.sf4), fs.f4,
					'scope when executing a function with "(function) f4, (function) sf4" parameters is incorrect');
			});

			it('checking a scope of calling with a global or this objects as "scope" parameter', () => {
				assert.strictEqual(helpLib.func.call(globalScope, fs.sf1), globalScope,
					'scope when executing a function with "(object) globalScope, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(globalScope, fs.sf2), globalScope,
					'scope when executing a function with "(object) globalScope, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(globalScope, fs.sf3), globalScope,
					'scope when executing a function with "(object) globalScope, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(globalScope, fs.sf4), globalScope,
					'scope when executing a function with "(object) globalScope, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.call(this, fs.sf1), this,
					'scope when executing a function with "(object) this, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(this, fs.sf2), globalScope,
					'scope when executing a function with "(object) this, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(this, fs.sf3), this,
					'scope when executing a function with "(object) this, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(this, fs.sf4), this,
					'scope when executing a function with "(object) this, (function) sf4" parameters is incorrect');
			});

			it('checking a scope of calling with a undefined or null as "scope" parameter', () => {
				assert.strictEqual(helpLib.func.call(undefined, fs.sf1), globalScope,
					'scope when executing a function with "undefined, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(undefined, fs.sf2), globalScope,
					'scope when executing a function with "undefined, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(undefined, fs.sf3), globalScope,
					'scope when executing a function with "undefined, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(undefined, fs.sf4), globalScope,
					'scope when executing a function with "undefined, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.call(null, fs.sf1), globalScope,
					'scope when executing a function with "null, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(null, fs.sf2), globalScope,
					'scope when executing a function with "null, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(null, fs.sf3), globalScope,
					'scope when executing a function with "null, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(null, fs.sf4), globalScope,
					'scope when executing a function with "null, (function) sf4" parameters is incorrect');
			});

			it('checking a throwable functions', () => {
				assert.throws(helpLib.func.call.bind(helpLib, null, fs.tf1), Error, 'tf1',
					'result with "null, (function) tf1" parameters is incorrect');
				assert.throws(helpLib.func.call.bind(helpLib, null, fs.tf2), Error, 'tf2',
					'result with "null, (function) tf2" parameters is incorrect');
				assert.throws(helpLib.func.call.bind(helpLib, null, fs.tf3), Error, 'tf3',
					'result with "null, (function) tf3" parameters is incorrect');
				assert.throws(helpLib.func.call.bind(helpLib, null, fs.tf4), Error, 'tf4',
					'result with "null, (function) tf4" parameters is incorrect');
			});

			it('call without parameters or with null or undefined values', () => {
				assert.strictEqual(helpLib.func.call(), false, 'result without parameter is incorrect');

				assert.strictEqual(helpLib.func.call(undefined), false,
					'result with "undefined" parameter is incorrect');
				assert.strictEqual(helpLib.func.call(undefined, undefined), false,
					'result with "undefined, undefined" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(undefined, undefined, undefined), false,
					'result with "undefined, undefined, undefined" parameters is incorrect');

				assert.strictEqual(helpLib.func.call(null), false, 'result with "null" parameter is incorrect');
				assert.strictEqual(helpLib.func.call(null, null), false, 'result with "null, null" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(null, null, null), false, 'result with "null, null, null" parameters is incorrect');
			});

			it('call with incorrect "scope" parameter', () => {
				assert.strictEqual(helpLib.func.call(true, fs.sf1), globalScope,
					'result with "(bool) true, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(false, fs.sf1), globalScope,
					'result with "(bool) false, (function) sf1" parameters is incorrect');

				assert.strictEqual(helpLib.func.call(0, fs.sf1), globalScope,
					'result with "(number) 0, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(1, fs.sf1), globalScope,
					'result with "(number) 1, (function) sf1" parameters is incorrect');

				assert.strictEqual(helpLib.func.call('', fs.sf1), globalScope,
					'result with "(string) \'\', (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.call('test', fs.sf1), globalScope,
					'result with "(string) \'test\', (function) sf1" parameters is incorrect');

				assert.strictEqual(helpLib.func.call(NaN, fs.sf1), globalScope,
					'result with "NaN, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(Infinity, fs.sf1), globalScope,
					'result with "Infinity, (function) sf1" parameters is incorrect');
			});

			it('call with incorrect "callback" parameter', () => {
				assert.strictEqual(helpLib.func.call(null, true), false,
					'result with "null, (bool) true" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(null, false), false,
					'result with "null, (bool) false" parameters is incorrect');

				assert.strictEqual(helpLib.func.call(null, 0), false,
					'result with "null, (number) 0" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(null, 1), false,
					'result with "null, (number) 1" parameters is incorrect');

				assert.strictEqual(helpLib.func.call(null, ''), false,
					'result with "null, (string) \'\'" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(null, 'test'), false,
					'result with "null, (string) \'test\'" parameters is incorrect');

				assert.strictEqual(helpLib.func.call(null, []), false,
					'result with "null, (array) []" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(null, ['test']), false,
					'result with "null, (array) [\'test\']" parameters is incorrect');

				assert.strictEqual(helpLib.func.call(null, {}), false,
					'result with "null, (object) {}" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(null, {test: 'test'}), false,
					'result with "null, (object) {test: \'test\'}" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(null, new Object()), false,
					'result with "null, (object) new Object()" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(null, new fs.f1()), false,
					'result with "null, (object) new f1()" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(null, new fs.f3()), false,
					'result with "null, (object) new f3()" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(null, new fs.f4()), false,
					'result with "null, (object) new f4()" parameters is incorrect');

				assert.strictEqual(helpLib.func.call(null, NaN), false,
					'result with "null, NaN" parameters is incorrect');
				assert.strictEqual(helpLib.func.call(null, Infinity), false,
					'result with "null, Infinity" parameters is incorrect');
			});
		});

		describe('checking "saveCall" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.func.saveCall, 'function "apply" is not added or is not a function');
			});

			let globalScope = typeof window !== 'undefined' ? window : global;
			let objScope = {};
			let arrScope = [];
			let fs = getTestFuncs();

			it('checking a function calling without parameters', () => {
				assert.strictEqual(helpLib.func.saveCall(objScope, fs.f1, fs.rtf1), 'f1',
					'result with "(object) objScope, (function) f1, (function) rtf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(objScope, fs.f2, fs.rtf2), 'f2',
					'result with "(object) objScope, (function) f2, (function) rtf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(objScope, fs.f3, fs.rtf3), 'f3',
					'result with "(object) objScope, (function) f3, (function) rtf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(objScope, fs.f4, fs.rtf4), 'f4',
					'result with "(object) objScope, (function) f4, (function) rtf4" parameters is incorrect');
			});

			it('checking a function calling with parameters', () => {
				assert.strictEqual(helpLib.func.saveCall(objScope, fs.f1, fs.rtf1, '-t'), 'f1-t',
					'result with "(object) objScope, (function) f1, (function) rtf1, (string) \'-t\'" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(objScope, fs.f2, fs.rtf2, '-t'), 'f2-t',
					'result with "(object) objScope, (function) f2, (function) rtf2, (string) \'-t\'" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(objScope, fs.f3, fs.rtf3, '-t'), 'f3-t',
					'result with "(object) objScope, (function) f3, (function) rtf3, (string) \'-t\'" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(objScope, fs.f4, fs.rtf4, '-t'), 'f4-t',
					'result with "(object) objScope, (function) f4, (function) rtf4, (string) \'-t\'" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(objScope, fs.f1, fs.rtf1, '-t', '-t'), 'f1-t-t',
					'result with "(object) objScope, (function) f1, (function) rtf1, (string) \'-t\', (string) \'-t\'" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(objScope, fs.f2, fs.rtf2, '-t', '-t'), 'f2-t-t',
					'result with "(object) objScope, (function) f2, (function) rtf2, (string) \'-t\', (string) \'-t\'" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(objScope, fs.f3, fs.rtf3, '-t', '-t'), 'f3-t-t',
					'result with "(object) objScope, (function) f3, (function) rtf3, (string) \'-t\', (string) \'-t\'" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(objScope, fs.f4, fs.rtf4, '-t', '-t'), 'f4-t-t',
					'result with "(object) objScope, (function) f4, (function) rtf4, (string) \'-t\', (string) \'-t\'" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(objScope, fs.f1, fs.rtf1, '-', [1, 2, 3]), 'f1-1,2,3',
					'result with "(object) objScope, (function) f1, (function) rtf1, (string) \'-\', (array) [1, 2, 3]" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(objScope, fs.f2, fs.rtf2, '-', [1, 2, 3]), 'f2-1,2,3',
					'result with "(object) objScope, (function) f2, (function) rtf2, (string) \'-\', (array) [1, 2, 3]" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(objScope, fs.f3, fs.rtf3, '-', [1, 2, 3]), 'f3-1,2,3',
					'result with "(object) objScope, (function) f3, (function) rtf3, (string) \'-\', (array) [1, 2, 3]" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(objScope, fs.f4, fs.rtf4, '-', [1, 2, 3]), 'f4-1,2,3',
					'result with "(object) objScope, (function) f4, (function) rtf4, (string) \'-\', (array) [1, 2, 3]" parameters is incorrect');
			});

			it('checking a function calling with null or undefined values of parameters', () => {
				assert.strictEqual(helpLib.func.saveCall(objScope, fs.f1, fs.rtf1, '-', undefined), 'f1-',
					'result with "(object) objScope, (function) f1, (function) rtf1, (string) \'-\', undefined" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(objScope, fs.f2, fs.rtf2, '-', undefined), 'f2-',
					'result with "(object) objScope, (function) f2, (function) rtf2, (string) \'-\', undefined" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(objScope, fs.f3, fs.rtf3, '-', undefined), 'f3-',
					'result with "(object) objScope, (function) f3, (function) rtf3, (string) \'-\', undefined" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(objScope, fs.f4, fs.rtf4, '-', undefined), 'f4-',
					'result with "(object) objScope, (function) f4, (function) rtf4, (string) \'-\', undefined" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(objScope, fs.f1, fs.rtf1, '-', null), 'f1-null',
					'result with "(object) objScope, (function) f1, (function) rtf1, (string) \'-\', null" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(objScope, fs.f2, fs.rtf2, '-', null), 'f2-null',
					'result with "(object) objScope, (function) f2, (function) rtf2, (string) \'-\', null" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(objScope, fs.f3, fs.rtf3, '-', null), 'f3-null',
					'result with "(object) objScope, (function) f3, (function) rtf3, (string) \'-\', null" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(objScope, fs.f4, fs.rtf4, '-', null), 'f4-null',
					'result with "(object) objScope, (function) f4, (function) rtf4, (string) \'-\', null" parameters is incorrect');
			});

			it('checking a throwable functions', () => {
				assert.strictEqual(helpLib.func.saveCall(null, fs.tf1, fs.rtf1), 'rtf1-tf1',
					'result with "null, (function) tf1, (function) rtf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, fs.tf2, fs.rtf1), 'rtf1-tf2',
					'result with "null, (function) tf2, (function) rtf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, fs.tf3, fs.rtf1), 'rtf1-tf3',
					'result with "null, (function) tf3, (function) rtf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, fs.tf4, fs.rtf1), 'rtf1-tf4',
					'result with "null, (function) tf4, (function) rtf1" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(null, fs.tf1, fs.rtf2), 'rtf2-tf1',
					'result with "null, (function) tf1, (function) rtf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, fs.tf2, fs.rtf2), 'rtf2-tf2',
					'result with "null, (function) tf2, (function) rtf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, fs.tf3, fs.rtf2), 'rtf2-tf3',
					'result with "null, (function) tf3, (function) rtf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, fs.tf4, fs.rtf2), 'rtf2-tf4',
					'result with "null, (function) tf4, (function) rtf2" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(null, fs.tf1, fs.rtf3), 'rtf3-tf1',
					'result with "null, (function) tf1, (function) rtf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, fs.tf2, fs.rtf3), 'rtf3-tf2',
					'result with "null, (function) tf2, (function) rtf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, fs.tf3, fs.rtf3), 'rtf3-tf3',
					'result with "null, (function) tf3, (function) rtf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, fs.tf4, fs.rtf3), 'rtf3-tf4',
					'result with "null, (function) tf4, (function) rtf3" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(null, fs.tf1, fs.rtf4), 'rtf4-tf1',
					'result with "null, (function) tf1, (function) rtf4" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, fs.tf2, fs.rtf4), 'rtf4-tf2',
					'result with "null, (function) tf2, (function) rtf4" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, fs.tf3, fs.rtf4), 'rtf4-tf3',
					'result with "null, (function) tf3, (function) rtf4" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, fs.tf4, fs.rtf4), 'rtf4-tf4',
					'result with "null, (function) tf4, (function) rtf4" parameters is incorrect');

				assert.throws(helpLib.func.saveCall.bind(helpLib, null, fs.tf1, fs.tf4), Error, 'tf4',
					'result with "null, (function) tf1, (function) tf4" parameters is incorrect');
				assert.throws(helpLib.func.saveCall.bind(helpLib, null, fs.tf2, fs.tf3), Error, 'tf3',
					'result with "null, (function) tf2, (function) tf3" parameters is incorrect');
				assert.throws(helpLib.func.saveCall.bind(helpLib, null, fs.tf3, fs.tf2), Error, 'tf2',
					'result with "null, (function) tf3, (function) tf2" parameters is incorrect');
				assert.throws(helpLib.func.saveCall.bind(helpLib, null, fs.tf4, fs.tf1), Error, 'tf1',
					'result with "null, (function) tf4, (function) tf1" parameters is incorrect');
			});

			it('checking a scope of calling with a object as "scope" parameter', () => {
				assert.strictEqual(helpLib.func.saveCall(objScope, fs.sf1), objScope,
					'scope when executing a function with "(object) objScope, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(objScope, fs.sf2), globalScope,
					'scope when executing a function with "(object) objScope, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(objScope, fs.sf3), objScope,
					'scope when executing a function with "(object) objScope, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(objScope, fs.sf4), objScope,
					'scope when executing a function with "(object) objScope, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(arrScope, fs.sf1), arrScope,
					'scope when executing a function with "(object) arrScope, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(arrScope, fs.sf2), globalScope,
					'scope when executing a function with "(object) arrScope, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(arrScope, fs.sf3), arrScope,
					'scope when executing a function with "(object) arrScope, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(arrScope, fs.sf4), arrScope,
					'scope when executing a function with "(object) arrScope, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(objScope, fs.tf1, fs.sf1), objScope,
					'scope when executing a function with "(object) objScope, (function) tf1, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(objScope, fs.tf2, fs.sf2), globalScope,
					'scope when executing a function with "(object) objScope, (function) tf2, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(objScope, fs.tf3, fs.sf3), objScope,
					'scope when executing a function with "(object) objScope, (function) tf3, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(objScope, fs.tf4, fs.sf4), objScope,
					'scope when executing a function with "(object) objScope, (function) tf4, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(arrScope, fs.tf1, fs.sf1), arrScope,
					'scope when executing a function with "(object) arrScope, (function) tf1, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(arrScope, fs.tf2, fs.sf2), globalScope,
					'scope when executing a function with "(object) arrScope, (function) tf2, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(arrScope, fs.tf3, fs.sf3), arrScope,
					'scope when executing a function with "(object) arrScope, (function) tf3, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(arrScope, fs.tf4, fs.sf4), arrScope,
					'scope when executing a function with "(object) arrScope, (function) tf4, (function) sf4" parameters is incorrect');
			});

			it('checking a scope of calling with a function as "scope" parameter', () => {
				assert.strictEqual(helpLib.func.saveCall(Array, fs.sf1), Array,
					'scope when executing a function with "(function) Array, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(Array, fs.sf2), globalScope,
					'scope when executing a function with "(function) Array, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(Array, fs.sf3), Array,
					'scope when executing a function with "(function) Array, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(Array, fs.sf4), Array,
					'scope when executing a function with "(function) Array, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(fs.f1, fs.sf1), fs.f1,
					'scope when executing a function with "(function) f1, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(fs.f1, fs.sf2), globalScope,
					'scope when executing a function with "(function) f1, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(fs.f1, fs.sf3), fs.f1,
					'scope when executing a function with "(function) f1, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(fs.f1, fs.sf4), fs.f1,
					'scope when executing a function with "(function) f1, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(fs.f2, fs.sf1), fs.f2,
					'scope when executing a function with "(function) f2, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(fs.f2, fs.sf2), globalScope,
					'scope when executing a function with "(function) f2, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(fs.f2, fs.sf3), fs.f2,
					'scope when executing a function with "(function) f2, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(fs.f2, fs.sf4), fs.f2,
					'scope when executing a function with "(function) f2, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(fs.f3, fs.sf1), fs.f3,
					'scope when executing a function with "(function) f3, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(fs.f3, fs.sf2), globalScope,
					'scope when executing a function with "(function) f3, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(fs.f3, fs.sf3), fs.f3,
					'scope when executing a function with "(function) f3, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(fs.f3, fs.sf4), fs.f3,
					'scope when executing a function with "(function) f3, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(fs.f4, fs.sf1), fs.f4,
					'scope when executing a function with "(function) f4, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(fs.f4, fs.sf2), globalScope,
					'scope when executing a function with "(function) f4, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(fs.f4, fs.sf3), fs.f4,
					'scope when executing a function with "(function) f4, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(fs.f4, fs.sf4), fs.f4,
					'scope when executing a function with "(function) f4, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(Array, fs.tf1, fs.sf1), Array,
					'scope when executing a function with "(function) Array, (function) tf1, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(Array, fs.tf2, fs.sf2), globalScope,
					'scope when executing a function with "(function) Array, (function) tf2, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(Array, fs.tf3, fs.sf3), Array,
					'scope when executing a function with "(function) Array, (function) tf3, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(Array, fs.tf4, fs.sf4), Array,
					'scope when executing a function with "(function) Array, (function) tf4, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(fs.f1, fs.tf1, fs.sf1), fs.f1,
					'scope when executing a function with "(function) f1, (function) tf1, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(fs.f1, fs.tf2, fs.sf2), globalScope,
					'scope when executing a function with "(function) f1, (function) tf2, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(fs.f1, fs.tf3, fs.sf3), fs.f1,
					'scope when executing a function with "(function) f1, (function) tf3, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(fs.f1, fs.tf4, fs.sf4), fs.f1,
					'scope when executing a function with "(function) f1, (function) tf4, (function) sf4" parameters is incorrect');
			});

			it('checking a scope of calling with a global or this objects as "scope" parameter', () => {
				assert.strictEqual(helpLib.func.saveCall(globalScope, fs.sf1), globalScope,
					'scope when executing a function with "(object) globalScope, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(globalScope, fs.sf2), globalScope,
					'scope when executing a function with "(object) globalScope, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(globalScope, fs.sf3), globalScope,
					'scope when executing a function with "(object) globalScope, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(globalScope, fs.sf4), globalScope,
					'scope when executing a function with "(object) globalScope, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(this, fs.sf1), this,
					'scope when executing a function with "(object) this, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(this, fs.sf2), globalScope,
					'scope when executing a function with "(object) this, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(this, fs.sf3), this,
					'scope when executing a function with "(object) this, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(this, fs.sf4), this,
					'scope when executing a function with "(object) this, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(globalScope, fs.tf1, fs.sf1), globalScope,
					'scope when executing a function with "(object) globalScope, (function) tf1, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(globalScope, fs.tf2, fs.sf2), globalScope,
					'scope when executing a function with "(object) globalScope, (function) tf2, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(globalScope, fs.tf3, fs.sf3), globalScope,
					'scope when executing a function with "(object) globalScope, (function) tf3, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(globalScope, fs.tf4, fs.sf4), globalScope,
					'scope when executing a function with "(object) globalScope, (function) tf4, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(this, fs.tf1, fs.sf1), this,
					'scope when executing a function with "(object) this, (function) tf1, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(this, fs.tf2, fs.sf2), globalScope,
					'scope when executing a function with "(object) this, (function) tf2, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(this, fs.tf3, fs.sf3), this,
					'scope when executing a function with "(object) this, (function) tf3, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(this, fs.tf4, fs.sf4), this,
					'scope when executing a function with "(object) this, (function) tf4, (function) sf4" parameters is incorrect');
			});

			it('checking a scope of calling with a undefined or null as "scope" parameter', () => {
				assert.strictEqual(helpLib.func.saveCall(undefined, fs.sf1), globalScope,
					'scope when executing a function with "undefined, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(undefined, fs.sf2), globalScope,
					'scope when executing a function with "undefined, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(undefined, fs.sf3), globalScope,
					'scope when executing a function with "undefined, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(undefined, fs.sf4), globalScope,
					'scope when executing a function with "undefined, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(null, fs.sf1), globalScope,
					'scope when executing a function with "null, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, fs.sf2), globalScope,
					'scope when executing a function with "null, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, fs.sf3), globalScope,
					'scope when executing a function with "null, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, fs.sf4), globalScope,
					'scope when executing a function with "null, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(undefined, fs.tf1, fs.sf1), globalScope,
					'scope when executing a function with "undefined, (function) tf1, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(undefined, fs.tf2, fs.sf2), globalScope,
					'scope when executing a function with "undefined, (function) tf2, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(undefined, fs.tf3, fs.sf3), globalScope,
					'scope when executing a function with "undefined, (function) tf3, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(undefined, fs.tf4, fs.sf4), globalScope,
					'scope when executing a function with "undefined, (function) tf4, (function) sf4" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(null, fs.tf1, fs.sf1), globalScope,
					'scope when executing a function with "null, (function) tf1, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, fs.tf2, fs.sf2), globalScope,
					'scope when executing a function with "null, (function) tf2, (function) sf2" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, fs.tf3, fs.sf3), globalScope,
					'scope when executing a function with "null, (function) tf3, (function) sf3" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, fs.tf4, fs.sf4), globalScope,
					'scope when executing a function with "null, (function) tf4, (function) sf4" parameters is incorrect');
			});

			it('call without parameters or with null or undefined values', () => {
				assert.strictEqual(helpLib.func.saveCall(), false, 'result without parameter is incorrect');

				assert.strictEqual(helpLib.func.saveCall(undefined), false,
					'result with "undefined" parameter is incorrect');
				assert.strictEqual(helpLib.func.saveCall(undefined, undefined), false,
					'result with "undefined, undefined" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(undefined, undefined, undefined), false,
					'result with "undefined, undefined, undefined" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(undefined, undefined, undefined, undefined), false,
					'result with "undefined, undefined, undefined, undefined" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(null), false,
					'result with "null" parameter is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, null), false,
					'result with "null, null" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, null, null), false,
					'result with "null, null, null" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, null, null, null), false,
					'result with "null, null, null, null" parameters is incorrect');
			});

			it('call with incorrect "scope" parameter', () => {
				assert.strictEqual(helpLib.func.saveCall(true, fs.sf1), globalScope,
					'result with "(bool) true, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(false, fs.sf1), globalScope,
					'result with "(bool) false, (function) sf1" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(0, fs.sf1), globalScope,
					'result with "(number) 0, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(1, fs.sf1), globalScope,
					'result with "(number) 1, (function) sf1" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall('', fs.sf1), globalScope,
					'result with "(string) \'\', (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall('test', fs.sf1), globalScope,
					'result with "(string) \'test\', (function) sf1" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(NaN, fs.sf1), globalScope,
					'result with "NaN, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(Infinity, fs.sf1), globalScope,
					'result with "Infinity, (function) sf1" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(true, fs.tf1, fs.sf1), globalScope,
					'result with "(bool) true, (function) tf1, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(false, fs.tf1, fs.sf1), globalScope,
					'result with "(bool) false, (function) tf1, (function) sf1" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(0, fs.tf1, fs.sf1), globalScope,
					'result with "(number) 0, (function) tf1, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(1, fs.tf1, fs.sf1), globalScope,
					'result with "(number) 1, (function) tf1, (function) sf1" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall('', fs.tf1, fs.sf1), globalScope,
					'result with "(string) \'\', (function) tf1, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall('test', fs.tf1, fs.sf1), globalScope,
					'result with "(string) \'test\', (function) tf1, (function) sf1" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(NaN, fs.tf1, fs.sf1), globalScope,
					'result with "NaN, (function) tf1, (function) sf1" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(Infinity, fs.tf1, fs.sf1), globalScope,
					'result with "Infinity, (function) tf1, (function) sf1" parameters is incorrect');
			});

			it('call with incorrect "callback" parameter', () => {
				assert.strictEqual(helpLib.func.saveCall(null, true), false,
					'result with "null, (bool) true" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, false), false,
					'result with "null, (bool) false" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(null, 0), false,
					'result with "null, (number) 0" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, 1), false,
					'result with "null, (number) 1" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(null, ''), false,
					'result with "null, (string) \'\'" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, 'test'), false,
					'result with "null, (string) \'test\'" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(null, []), false,
					'result with "null, (array) []" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, ['test']), false,
					'result with "null, (array) [\'test\']" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(null, {}), false,
					'result with "null, (object) {}" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, {test: 'test'}), false,
					'result with "null, (object) {test: \'test\'}" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, new Object()), false,
					'result with "null, (object) new Object()" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, new fs.f1()), false,
					'result with "null, (object) new f1()" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, new fs.f3()), false,
					'result with "null, (object) new f3()" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, new fs.f4()), false,
					'result with "null, (object) new f4()" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(null, NaN), false,
					'result with "null, NaN" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, Infinity), false,
					'result with "null, Infinity" parameters is incorrect');
			});

			it('call with incorrect "errorCallback" parameter', () => {
				assert.strictEqual(helpLib.func.saveCall(null, fs.tf1, true), false,
					'result with "null, (function) tf1, (bool) true" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, fs.tf1, false), false,
					'result with "null, (function) tf1, (bool) false" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(null, fs.tf1, 0), false,
					'result with "null, (function) tf1, (number) 0" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, fs.tf1, 1), false,
					'result with "null, (function) tf1, (number) 1" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(null, fs.tf1, ''), false,
					'result with "null, (function) tf1, (string) \'\'" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, fs.tf1, 'test'), false,
					'result with "null, (function) tf1, (string) \'test\'" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(null, fs.tf1, []), false,
					'result with "null, (function) tf1, (array) []" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, fs.tf1, ['test']), false,
					'result with "null, (function) tf1, (array) [\'test\']" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(null, fs.tf1, {}), false,
					'result with "null, (function) tf1, (object) {}" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, fs.tf1, {test: 'test'}), false,
					'result with "null, (function) tf1, (object) {test: \'test\'}" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, fs.tf1, new Object()), false,
					'result with "null, (function) tf1, (object) new Object()" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, fs.tf1, new fs.f1()), false,
					'result with "null, (function) tf1, (object) new f1()" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, fs.tf1, new fs.f3()), false,
					'result with "null, (function) tf1, (object) new f3()" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, fs.tf1, new fs.f4()), false,
					'result with "null, (function) tf1, (object) new f4()" parameters is incorrect');

				assert.strictEqual(helpLib.func.saveCall(null, fs.tf1, undefined), undefined,
					'result with "null, (function) tf1, undefined" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, fs.tf1, null), false,
					'result with "null, (function) tf1, null" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, fs.tf1, NaN), false,
					'result with "null, (function) tf1, NaN" parameters is incorrect');
				assert.strictEqual(helpLib.func.saveCall(null, fs.tf1, Infinity), false,
					'result with "null, (function) tf1, Infinity" parameters is incorrect');
			});
		});
	});
};