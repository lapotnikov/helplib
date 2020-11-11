/**
 * Testing common module of helpLib
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

exports.testCommon = (describe, it, assert, helpLib) => {
	/**
	 * If common module is not exist in current version of helpLib, then we shouldn't test it
	 */
	if(helpLib.modList['_common'] === undefined) {
		return;
	}

	/**
	 * Creates a set of parameters for tests
	 * @returns {object} A set of parameters
	 */
	function getParams() {
		return {
			strE: [
				['', `(string) ''`], [' ', `(string) ' '`], ['  ', `(string) '  '`],

				['\n', `(string) '\\n'`], [' \n', `(string) ' \\n'`], ['\n  ', `(string) '\\n  '`],
				['\t', `(string) '\\t'`], [' \t', `(string) ' \\t'`], ['\t  ', `(string) '\\t  '`],
				['\n\n', `(string) '\\n\\n'`], [' \n\n', `(string) ' \\n\\n'`], ['\n\n  ', `(string) '\\n\\n  '`],
				['\t\t', `(string) '\\t\\t'`], [' \t\t', `(string) ' \\t\\t'`], ['\t\t  ', `(string) '\\t\\t  '`],
				['\t\n', `(string) '\\t\\n'`], [' \n\t', `(string) ' \\n\\t'`],
				['\t\n ', `(string) '\\t\\n '`], [' \n\t', `(string) ' \\n\\t'`],
				['\t \n', `(string) '\\t \\n'`], [' \n \t ', `(string) ' \\n \\t '`],

				['\u00A0', `(string) '\\u00A0'`], [' \u00A0', `(string) ' \\u00A0'`], ['\u00A0 ', `(string) '\\u00A0 '`],
				['\u00A0\u00A0', `(string) '\\u00A0\\u00A0'`], [' \u00A0\u00A0', `(string) ' \\u00A0\\u00A0'`],
				['\u00A0\u00A0 ', `(string) '\\u00A0\\u00A0 '`], ['\u00A0 \u00A0', `(string) '\\u00A0 \\u00A0'`],
				[' \u00A0 \u00A0 ', `(string) ' \\u00A0 \\u00A0 '`],

				['\t\u00A0', `(string) '\\t\\u00A0'`], ['\u00A0\t', `(string) '\\u00A0\\t'`],
				['\t \u00A0', `(string) '\\t \\u00A0'`], ['\u00A0 \t', `(string) '\\u00A0 \\t'`],
				['\n\u00A0', `(string) '\\n\\u00A0'`], ['\u00A0\n', `(string) '\\u00A0\\n'`],
				['\n \u00A0', `(string) '\\n \\u00A0'`], ['\u00A0 \n', `(string) '\\u00A0 \\n'`]
			],

			strNE: [
				['0', `(string) '0'`], [' 0 ', `(string) ' 0 '`],
				['\t1', `(string) '\\t1'`], ['\n1', `(string) '\\n1'`], ['\u00A01', `(string) '\\u00A01'`],
				['test', `(string) 'test'`], [' test ', `(string) ' test '`]
			],

			numE: [[0, `(number) 0`], [-0, `(number) -0`], [NaN, `NaN`]],

			numNE: [
				[1, `(number) 1`], [-1, `(number) -1`],
				[100, `(number) 100`], [-100, `(number) -100`],
				[5.55, `(number) 5.55`], [-5.55, `(number) -5.55`],

				[Infinity, `Infinity`], [-Infinity, `-Infinity`]
			],

			arrE: [[[], `(array) []`], [new Array(), `(array) new Array()`], [new Array(1), `(array) new Array(1)`]],

			arrNE: [
				[[0], `(array) [0]`], [[1], `(array) [1]`], [[1, 2], `(array) [1, 2]`],

				[[''], `(array) ['']`], [[' '], `(array) [' ']`],
				[['', ''], `(array) ['', '']`], [[' ', ' '], `(array) [' ', ' ']`],
				[['test'], `(array) ['test']`], [[' test '], `(array) [' test ']`],
				[['test', 'test'], `(array) ['test', 'test']`], [[' test ', ' test '], `(array) [' test ', ' test ']`],

				[[null], `(array) [null]`], [[undefined], `(array) [undefined]`]
			],

			objE: [
				[{}, `(object) {}`], [new Object(), `(object) new Object()`],
				[new (class {init() {return 'test';}}), `(object) new (class {init() {return 'test';}})`]
			],

			objNE: [
				[{test: 'test'}, `(object) {test: 'test'}`], [{test: ' test '}, `(object) {test: ' test '}`],
				[{toString: () => ''}, `(object) {toString: () => ''}`], [{toString: () => ' '}, `(object) {toString: () => ' '}`],
				[{toString: () => 'test'}, `(object) {toString: () => 'test'}`],
				[{toString: () => ' test '}, `(object) {toString: () => ' test '}`],
				[new (class {constructor() {this.a = 'test';}}), `(object) new (class {constructor() {this.a = 'test';}})`]
			],

			func: [
				[() => {}, `(function) () => {}`],
				[() => 'test', `(function) () => 'test'`, `() => 'test'`],
				[function() {}, `(function) function() {}`, `function() {}`],
				[function() {return 'test';}, `(function) function() {return 'test';}`, `function() {return 'test';}`]
			],

			boolE: [[false, `(bool) false`]],
			boolNE: [[true, `(bool) true`]],
			notset: [[undefined, `undefined`], [null, `null`]]
		};
	}

	describe('Test common module', () => {
		describe('checking "isSet" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.isSet, 'function "isSet" is not added or is not a function');
			});

			let params = getParams();

			it('call with parameters who must exist', () => {
				let setParams = params.strE.concat(params.strNE, params.numE, params.numNE,
					params.arrE, params.arrNE, params.objE, params.objNE, params.func, params.boolE, params.boolNE);

				for(let p in setParams) {
					assert.isTrue(helpLib.isSet(setParams[p][0]), `result with "${setParams[p][1]}" parameter is incorrect`);
				}
			});

			it('call with parameters who must not exist', () => {
				for(let p in params.notset) {
					assert.isFalse(helpLib.isSet(params.notset[p][0]), `result with "${params.notset[p][1]}" parameter is incorrect`);
				}
			});
		});

		describe('checking "isScalar" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.isScalar, 'function "isScalar" is not added or is not a function');
			});

			let params = getParams();

			it('call with scalar parameters', () => {
				let scalarParams = params.strE.concat(params.strNE, params.numE, params.numNE, params.boolE, params.boolNE);
				for(let p in scalarParams) {
					assert.isTrue(helpLib.isScalar(scalarParams[p][0]), `result with "${scalarParams[p][1]}" parameter is incorrect`);
				}
			});

			it('call with not scalar parameters', () => {
				let notScalarParams = params.arrE.concat(params.arrE, params.arrNE, params.objE, params.objNE, params.func, params.notset);
				for(let p in notScalarParams) {
					assert.isFalse(helpLib.isScalar(notScalarParams[p][0]), `result with "${notScalarParams[p][1]}" parameter is incorrect`);
				}
			});
		});

		describe('checking "isEmpty" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.isEmpty, 'function "isEmpty" is not added or is not a function');
			});

			let params = getParams();

			it('call with parameters who must be empty', () => {
				let emptyParams = params.strE.concat(params.numE, params.arrE, params.objE, params.boolE, params.notset);
				for(let p in emptyParams) {
					assert.isTrue(helpLib.isEmpty(emptyParams[p][0]), `result with "${emptyParams[p][1]}" parameter is incorrect`);
				}
			});

			it('call with parameters who must not be empty', () => {
				let notEmptyParams = params.strNE.concat(params.numNE, params.arrNE, params.objNE, params.boolNE, params.func);
				for(let p in notEmptyParams) {
					assert.isFalse(helpLib.isEmpty(notEmptyParams[p][0]), `result with "${notEmptyParams[p][1]}" parameter is incorrect`);
				}
			});
		});

		describe('checking "isInstance" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.isInstance, 'function "isInstance" is not added or is not a function');
			});

			function Test(a) {this.a = a;};
			class STest extends Test {constructor(a, b) {super(a); this.b = b;}};

			let params = getParams();

			params.obj = [
				[{}, `(object) {}`], [new Object(), `(object) new Object()`],
				[{test: 'test'}, `(object) {test: 'test'}`],
				[{toString: () => 'test'}, `(object) {toString: () => 'test'}`]
			];

			params.objDate = [[new Date(), `(object) new Date()`], [new Date('1995-12-17T03:24:00'), `(object) new Date('1995-12-17T03:24:00')`]];
			params.objTest = [[new Test(), `(object) new Test()`], [new Test(1), `(object) new Test(1)`]];

			params.objSTest = [
				[new STest(), `(object) new STest()`], [new STest(100), `(object) new STest(100)`],
				[new STest(10, 20), `(object) new STest(10, 20)`]
			];

			params.unset = [
				[[], `without parameters`],
				[[null], `with "null" parameter`], [[null, null], `with "null, null" parameters`],
				[[null, null, null], `with "null, null, null" parameters`],
				[[undefined], `with "undefined" parameter`], [[undefined, undefined], `with "undefined, undefined" parameters`],
				[[undefined, undefined, undefined], `with "undefined, undefined, undefined" parameters`]
			];

			it('checking the object instance to the current class, ' +
				'to the object of current class or to the string with name of current class', () => {
				let allParams = [
					[Object, params.obj], [Array, params.arrE.concat(params.arrNE)],
					[Date, params.objDate], [Test, params.objTest], [STest, params.objSTest]
				];

				for(let p1 in allParams) {
					for(let p2 in allParams[p1][1]) {
						for(let p3 in allParams[p1][1]) {
							assert.isTrue(helpLib.isInstance(allParams[p1][1][p2][0], allParams[p1][0]),
								`result with "${allParams[p1][1][p2][1]}, (object) ${allParams[p1][0].name}" parameters is incorrect`);
							assert.isTrue(helpLib.isInstance(allParams[p1][1][p2][0], allParams[p1][0].name),
								`result with "${allParams[p1][1][p2][1]}, (string) ${allParams[p1][0].name}" parameters is incorrect`);
							assert.isTrue(helpLib.isInstance(allParams[p1][1][p2][0], allParams[p1][1][p3][0]),
								`result with "${allParams[p1][1][p2][1]}, ${allParams[p1][1][p3][1]}" parameters is incorrect`);
						}
					}
				}
			});

			it('checking the object instance only in first level of the extends chain to the current class, ' +
				'to the object of current class or to the string with name of current class', () => {
				let allParams = [
					[Object, params.obj], [Array, params.arrE.concat(params.arrNE)],
					[Date, params.objDate], [Test, params.objTest], [STest, params.objSTest]
				];

				for(let p1 in allParams) {
					for(let p2 in allParams[p1][1]) {
						for(let p3 in allParams[p1][1]) {
							assert.isTrue(helpLib.isInstance(allParams[p1][1][p2][0], allParams[p1][0], true),
								`result with "${allParams[p1][1][p2][1]}, (object) ${allParams[p1][0].name}" parameters is incorrect`);
							assert.isTrue(helpLib.isInstance(allParams[p1][1][p2][0], allParams[p1][0].name, true),
								`result with "${allParams[p1][1][p2][1]}, (string) ${allParams[p1][0].name}" parameters is incorrect`);
							assert.isTrue(helpLib.isInstance(allParams[p1][1][p2][0], allParams[p1][1][p3][0], true),
								`result with "${allParams[p1][1][p2][1]}, ${allParams[p1][1][p3][1]}" parameters is incorrect`);
						}
					}
				}
			});

			it('checking the object instance to the parent classes, ' +
				'to the objects of parent classes or to the strings with name of parent classes', () => {
				let allParams = [
					[Object, params.arrE.concat(params.arrNE, params.objDate, params.objTest, params.objSTest), params.obj],
					[Test, params.objSTest, params.objTest]
				];

				for(let p1 in allParams) {
					for(let p2 in allParams[p1][1]) {
						for(let p3 in allParams[p1][2]) {
							assert.isTrue(helpLib.isInstance(allParams[p1][1][p2][0], allParams[p1][0]),
								`result with "${allParams[p1][1][p2][1]}, (object) ${allParams[p1][0].name}" parameters is incorrect`);
							assert.isTrue(helpLib.isInstance(allParams[p1][1][p2][0], allParams[p1][0].name),
								`result with "${allParams[p1][1][p2][1]}, (string) ${allParams[p1][0].name}" parameters is incorrect`);
							assert.isTrue(helpLib.isInstance(allParams[p1][1][p2][0], allParams[p1][2][p3][0]),
								`result with "${allParams[p1][1][p2][1]}, ${allParams[p1][2][p3][1]}" parameters is incorrect`);
						}
					}
				}
			});

			it('checking the object instance only in first level of the extends chain to the parent classes, ' +
				'to the objects of parent classes or to the strings with name of parent classes', () => {
				let allParams = [
					[Object, params.arrE.concat(params.arrNE, params.objDate, params.objTest, params.objSTest), params.obj],
					[Test, params.objSTest, params.objTest]
				];

				for(let p1 in allParams) {
					for(let p2 in allParams[p1][1]) {
						for(let p3 in allParams[p1][2]) {
							assert.isFalse(helpLib.isInstance(allParams[p1][1][p2][0], allParams[p1][0], true),
								`result with "${allParams[p1][1][p2][1]}, (object) ${allParams[p1][0].name}" parameters is incorrect`);
							assert.isFalse(helpLib.isInstance(allParams[p1][1][p2][0], allParams[p1][0].name, true),
								`result with "${allParams[p1][1][p2][1]}, (string) ${allParams[p1][0].name}" parameters is incorrect`);
							assert.isFalse(helpLib.isInstance(allParams[p1][1][p2][0], allParams[p1][2][p3][0], true),
								`result with "${allParams[p1][1][p2][1]}, ${allParams[p1][2][p3][1]}" parameters is incorrect`);
						}
					}
				}
			});

			it('checking the object instance to the classes, objects and string with name of classes ' +
				'who not included in extends chain', () => {
				let allParams = [
					[Array, params.obj.concat(params.objDate, params.objTest, params.objSTest), params.arrE.concat(params.arrNE)],
					[Date, params.obj.concat(params.arrE, params.arrNE, params.objTest, params.objSTest), params.objDate],
					[STest, params.objTest, params.objSTest]
				];

				for(let p1 in allParams) {
					for(let p2 in allParams[p1][1]) {
						for(let p3 in allParams[p1][2]) {
							assert.isFalse(helpLib.isInstance(allParams[p1][1][p2][0], allParams[p1][0]),
								`result with "${allParams[p1][1][p2][1]}, (object) ${allParams[p1][0].name}" parameters is incorrect`);
							assert.isFalse(helpLib.isInstance(allParams[p1][1][p2][0], allParams[p1][0].name),
								`result with "${allParams[p1][1][p2][1]}, (string) ${allParams[p1][0].name}" parameters is incorrect`);
							assert.isFalse(helpLib.isInstance(allParams[p1][1][p2][0], allParams[p1][2][p3][0]),
								`result with "${allParams[p1][1][p2][1]}, ${allParams[p1][2][p3][1]}" parameters is incorrect`);
						}
					}
				}
			});

			it('checking the object instance only in first level of the extends chain to the classes, ' +
				'objects and string with name of classes who not included in extends chain', () => {
				let allParams = [
					[Array, params.obj.concat(params.objDate, params.objTest, params.objSTest), params.arrE.concat(params.arrNE)],
					[Date, params.obj.concat(params.arrE, params.arrNE, params.objTest, params.objSTest), params.objDate],
					[STest, params.objTest, params.objSTest]
				];

				for(let p1 in allParams) {
					for(let p2 in allParams[p1][1]) {
						for(let p3 in allParams[p1][2]) {
							assert.isFalse(helpLib.isInstance(allParams[p1][1][p2][0], allParams[p1][0], true),
								`result with "${allParams[p1][1][p2][1]}, (object) ${allParams[p1][0].name}" parameters is incorrect`);
							assert.isFalse(helpLib.isInstance(allParams[p1][1][p2][0], allParams[p1][0].name, true),
								`result with "${allParams[p1][1][p2][1]}, (string) ${allParams[p1][0].name}" parameters is incorrect`);
							assert.isFalse(helpLib.isInstance(allParams[p1][1][p2][0], allParams[p1][2][p3][0], true),
								`result with "${allParams[p1][1][p2][1]}, ${allParams[p1][2][p3][1]}" parameters is incorrect`);
						}
					}
				}
			});

			it('call without parameters or with null or undefined values', () => {
				for(let p in params.unset) {
					assert.isFalse(helpLib.isInstance.apply(helpLib, params.unset[p][0]), `result ${params.unset[p][0]} is incorrect`);
				}
			});

			it('call with not a object as "obj" parameter and some "cls" parameter', () => {
				let notObjParams = params.strE.concat(params.strNE, params.numE, params.numNE,
					params.func, params.boolE, params.boolNE, params.notset);
				let clsParams = [
					[String, `(object) String`], ['string', `(string) 'string'`], ['', `(string) ''`],
					[Number, `(object) Number`], ['number', `(string) 'number'`], [1, `(number) 1`],
					[Boolean, `(object) Boolean`], ['boolean', `(string) 'boolean'`], [false, `(boolean) false`],
					[null, `null`], ['null', `(string) 'null'`], [undefined, `undefined`], ['undefined', `(string) 'undefined'`],
					[NaN, `NaN`], ['NaN', `(string) 'NaN'`], [Infinity, `Infinity`], ['Infinity', `(string) 'Infinity'`],
					[Object, `(object) Object`], [new Object(), `(object) new Object()`],
					['object', `(string) 'object'`], [{}, `(object) {}`],
					[Function, `(object) Function`], [new Function(), `(function) new Function()`],
					['function', `(string) 'function'`], [function(){}, `(function) function(){}`]
				];

				for(let p1 in notObjParams) {
					for(let p2 in clsParams) {
						assert.isFalse(helpLib.isInstance(notObjParams[p1][0], clsParams[p2][0]),
							`result with "${notObjParams[p1][1]}, ${clsParams[p2][1]}" parameters is incorrect`);
					}
				}
			});

			it('call with a object as "obj" parameter and invalid values as "cls" parameter', () => {
				let invalidParams = params.numE.concat(params.numNE, params.boolE, params.boolNE, params.notset);
				let objParams = params.obj.concat(params.objE, params.objNE, params.arrE, params.arrNE,
					params.objDate, params.objTest, params.objSTest);

				for(let p1 in objParams) {
					for(let p2 in invalidParams) {
						assert.isFalse(helpLib.isInstance(objParams[p1][0], invalidParams[p2][0]),
							`result with "${objParams[p1][1]}, ${invalidParams[p2][1]}" parameters is incorrect`);
					}
				}
			});
		});
	});
};