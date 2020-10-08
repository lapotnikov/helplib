/**
 * Testing common library of helpLib
 * @author Artyom Lapotnikov <lapotnikov@gmail.com>
 * @copyright Artyom Lapotnikov
 * @license MIT
 */

/**
 * Create the export variable in the browser
 * If the testing happens in browser then the value of export variable is a window
 */
exports = typeof window !== 'undefined' ? window : exports;

exports.testCommon = (describe, it, assert, helpLib) => {
	/**
	 * If common library is not exist in current version of helpLib, then we shouldn't test it
	 */
	if(helpLib.libList['_common'] === undefined) {
		return;
	}

	describe('Test common library', () => {
		describe('checking "isSet" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.isSet, 'function "isSet" is not added or is not a function');
			});

			it('call with parameters who must exist', () => {
				assert.isTrue(helpLib.isSet(true), 'result with "(bool) true" parameter is incorrect');
				assert.isTrue(helpLib.isSet(false), 'result with "(bool) false" parameter is incorrect');

				assert.isTrue(helpLib.isSet(0), 'result with "(number) 0" parameter is incorrect');
				assert.isTrue(helpLib.isSet(1), 'result with "(number) 1" parameter is incorrect');

				assert.isTrue(helpLib.isSet(''), 'result with "(string) \'\'" parameter is incorrect');
				assert.isTrue(helpLib.isSet('test'), 'result with "(string) \'test\'" parameter is incorrect');

				assert.isTrue(helpLib.isSet([]), 'result with "(array) []" parameter is incorrect');
				assert.isTrue(helpLib.isSet(['test']), 'result with "(array) [\'test\']" parameter is incorrect');

				assert.isTrue(helpLib.isSet({}), 'result with "(object) {}" parameter is incorrect');
				assert.isTrue(helpLib.isSet({test: 'test'}), 'result with "(object) {test: \'test\'}" parameter is incorrect');

				assert.isTrue(helpLib.isSet(() => {}), 'result with "function" parameter is incorrect');

				assert.isTrue(helpLib.isSet(NaN), 'result with "NaN" parameter is incorrect');
				assert.isTrue(helpLib.isSet(Infinity), 'result with "Infinity" parameter is incorrect');
			});

			it('call with parameters who must not exist', () => {
				assert.isFalse(helpLib.isSet(undefined), 'result with "undefined" parameter is incorrect');
				assert.isFalse(helpLib.isSet(null), 'result with "null" parameter is incorrect');
			});
		});

		describe('checking "isScalar" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.isScalar, 'function "isScalar" is not added or is not a function');
			});

			it('call with scalar parameters', () => {
				assert.isTrue(helpLib.isScalar(true), 'result with "(bool) true" parameter is incorrect');
				assert.isTrue(helpLib.isScalar(false), 'result with "(bool) false" parameter is incorrect');

				assert.isTrue(helpLib.isScalar(0), 'result with "(number) 0" parameter is incorrect');
				assert.isTrue(helpLib.isScalar(1), 'result with "(number) 1" parameter is incorrect');

				assert.isTrue(helpLib.isScalar(''), 'result with "(string) \'\'" parameter is incorrect');
				assert.isTrue(helpLib.isScalar('test'), 'result with "(string) \'test\'" parameter is incorrect');

				assert.isTrue(helpLib.isScalar(NaN), 'result with "NaN" parameter is incorrect');
				assert.isTrue(helpLib.isScalar(Infinity), 'result with "Infinity" parameter is incorrect');
			});

			it('call with not scalar parameters', () => {
				assert.isFalse(helpLib.isScalar([]), 'result with "(array) []" parameter is incorrect');
				assert.isFalse(helpLib.isScalar(['test']), 'result with "(array) [\'test\'])" parameter is incorrect');

				assert.isFalse(helpLib.isScalar({}), 'result with "(object) {}" parameter is incorrect');
				assert.isFalse(helpLib.isScalar({test: 'test'}), 'result with "(object) {test: \'test\'}" parameter is incorrect');

				assert.isFalse(helpLib.isScalar(() => {}), 'result with "function" parameter is incorrect');

				assert.isFalse(helpLib.isScalar(undefined), 'result with "undefined" parameter is incorrect');
				assert.isFalse(helpLib.isScalar(null), 'result with "null" parameter is incorrect');
			});
		});

		describe('checking "isEmpty" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.isEmpty, 'function "isEmpty" is not added or is not a function');
			});

			it('call with parameters who must be empty', () => {
				assert.isTrue(helpLib.isEmpty(false), 'result with "(bool) false" parameter is incorrect');
				assert.isTrue(helpLib.isEmpty(0), 'result with "(number) 0" parameter is incorrect');
				assert.isTrue(helpLib.isEmpty(''), 'result with "(string) \'\'" parameter is incorrect');
				assert.isTrue(helpLib.isEmpty('  '), 'result with "(string) \'  \'" parameter is incorrect');
				assert.isTrue(helpLib.isEmpty("\n"), 'result with "(string) \'\n\'" parameter is incorrect');
				assert.isTrue(helpLib.isEmpty("\t"), 'result with "(string) \'\t\'" parameter is incorrect');
				assert.isTrue(helpLib.isEmpty("\n \t \n"), 'result with "(string) \'\n \t \n\'" parameter is incorrect');

				assert.isTrue(helpLib.isEmpty([]), 'result with "(array) []" parameter is incorrect');
				assert.isTrue(helpLib.isEmpty({}), 'result with "(object) {}" parameter is incorrect');

				assert.isTrue(helpLib.isEmpty(NaN), 'result with "NaN" parameter is incorrect');
				assert.isTrue(helpLib.isEmpty(undefined), 'result with "undefined" parameter is incorrect');
				assert.isTrue(helpLib.isEmpty(null), 'result with "null" parameter is incorrect');
			});

			it('call with parameters who must not be empty', () => {
				assert.isFalse(helpLib.isEmpty(true), 'result with "(bool) true" parameter is incorrect');
				assert.isFalse(helpLib.isEmpty(1), 'result with "(number) 1" parameter is incorrect');
				assert.isFalse(helpLib.isEmpty(-1), 'result with "(number) -1" parameter is incorrect');
				assert.isFalse(helpLib.isEmpty('test'), 'result with "(string) \'test\'" parameter is incorrect');
				assert.isFalse(helpLib.isEmpty('0'), 'result with "(string) \'0\'" parameter is incorrect');
				assert.isFalse(helpLib.isEmpty('  1  '), 'result with "(string) \'  1  \'" parameter is incorrect');

				assert.isFalse(helpLib.isEmpty(['test']), 'result with "(array) [\'test\'])" parameter is incorrect');
				assert.isFalse(helpLib.isEmpty({test: 'test'}), 'result with "(object) {test: \'test\'}" parameter is incorrect');
				assert.isFalse(helpLib.isEmpty(() => {}), 'result with "function" parameter is incorrect');

				assert.isFalse(helpLib.isEmpty(Infinity), 'result with "Infinity" parameter is incorrect');
			});
		});

		describe('checking "isInstance" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.isInstance, 'function "isInstance" is not added or is not a function');
			});

			function Test(a) {this.a = a;}
			class STest extends Test {};

			it('checking the object instance to the current class', () => {
				assert.isTrue(helpLib.isInstance({}, {}),
					'result with "(object) {}, (object) {}" parameters is incorrect');
				assert.isTrue(helpLib.isInstance({}, {test: 'test'}),
					'result with "(object) {}, (object) {test: \'test\'}" parameters is incorrect');
				assert.isTrue(helpLib.isInstance({}, Object),
					'result with "(object) {}, (object) Object" parameters is incorrect');
				assert.isTrue(helpLib.isInstance({}, new Object()),
					'result with "(object) {}, (object) new Object()" parameters is incorrect');
				assert.isTrue(helpLib.isInstance({}, 'Object'),
					'result with "(object) {}, (string) \'Object\'" parameters is incorrect');

				assert.isTrue(helpLib.isInstance({test: 'test'}, {}),
					'result with "(object) {test: \'test\'}, (object) {}" parameters is incorrect');
				assert.isTrue(helpLib.isInstance({test: 'test'}, new Object()),
					'result with "(object) {test: \'test\'}, (object) new Object()" parameters is incorrect');
				assert.isTrue(helpLib.isInstance({test: 'test'}, 'Object'),
					'result with "(object) {test: \'test\'}, (string) \'Object\'" parameters is incorrect');

				assert.isTrue(helpLib.isInstance(new Object(), {}),
					'result with "(object) new Object(), (object) {}" parameters is incorrect');
				assert.isTrue(helpLib.isInstance(new Object(), {test: 'test'}),
					'result with "(object) {}, (object) {test: \'test\'}" parameters is incorrect');
				assert.isTrue(helpLib.isInstance(new Object(), Object),
					'result with "(object) new Object(), (object) Object" parameters is incorrect');
				assert.isTrue(helpLib.isInstance(new Object(), new Object()),
					'result with "(object) new Object(), (object) new Object()" parameters is incorrect');
				assert.isTrue(helpLib.isInstance(new Object(), 'Object'),
					'result with "(object) new Object(), (string) \'Object\'" parameters is incorrect');

				assert.isTrue(helpLib.isInstance(new Date(), Date),
					'result with "(object) new Date(), (object) Date" parameters is incorrect');
				assert.isTrue(helpLib.isInstance(new Date(), new Date()),
					'result with "(object) new Date(), (object) new Date()" parameters is incorrect');
				assert.isTrue(helpLib.isInstance(new Date(), new Date('1995-12-17T03:24:00')),
					'result with "(object) new Date(), (object) new Date(\'1995-12-17T03:24:00\')" parameters is incorrect');
				assert.isTrue(helpLib.isInstance(new Date(), 'Date'),
					'result with "(object) new Date(), (string) \'Date\'" parameters is incorrect');

				assert.isTrue(helpLib.isInstance(new Date('1995-12-17T03:24:00'), Date),
					'result with "(object) new Date(\'1995-12-17T03:24:00\'), (object) Date" parameters is incorrect');
				assert.isTrue(helpLib.isInstance(new Date('1995-12-17T03:24:00'), new Date()),
					'result with "(object) new Date(\'1995-12-17T03:24:00\'), (object) new Date()" parameters is incorrect');
				assert.isTrue(helpLib.isInstance(new Date('1995-12-17T03:24:00'), 'Date'),
					'result with "(object) new Date(\'1995-12-17T03:24:00\'), (string) \'Date\'" parameters is incorrect');
			});

			it('checking the object instance to the parent classes', () => {
				assert.isTrue(helpLib.isInstance(new Date(), {}),
					'result with "(object) new Date(), (object) {}" parameters is incorrect');
				assert.isTrue(helpLib.isInstance(new Date(), {test: 'test'}),
					'result with "(object) new Date(), (object) {test: \'test\'}" parameters is incorrect');
				assert.isTrue(helpLib.isInstance(new Date(), Object),
					'result with "(object) new Date(), (object) Object" parameters is incorrect');
				assert.isTrue(helpLib.isInstance(new Date(), new Object()),
					'result with "(object) new Date(), (object) new Object()" parameters is incorrect');
				assert.isTrue(helpLib.isInstance(new Date(), 'Object'),
					'result with "(object) new Date(), (string) \'Object\'" parameters is incorrect');


				assert.isTrue(helpLib.isInstance(new Date('1995-12-17T03:24:00'), {}),
					'result with "(object) new Date(\'1995-12-17T03:24:00\'), (object) {}" parameters is incorrect');
				assert.isTrue(helpLib.isInstance(new Date('1995-12-17T03:24:00'), {test: 'test'}),
					'result with "(object) new Date(\'1995-12-17T03:24:00\'), (object) {test: \'test\'}" parameters is incorrect');
				assert.isTrue(helpLib.isInstance(new Date('1995-12-17T03:24:00'), Object),
					'result with "(object) new Date(\'1995-12-17T03:24:00\'), (object) Object" parameters is incorrect');
				assert.isTrue(helpLib.isInstance(new Date('1995-12-17T03:24:00'), new Object()),
					'result with "(object) new Date(\'1995-12-17T03:24:00\'), (object) new Object()" parameters is incorrect');
				assert.isTrue(helpLib.isInstance(new Date('1995-12-17T03:24:00'), 'Object'),
					'result with "(object) new Date(\'1995-12-17T03:24:00\'), (string) \'Object\'" parameters is incorrect');
			});

			it('checking the object instance of custom class to the current class or parent classes', () => {
				assert.isTrue(helpLib.isInstance(new Test(1), {}),
					'result with "(object) new Test(1), (object) {}" parameters is incorrect');
				assert.isTrue(helpLib.isInstance(new Test(1), Test),
					'result with "(object) new Test(1), (object) Test" parameters is incorrect');
				assert.isTrue(helpLib.isInstance(new Test(1), Object),
					'result with "(object) new Test(1), (object) Object" parameters is incorrect');
				assert.isTrue(helpLib.isInstance(new Test(1), new Test(2)),
					'result with "(object) new Test(1), (object) new Test(2)" parameters is incorrect');
				assert.isTrue(helpLib.isInstance(new Test(1), 'Test'),
					'result with "(object) new Test(1), (string) \'Test\'" parameters is incorrect');
				assert.isTrue(helpLib.isInstance(new Test(1), 'Object'),
					'result with "(object) new Test(1), (string) \'Object\'" parameters is incorrect');

				assert.isTrue(helpLib.isInstance(new STest(1), Test),
					'result with "(object) new STest(1), (object) Test" parameters is incorrect');
				assert.isTrue(helpLib.isInstance(new STest(1), STest),
					'result with "(object) new STest(1), (object) STest" parameters is incorrect');
				assert.isTrue(helpLib.isInstance(new STest(1), Object),
					'result with "(object) new STest(1), (object) Object" parameters is incorrect');
				assert.isTrue(helpLib.isInstance(new STest(1), new Test(2)),
					'result with "(object) new STest(1), (object) new Test(2)" parameters is incorrect');
				assert.isTrue(helpLib.isInstance(new STest(1), new STest(2)),
					'result with "(object) new STest(1), (object) new STest(2)" parameters is incorrect');
				assert.isTrue(helpLib.isInstance(new STest(1), new Object()),
					'result with "(object) new STest(1), (object) new Object()" parameters is incorrect');
			});

			it('call without parameters or with null or undefined values', () => {
				assert.isFalse(helpLib.isInstance(), 'result without parameters is incorrect');

				assert.isFalse(helpLib.isInstance(undefined),
					'result with "undefined" parameter is incorrect');
				assert.isFalse(helpLib.isInstance(undefined, undefined),
					'result with "undefined, undefined" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(undefined, undefined, undefined),
					'result with "undefined, undefined, undefined" parameters is incorrect');

				assert.isFalse(helpLib.isInstance(null), 'result with "null" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(null, null), 'result with "null, null" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(null, null, null), 'result with "null, null, null" parameters is incorrect');
			});

			it('call with incorrect "obj" parameter', () => {
				assert.isFalse(helpLib.isInstance(true, {}), 'result with "(bool) true, (object) {}" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(true, Boolean), 'result with "(bool) true, (object) Boolean" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(true, 'boolean'), 'result with "(bool) true, (string) \'boolean\'" parameters is incorrect');

				assert.isFalse(helpLib.isInstance(0, {}), 'result with "(number) 0, (object) {}" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(0, Number), 'result with "(number) 0, (object) Number" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(0, 'number'), 'result with "(number) 0, (string) \'number\'" parameters is incorrect');

				assert.isFalse(helpLib.isInstance('', {}), 'result with "(object) \'\', (object) {}" parameters is incorrect');
				assert.isFalse(helpLib.isInstance('', String), 'result with "(object) \'\', (object) String" parameters is incorrect');
				assert.isFalse(helpLib.isInstance('', 'string'), 'result with "(object) \'\', (string) \'string\'" parameters is incorrect');

				assert.isFalse(helpLib.isInstance(() => {}, {}),
					'result with "function, (object) {}" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(() => {}, Function),
					'result with "function, (object) Function" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(() => {}, new Function()),
					'result with "function, (object) new Function()" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(() => {}, 'function'),
					'result with "function, (string) \'function\'" parameters is incorrect');

				assert.isFalse(helpLib.isInstance(new Function(), {}),
					'result with "(object) new Function(), (object) {}" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(new Function(), Function),
					'result with "(object) new Function(), (object) Function" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(new Function(), new Function()),
					'result with "(object) new Function(), (object) new Function()" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(new Function(), 'function'),
					'result with "(object) new Function(), (string) \'function\'" parameters is incorrect');

				assert.isFalse(helpLib.isInstance(NaN, {}), 'result with "NaN, (object) {}" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(NaN, NaN), 'result with "NaN, NaN" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(NaN, Number), 'result with "NaN, (object) Number" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(NaN, 'number'), 'result with "NaN, (string) \'number\'" parameters is incorrect');

				assert.isFalse(helpLib.isInstance(Infinity, {}), 'result with "Infinity, (object) {}" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(Infinity, Infinity), 'result with "Infinity, Infinity" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(Infinity, Number), 'result with "Infinity, (object) Number" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(Infinity, 'number'), 'result with "Infinity, (string) \'number\'" parameters is incorrect');

				assert.isFalse(helpLib.isInstance(undefined, {}),
					'result with "undefined, (object) {}" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(undefined, undefined),
					'result with "undefined, undefined" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(undefined, 'undefined'),
					'result with "undefined, (string) \'undefined\'" parameters is incorrect');

				assert.isFalse(helpLib.isInstance(null, {}), 'result with "null, (object) {}" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(null, null), 'result with "null, null" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(null, 'null'), 'result with "null, (string) \'null\'" parameters is incorrect');
			});

			it('checking the object instance to the classes who not included in extends chain', () => {
				assert.isFalse(helpLib.isInstance({}, Array),
					'result with "(object) {}, (object) Array" parameters is incorrect');
				assert.isFalse(helpLib.isInstance({}, () => {}),
					'result with "(object) {}, function" parameters is incorrect');
				assert.isFalse(helpLib.isInstance({}, undefined),
					'result with "(object) {}, undefined" parameters is incorrect');
				assert.isFalse(helpLib.isInstance({}, null),
					'result with "(object) {}, null" parameters is incorrect');
				assert.isFalse(helpLib.isInstance({}, NaN),
					'result with "(object) {}, NaN" parameters is incorrect');
				assert.isFalse(helpLib.isInstance({}, Infinity),
					'result with "(object) {}, Infinity" parameters is incorrect');
				assert.isFalse(helpLib.isInstance({}, new Array()),
					'result with "(object) {}, (object) new Array()" parameters is incorrect');
				assert.isFalse(helpLib.isInstance({}, 'Array'),
					'result with "(object) {}, (string) \'Array\'" parameters is incorrect');

				assert.isFalse(helpLib.isInstance(new Object(), Array),
					'result with "(object) new Object(), (object) Array" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(new Object(), new Array()),
					'result with "(object) new Object(), (object) new Array()" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(new Object(), 'Array'),
					'result with "(object) new Object(), (string) \'Array\'" parameters is incorrect');
			});

			it('checking the object instance to the parent classes only in first level of extends chain', () => {
				assert.isTrue(helpLib.isInstance([], [], true),
					'result with "(array) [], (array) [], (bool) true" parameters is incorrect');
				assert.isFalse(helpLib.isInstance([], {}, true),
					'result with "(array) [], (object) {}, (bool) true" parameters is incorrect');
				assert.isFalse(helpLib.isInstance([], Object, true),
					'result with "(array) [], (object) Object, (bool) true" parameters is incorrect');
				assert.isFalse(helpLib.isInstance([], new Object(), true),
					'result with "(array) [], (object) new Object(), (bool) true" parameters is incorrect');
				assert.isFalse(helpLib.isInstance([], 'Object', true),
					'result with "(array) [], (string) \'Object\', (bool) true" parameters is incorrect');

				assert.isTrue(helpLib.isInstance(new Array(), [], true),
					'result with "(array) new Array(), (array) [], (bool) true" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(new Array(), {}, true),
					'result with "(array) new Array(), (object) {}, (bool) true" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(new Array(), Object, true),
					'result with "(array) new Array(), (object) Object, (bool) true" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(new Array(), new Object(), true),
					'result with "(array) new Array(), (object) new Object(), (bool) true" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(new Array(), 'Object', true),
					'result with "(array) new Array(), (string) \'Object\', (bool) true" parameters is incorrect');
			});

			it('checking the object instance of custom class to the classes who not included in extends chain', () => {
				assert.isFalse(helpLib.isInstance(new Test(1), STest),
					'result with "(object) new Test(1), (object) STest" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(new Test(1), new STest(1)),
					'result with "(object) new Test(1), (object) new STest(1)" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(new Test(1), 'STest'),
					'result with "(object) new Test(1), (string) \'STest\'" parameters is incorrect');
			});

			it('checking the object instance of custom class to the parent classes only in first level of extends chain', () => {
				assert.isTrue(helpLib.isInstance(new STest(1), STest, true),
					'result with "(object) new STest(1), (object) STest, (bool) true" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(new STest(1), {}, true),
					'result with "(object) new STest(1), (object) {}, (bool) true" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(new STest(1), Object, true),
					'result with "(object) new STest(1), (object) Object, (bool) true" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(new STest(1), Test, true),
					'result with "(object) new STest(1), (object) Test, (bool) true" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(new STest(1), new Object(), true),
					'result with "(object) new STest(1), (object) new Object(), (bool) true" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(new STest(1), new Test(), true),
					'result with "(object) new STest(1), (object) new Test(), (bool) true" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(new STest(1), 'Object', true),
					'result with "(object) new STest(1), (string) \'Object\', (bool) true" parameters is incorrect');
				assert.isFalse(helpLib.isInstance(new STest(1), 'Test', true),
					'result with "(object) new STest(1), (string) \'Test\', (bool) true" parameters is incorrect');
			});
		});
	});
};