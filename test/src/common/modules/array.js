/**
 * Testing "arr" library to work with arrays
 * @author Artyom Lapotnikov <lapotnikov@gmail.com>
 * @copyright Artyom Lapotnikov
 * @license MIT
 */

/**
 * Create the export variable in the browser
 * If the testing happens in browser then the value of export variable is a window
 */
exports = typeof window !== 'undefined' ? window : exports;

exports.testArr = (describe, it, assert, helpLib) => {
	/**
	 * If "arr" library is not exist in current version of helpLib, then we shouldn't test it
	 */
	if(helpLib.arr === undefined) {
		return;
	}

	/**
	 * Creates a set of parameters for tests
	 * @returns {object} A set of parameters
	 */
	function getParams() {
		let arr = [1, 2, 'testArr'];
		let func = () => 'test';
		let obj1 = {p: 'testP', p1: 'testP1', toString: () => `{p: 'testP', p1: 'testP1'}`};
		let obj2 = {p1: 'testP1', p2: 'testP2', f: func, toString: () => `{p1: 'testP1', p2: 'testP2', f: ${func}}`};
		return {
			arr: [
				[[], `(array) []`, []], [[1], `(array) [1]`, [1]], [[1, 1], `(array) [1, 1]`, [1, 1]], [[1, '1'], `(array) [1, '1']`, [1, '1']],
				[[1, 2, 3], `(array) [1, 2, 3]`, [1, 2, 3]], [[1, 2, 1], `(array) [1, 2, 1]`, [1, 2, 1]],
				[['test'], `(array) ['test']`, ['test']], [['test', 'test'], `(array) ['test', 'test']`, ['test', 'test']],
				[['test1', 'test2', 'test3'], `(array) ['test1', 'test2', 'test3']`, ['test1', 'test2', 'test3']],
				[['test1', 'test2', 'test1'], `(array) ['test1', 'test2', 'test1']`, ['test1', 'test2', 'test1']],
				[[func, obj1], `(array) [${func}, ${obj1}]`, [func, obj1]],
				[[func, obj1, func], `(array) [${func}, ${obj1}, ${func}]`, [func, obj1, func]],
				[[func, obj1, obj2], `(array) [${func}, ${obj1}, ${obj2}]`, [func, obj1, obj2]],
				[[func, obj1, arr], `(array) [${func}, ${obj1}, [${arr}]]`, [func, obj1, arr]],
				[[obj1, obj2, obj1], `(array) [${obj1}, ${obj2}, ${obj1}]`, [obj1, obj2, obj1]],
				[[arr, obj2, arr], `(array) [[${arr}], ${obj2}, [${arr}]]`, [arr, obj2, arr]],
				[[1, '1', 'test', null, undefined, func, obj1, obj2, arr],
					`(array) [1, '1', 'test', null, undefined, ${func}, ${obj1}, ${obj2}, [${arr}]`,
					[1, '1', 'test', null, undefined, func, obj1, obj2, arr]
				],

				[new Array(), `(array) new Array()`, []],
				[new Array(1, 1), `(array) new Array(1, 1)`, [1, 1]], [new Array(1, '1'), `(array) new Array(1, '1')`, [1, '1']],
				[new Array(1, 2, 3), `(array) new Array(1, 2, 3)`, [1, 2, 3]], [new Array(1, 2, 1), `(array) new Array(1, 2, 1)`, [1, 2, 1]],
				[new Array('test1', 'test1'), `(array) new Array('test1', 'test1')`, ['test1', 'test1']],
				[new Array('test1', 'test2', 'test3'), `(array) new Array('test1', 'test2', 'test3')`, ['test1', 'test2', 'test3']],
				[new Array('test1', 'test2', 'test1'), `(array) new Array('test1', 'test2', 'test1')`, ['test1', 'test2', 'test1']],
				[new Array(func, obj1), `(array) new Array(${func}, ${obj1})`, [func, obj1]],
				[new Array(func, obj1, func), `(array) new Array(${func}, ${obj1}, ${func})`, [func, obj1, func]],
				[new Array(func, obj1, obj2), `(array) new Array(${func}, ${obj1}, ${obj2})`, [func, obj1, obj2]],
				[new Array(func, obj1, arr), `(array) new Array(${func}, ${obj1}, [${arr}])`, [func, obj1, arr]],
				[new Array(obj1, obj2, obj1), `(array) new Array(${obj1}, ${obj2}, ${obj1})`, [obj1, obj2, obj1]],
				[new Array(arr, obj2, arr), `(array) new Array([${arr}], ${obj2}, [${arr}])`, [arr, obj2, arr]],
				[new Array(1, '1', 'test', null, undefined, func, obj1, obj2, arr),
					`(array) new Array(1, '1', 'test', null, undefined, ${func}, ${obj1}, ${obj2}, [${arr}])`,
					[1, '1', 'test', null, undefined, func, obj1, obj2, arr]
				]
			],

			toArr: [
				[new Object(), `(object) new Object()`, []], [{}, `(object) {}`, []], [{p: 'test'}, `(object) {p: 'test'}`, ['test']],
				[{p1: 'test', p2: 'test'}, `(object) {p1: 'test', p2: 'test'}`, ['test', 'test']],
				[{p1: 'test1', p2: 'test2', p3: 'test3'}, `(object) {p1: 'test1', p2: 'test2', p3: 'test3'}`, ['test1', 'test2', 'test3']],
				[{p1: 'test1', p2: 'test2', p3: 'test1'}, `(object) {p1: 'test1', p2: 'test2', p3: 'test1'}`, ['test1', 'test2', 'test1']],
				[{toString: func}, `(object) {toString: ${func}}`, [func]],
				[{f1: func, toString: func}, `(object) {f1: ${func}, toString: ${func}}`, [func, func]],
				[{0: 1, 1: 2, 2: 3, length: 3}, `(object) {0: 1, 1: 2, 2: 3, length: 3}`, [1, 2, 3, 3]],
				[{0: 1, 1: 2, p: 'test', length: 2}, `(object) {0: 1, 1: 2, p: 'test', length: 2}`, [1, 2, 'test', 2]],
				[{p1: func, p2: obj1}, `(object) {p1: ${func}, p2: ${obj1}}`, [func, obj1]],
				[{p1: func, p2: obj1, p3: func}, `(object) {p1: ${func}, p2: ${obj1}, p3: ${func}}`, [func, obj1, func]],
				[{p1: func, p2: obj1, p3: obj2}, `(object) {p1: ${func}, p2: ${obj1}, p3: ${obj2}}`, [func, obj1, obj2]],
				[{p1: func, p2: obj1, p3: arr}, `(object) {p1: ${func}, p2: ${obj1}, p3: [${arr}]}`, [func, obj1, arr]],
				[{p1: obj1, p2: obj2, p3: obj1}, `(object) {p1: ${obj1}, p2: ${obj2}, p3: ${obj1}}`, [obj1, obj2, obj1]],
				[{p1: arr, p2: obj2, p3: arr}, `(object) {p1: [${arr}], p2: ${obj2}, p3: [${arr}]}`, [arr, obj2, arr]],
				[{p1: 1, p2: '1', p3: 'test', p4: null, p5: undefined, p6: func, p7: obj1, p8: obj2, p9: arr},
					`(object) {p1: 1, p2: '1', p3: 'test', p4: null, p5: undefined, p6: ${func}, p7: ${obj1}, p8: ${obj2}, p9: [${arr}]}`,
					[1, '1', 'test', null, undefined, func, obj1, obj2, arr]
				],

				[new Set(), `(object) new Set()`, []], [new Set([1, 1, '1']), `(object) new Set([1, 1, '1'])`, [1, '1']],
				[new Set([1, 2, 3]), `(object) new Set([1, 2, 3])`, [1, 2, 3]],
				[new Set([1, 2, 1]), `(object) new Set([1, 2, 1])`, [1, 2]],
				[new Set(['test']), `(object) new Set(['test'])`, ['test']],
				[new Set(['test', 'test']), `(object) new Set(['test', 'test'])`, ['test']],
				[new Set(['test1', 'test2', 'test3']), `(object) new Set(['test1', 'test2', 'test3'])`, ['test1', 'test2', 'test3']],
				[new Set(['test1', 'test2', 'test1']), `(object) new Set(['test1', 'test2', 'test1'])`, ['test1', 'test2']],
				[new Set([func, obj1]), `(object) new Set([${func}, ${obj1}])`, [func, obj1]],
				[new Set([func, obj1, func]), `(object) new Set([${func}, ${obj1}, ${func}])`, [func, obj1]],
				[new Set([func, obj1, obj2]), `(object) new Set([${func}, ${obj1}, ${obj2}])`, [func, obj1, obj2]],
				[new Set([func, obj1, arr]), `(object) new Set([${func}, ${obj1}, [${arr}]])`, [func, obj1, arr]],
				[new Set([obj1, obj2, obj1]), `(object) new Set([${obj1}, ${obj2}, ${obj1}])`, [obj1, obj2]],
				[new Set([arr, obj2, arr]), `(object) new Set([[${arr}], ${obj2}, [${arr}]])`, [arr, obj2]],
				[new Set([1, '1', 'test', null, undefined, func, obj1, obj2, arr]),
					`(object) new Set([1, '1', 'test', null, undefined, ${func}, ${obj1}, ${obj2}, [${arr}])`,
					[1, '1', 'test', null, undefined, func, obj1, obj2, arr]
				],

				[new Map(), `(object) new Map()`, []], [new Map([['p1', 1], ['p2', 1]]), `(object) new Map([['p1', 1], ['p2', 1]])`, [1, 1]],
				[new Map([[0, 1], [1, 2], [2, 3]]), `(object) new Map([[0, 1], [1, 2], [2, 3]])`, [1, 2, 3]],
				[new Map([[0, 1], [1, 2], [2, 1]]), `(object) new Map([[0, 1], [1, 2], [2, 1]])`, [1, 2, 1]],
				[new Map([['p', 'test']]), `(object) new Map([['p', 'test']])`, ['test']],
				[new Map([['p1', 'test'], ['p2', 'test']]), `(object) new Map([['p1', 'test'], ['p2', 'test']])`, ['test', 'test']],
				[new Map([['p1', 'test1'], ['p2', 'test2'], ['p3', 'test3']]),
					`(object) new Map([['p1', 'test1'], ['p2', 'test2'], ['p3', 'test3']])`, ['test1', 'test2', 'test3']],
				[new Map([['p1', 'test1'], ['p2', 'test2'], ['p3', 'test1']]),
					`(object) new Map([['p1', 'test1'], ['p2', 'test2'], ['p3', 'test1']])`, ['test1', 'test2', 'test1']],
				[new Map([['p1', func], ['p2', obj1]]),
					`(object) new Map([['p1', ${func}], ['p2', ${obj1}]])`, [func, obj1]],
				[new Map([['p1', func], ['p2', obj1], ['p3', func]]),
					`(object) new Map([['p1', ${func}], ['p2', ${obj1}], ['p3', ${func}]])`, [func, obj1, func]],
				[new Map([['p1', func], ['p2', obj1], ['p3', obj2]]),
					`(object) new Map([['p1', ${func}], ['p2', ${obj1}], ['p3', ${obj2}]])`, [func, obj1, obj2]],
				[new Map([['p1', func], ['p2', obj1], ['p3', arr]]),
					`(object) new Map([['p1', ${func}], ['p2', ${obj1}], ['p3', [${arr}]]])`, [func, obj1, arr]],
				[new Map([['p1', obj1], ['p2', obj2], ['p3', obj1]]),
					`(object) new Map([['p1', ${obj1}], ['p2', ${obj2}], ['p3', ${obj1}]])`, [obj1, obj2, obj1]],
				[new Map([['p1', arr], ['p2', obj2], ['p3', arr]]),
					`(object) new Map([['p1', [${arr}]], ['p2', ${obj2}], ['p3', [${arr}]]])`, [arr, obj2, arr]],
				[new Map([['p1', 1], ['p2', '1'], ['p3', 'test'], ['p4', null], ['p5', undefined], ['p6', func], ['p7', obj1], ['p8', obj2], ['p9', arr]]),
					`(object) new Map([['p1', 1], ['p2', '1'], ['p3', 'test'], ['p4', null], ` +
						`['p5', undefined], ['p6', ${func}], ['p7', ${obj1}], ['p8', ${obj2}], ['p9', [${arr}]]])`,
					[1, '1', 'test', null, undefined, func, obj1, obj2, arr]
				],

				[new WeakSet(), `(object) new WeakSet()`, []], [new WeakSet([{}, {}]), `(object) new WeakSet([{}, {}])`, []],
				[new WeakMap(), `(object) new WeakMap()`, []], [new WeakMap([[{}, 1], [{}, 2]]), `(object) new WeakMap([[{}, 1], [{}, 2]])`, []]
			],

			notArr: [
				[0, `(number) 0`], [1, `(number) 1`], [-1, `(number) -1`], [NaN, `NaN`], [Infinity, `Infinity`],

				['', `(string) ''`], [' ', `(string) ' '`], ['123', `(string) '123'`], ['test', `(string) 'test'`],
				['[]', `(string) '[]'`], ['new Array()', `(string) 'new Array()'`],

				[() => {}, `(function) () => {}`], [function() {}, `(function) function() {}`], [new Function(), `(function) new Function()`],
				[false, `(bool) false`], [true, `(bool) true`], [undefined, `undefined`], [null, `null`]
			],

			arrVal: [arr, `(array) [${arr}]`],
			funcVal: [func, `(function) ${func}`],
			obj1Val: [obj1, `(object) ${obj1}`],
			obj2Val: [obj2, `(object) ${obj2}`]
		};
	}

	describe('Test "arr" library', () => {
		describe('checking "is" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.arr.is, 'function "is" is not added or is not a function');
			});

			let params = getParams();

			it('call with a array parameters', () => {
				for(let p in params.arr) {
					assert.isTrue(helpLib.arr.is(params.arr[p][0]), `result with "${params.arr[p][1]}" parameter is incorrect`);
				}
			});

			it('call with not a array parameters', () => {
				let notArrParams = params.toArr.concat(params.notArr);
				for(let p in notArrParams) {
					assert.isFalse(helpLib.arr.is(notArrParams[p][0]), `result with "${notArrParams[p][1]}" parameter is incorrect`);
				}
			});
		});

		describe('checking "check" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.arr.check, 'function "check" is not added or is not a function');
			});

			let params = getParams();

			it('call with a values who can convert to array as "arr" parameter', () => {
				for(let p in params.arr) {
					assert.strictEqual(helpLib.arr.check(params.arr[p][0]), params.arr[p][0],
						`result with "${params.arr[p][1]}" parameter is incorrect`);
				}

				for(let p in params.toArr) {
					assert.deepEqual(helpLib.arr.check(params.toArr[p][0]), params.toArr[p][2],
						`result with "${params.toArr[p][1]}" parameter is incorrect`);
				}
			});

			it('call with a values who can convert to array as "arr" parameter and some "defValue" parameter', () => {
				for(let p in params.arr) {
					assert.strictEqual(helpLib.arr.check(params.arr[p][0], null), params.arr[p][0],
						`result with "${params.arr[p][1]}, null" parameters is incorrect`);
				}

				for(let p in params.toArr) {
					assert.deepEqual(helpLib.arr.check(params.toArr[p][0], null), params.toArr[p][2],
						`result with "${params.toArr[p][1]}, null" parameters is incorrect`);
				}
			});

			it('call without parameters or with null or undefined values', () => {
				assert.deepEqual(helpLib.arr.check(), [], 'result without parameter is incorrect');

				assert.deepEqual(helpLib.arr.check(undefined), [], 'result with "undefined" parameter is incorrect');
				assert.deepEqual(helpLib.arr.check(undefined, undefined), [],
					'result with "undefined, undefined" parameters is incorrect');

				assert.deepEqual(helpLib.arr.check(null), [], 'result with "null" parameter is incorrect');
				assert.isNull(helpLib.arr.check(null, null), 'result with "null, null" parameters is incorrect');
			});

			it('call with a values who can not convert to array as "arr" parameter', () => {
				for(let p in params.notArr) {
					assert.deepEqual(helpLib.arr.check(params.notArr[p][0]), [],
						`result with "${params.notArr[p][1]}" parameter is incorrect`);
				}
			});

			it('call with a values who can not convert to array as "arr" parameter and some "defValue" parameter', () => {
				for(let p in params.notArr) {
					assert.isNull(helpLib.arr.check(params.notArr[p][0], null),
						`result with "${params.notArr[p][1]}, null" parameters is incorrect`);
				}
			});
		});

		describe('checking "exist" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.arr.exist, 'function "exist" is not added or is not a function');
			});

			let params = getParams();

			params.vals = [
				[1, `(number) 1`], [3, `(number) 3`], ['1', `(string) '1'`], ['test', `(string) 'test'`], ['test3', `(string) 'test3'`],
				[null, `null`], [undefined, `undefined`], params.arrVal, params.funcVal, params.obj1Val, params.obj2Val
			];

			it('call with a values who can convert to array as "arr" parameter and some value as "val" parameter', () => {
				let arrParams = params.arr.concat(params.toArr);
				for(let p1 in params.vals) {
					let regRes = false;
					for(let p2 in arrParams) {
						let res = arrParams[p2][2].indexOf(params.vals[p1][0]) >= 0 ? true : false;
						regRes = regRes === false && res ? true : regRes;

						assert.strictEqual(helpLib.arr.exist(arrParams[p2][0], params.vals[p1][0]), res,
							`result with "${arrParams[p2][1]}, ${params.vals[p1][1]}" parameters is incorrect`);
					}

					assert.isTrue(regRes, `not one of the arrays does not contain value "${params.vals[p1][1]}" as "val" parameter`);
				}
			});

			it('call with a values who can convert to array as "arr" parameter and without "val" parameter', () => {
				let arrParams = params.arr.concat(params.toArr);
				for(let p in arrParams) {
					let res = arrParams[p][2].indexOf(undefined) >= 0 ? true : false;
					assert.strictEqual(helpLib.arr.exist(arrParams[p][0]), res, `result with "${arrParams[p][1]}" parameter is incorrect`);
				}
			});

			it('call without parameters or with null or undefined values', () => {
				assert.isFalse(helpLib.arr.exist(), 'result without parameter is incorrect');

				assert.isFalse(helpLib.arr.exist(undefined), 'result with "undefined" parameter is incorrect');
				assert.isFalse(helpLib.arr.exist(undefined, undefined), 'result with "undefined, undefined" parameters is incorrect');

				assert.isFalse(helpLib.arr.exist(null), 'result with "null" parameter is incorrect');
				assert.isFalse(helpLib.arr.exist(null, null), 'result with "null, null" parameters is incorrect');
			});

			it('call with a values who can not convert to array as "arr" parameter and some value as "val" parameter', () => {
				for(let p1 in params.notArr) {
					for(let p2 in params.vals) {
						assert.isFalse(helpLib.arr.exist(params.notArr[p1][0], params.vals[p2][0]),
							`result with "${params.notArr[p1][1]}, ${params.vals[p2][1]}" parameters is incorrect`);
					}
				}
			});

			it('call with a values who can not convert to array as "arr" parameter and without "val" parameter', () => {
				for(let p in params.notArr) {
						assert.isFalse(helpLib.arr.exist(params.notArr[p][0]), `result with "${params.notArr[p][1]}" parameter is incorrect`);
				}
			});
		});

		describe('checking "copy" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.arr.copy, 'function "copy" is not added or is not a function');
			});

			let params = getParams();

			it('call with a values who can convert to array as "arr" parameter', () => {
				let arrParams = params.arr.concat(params.toArr);
				for(let p in arrParams) {
					let res = helpLib.arr.copy(arrParams[p][0]);

					assert.isArray(res, `result with "${arrParams[p][1]}" parameter is not a array`);
					assert.notStrictEqual(res, arrParams[p][0], `result with "${arrParams[p][1]}" parameter is not a copy`);
					assert.deepEqual(res, arrParams[p][2], `result with "${arrParams[p][1]}" parameter is incorrect`);
				}
			});

			it('call with a values who can not convert to array as "arr" parameter', () => {
				for(let p in params.notArr) {
					assert.deepEqual(helpLib.arr.copy(params.notArr[p][0]), [],
						`result with "${params.notArr[p][1]}" parameter is incorrect`);
				}
			});
		});

		describe('checking "proection" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.arr.proection, 'function "proection" is not added or is not a function');
			});

			let params = getParams();

			params.isSetFields = [
				[0, `(number) 0`, 0, 1], [1, `(number) 1`, 1, 2], [2, `(number) 2`, 2, 'testArr'],
				['0', `(string) '0'`, 0, 1], ['1', `(string) '1'`, 1, 2], ['2', `(string) '2'`, 2, 'testArr'],
				['p', `(string) 'p'`, 'p', 'testP'], ['p1', `(string) 'p1'`, 'p1', 'testP1'],
				['p2', `(string) 'p2'`, 'p2', 'testP2'], ['f', `(string) 'f'`, 'f', params.funcVal[0]],
				[[2], `(array) [2]`, 2, 'testArr'], [['f'], `(array) ['f']`, 'f', params.funcVal[0]],
				[new String('p'), `(object) new String('p')`, 'p', 'testP'], [new String('p2'), `(object) new String('p2')`, 'p2', 'testP2'],
				[{toString: () => 'p1'}, `(object) {toString: () => 'p1'}`, 'p1', 'testP1'],
				[{toString: () => 'f'}, `(object) {toString: () => 'f'}`, 'f', params.funcVal[0]]
			];

			params.notSetFields = [
				[3, `(number) 3`], [-1, `(number) -1`], [NaN, `NaN`], [Infinity, `Infinity`],
				['5', `(string) '5'`], ['-3', `(string) '-3'`], ['p3', `(string) 'p3'`], ['f1', `(string) 'f1'`],
				[[3], `(array) [3]`], [[1, 2], `(array) [1, 2]`], [['f', 1], `(array) ['f', 1]`],
				[new String('p0'), `(object) new String('p0')`], [{toString: () => 'f0'}, `(object) {toString: () => 'f0'}`],
				[() => 1, `(function) () => 1`], [() => 'p', `(function) () => 'p'`],
				[false, `(bool) false`], [true, `(bool) true`], [null, `null`], [undefined, `undefined`]
			];

			it('call with a values who can convert to array as "arr" parameter ' +
				'and some value who must be present as "field" parameter', () => {
				let arrParams = params.arr.concat(params.toArr);
				for(let p1 in params.isSetFields) {
					for(let p2 in arrParams) {
						let res = helpLib.arr.proection(arrParams[p2][0], params.isSetFields[p1][0]);
						let deepRes = [];

						for(let item of arrParams[p2][2]) {
							if(item !== null && typeof item === 'object' && item[params.isSetFields[p1][2]] !== undefined) {
								deepRes.push(params.isSetFields[p1][3]);
							}
						}

						assert.notStrictEqual(res, arrParams[p2][0],
							`result with "${arrParams[p2][1]}, ${params.isSetFields[p1][1]}" parameters is an "arr" parameter`);
						assert.deepEqual(res, deepRes,
							`result with "${arrParams[p2][1]}, ${params.isSetFields[p1][1]}" parameters is incorrect`);
					}
				}
			});

			it('call with a values who can convert to array as "arr" parameter ' +
				'and some value who must not be present as "field" parameter', () => {
				let arrParams = params.arr.concat(params.toArr);
				for(let p1 in arrParams) {
					for(let p2 in params.notSetFields) {
						let res = helpLib.arr.proection(arrParams[p1][0], params.notSetFields[p2][0]);

						assert.notStrictEqual(res, arrParams[p1][0],
							`result with "${arrParams[p1][1]}, ${params.notSetFields[p2][1]}" parameters is an "arr" parameter`);
						assert.deepEqual(res, [],
							`result with "${arrParams[p1][1]}, ${params.notSetFields[p2][1]}" parameters is incorrect`);
					}
				}
			});

			it('call with a values who can convert to array as "arr" parameter and without "field" parameter', () => {
				let arrParams = params.arr.concat(params.toArr);
				for(let p in arrParams) {
					let res = helpLib.arr.proection(arrParams[p][0]);

					assert.notStrictEqual(res, arrParams[p][0], `result with "${arrParams[p][1]}" parameter is an "arr" parameter`);
					assert.deepEqual(res, [], `result with "${arrParams[p][1]}" parameter is incorrect`);
				}
			});

			it('call without parameters or with null or undefined values', () => {
				assert.deepEqual(helpLib.arr.proection(), [], 'result without parameter is incorrect');

				assert.deepEqual(helpLib.arr.proection(undefined), [], 'result with "undefined" parameter is incorrect');
				assert.deepEqual(helpLib.arr.proection(undefined, undefined), [], 'result with "undefined, undefined" parameters is incorrect');

				assert.deepEqual(helpLib.arr.proection(null), [], 'result with "null" parameter is incorrect');
				assert.deepEqual(helpLib.arr.proection(null, null), [], 'result with "null, null" parameters is incorrect');
			});

			it('call with a values who can not convert to array as "arr" parameter ' +
				'and some value who must be present as "field" parameter', () => {
				for(let p1 in params.notArr) {
					for(let p2 in params.isSetFields) {
						assert.deepEqual(helpLib.arr.proection(params.notArr[p1][0], params.isSetFields[p2][0]), [],
							`result with "${params.notArr[p1][1]}, ${params.isSetFields[p2][1]}" parameters is incorrect`);
					}
				}
			});

			it('call with a values who can not convert to array as "arr" parameter ' +
				'and some value who must not be present as "field" parameter', () => {
				for(let p1 in params.notArr) {
					for(let p2 in params.notSetFields) {
						assert.deepEqual(helpLib.arr.proection(params.notArr[p1][0], params.notSetFields[p2][0]), [],
							`result with "${params.notArr[p1][1]}, ${params.notSetFields[p2][1]}" parameters is incorrect`);
					}
				}
			});

			it('call with a values who can not convert to array as "arr" parameter and without "field" parameter', () => {
				for(let p in params.notArr) {
						assert.deepEqual(helpLib.arr.proection(params.notArr[p][0]), [],
							`result with "${params.notArr[p][1]}" parameter is incorrect`);
				}
			});
		});

		describe('checking "shuffle" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.arr.shuffle, 'function "shuffle" is not added or is not a function');
			});

			let params = getParams();
			let arr = params.arrVal[0];
			let func = params.funcVal[0];
			let obj1 = params.obj1Val[0];
			let obj2 = params.obj2Val[0];

			params.checkArr = [
				[[Infinity, -Infinity, 0, 1, 2, 3, 4, 5, 6, 7], `(array) [Infinity, -Infinity, 0, 1, 2, 3, 4, 5, 6, 7]`],
				[[0, 0.1, 0.01, 0.001, 0.0001, 1, 1.1, 1.01, 1.001, 1.0001], `(array) [0, 0.1, 0.01, 0.001, 0.0001, 1, 1.1, 1.01, 1.001, 1.0001]`],
				[[0, 1, 2, 3, 4, '0', '1', '2', '3', '4'], `(array) [0, 1, 2, 3, 4, '0', '1', '2', '3', '4']`],
				[['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9'], `(array) ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9']`],
				[['tst', ' tst', 'tst ', 't st', 'ts t', ' tst ', '\ttst', 'tst\t', '\ntst', 'tst\n'],
					`(array) ['tst', ' tst', 'tst ', 't st', 'ts t', ' tst ', '\\ttst', 'tst\\t', '\\ntst', 'tst\\n']`],
				[[arr, func, obj1, obj2, 1, -1, 'tst', ' tst', null, undefined],
					`(array) [${arr}, ${func}, ${obj1}, ${obj2}, 1, -1, 'tst', ' tst', null, undefined]`]
			];

			it('call with a values who can convert to array as "arr" parameter', () => {
				let arrParams = params.arr.concat(params.toArr);
				for(let p in arrParams) {
					let res = helpLib.arr.shuffle(arrParams[p][0]);

					assert.notStrictEqual(res, arrParams[p][0], `result with "${arrParams[p][1]}" parameter is an "arr" parameter`);
					assert.sameMembers(res, arrParams[p][2], `result with "${arrParams[p][1]}" parameter is incorrect`);
				}

				for(let p in params.checkArr) {
					let resList = [];
					for(let i = 0; i < 10; i++) {
						let res = helpLib.arr.shuffle(params.checkArr[p][0]);

						assert.notStrictEqual(res, params.checkArr[p][0],
							`result with "${params.checkArr[p][1]}" parameter is an "arr" parameter`);
						assert.sameMembers(res, params.checkArr[p][0],
							`result with "${params.checkArr[p][1]}" parameter is incorrect`);

						for(let resItm of resList) {
							assert.notSameOrderedMembers(res, resItm, `result with "${params.checkArr[p][1]}" is appeared twice`);
						}

						resList.push(res);
					}
				}
			});

			it('call with a values who can not convert to array as "arr" parameter', () => {
				for(let p in params.notArr) {
					assert.deepEqual(helpLib.arr.shuffle(params.notArr[p][0]), [],
						`result with "${params.notArr[p][1]}" parameter is incorrect`);
				}
			});
		});

		describe('checking "unique" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.arr.unique, 'function "unique" is not added or is not a function');
			});

			let params = getParams();
			let func = params.funcVal[0];
			let obj1 = params.obj1Val[0];
			let obj2 = params.obj2Val[0];
			let arr1 = params.arrVal[0];
			let arr2 = [1, arr1, 2, func, 3, obj1];

			params.arr.push(
				[[0, NaN, -0, NaN], `(array) [0, NaN, -0, NaN]`, [0, NaN], true],
				[[1, Infinity, -1, NaN], `(array) [1, Infinity, -1, NaN]`, [1, Infinity, -1, NaN], true],
				[[1, Infinity, 1, -Infinity, Infinity, 0], `(array) [1, Infinity, 1, -Infinity, Infinity, 0]`, [1, Infinity, -Infinity, 0], true],
				[[1, '1', 10, -10, '10', '-10'], `(array) [1, '1', 10, -10, '10', '-10']`, [1, '1', 10, -10, '10', '-10'], true],
				[['\t', '\t', '\n', ' ', '\n', 't', 'n', ' '], `(array) ['\\t', '\\t', '\\n', ' ', '\\n', 't', 'n', ' ']`,
					['\t', '\n', ' ', 't', 'n'], true
				],
				[['test test', 'testtest', ' test test', 'test test '], `(array) ['test test', 'testtest', ' test test', 'test test ']`,
					['test test', 'testtest', ' test test', 'test test '], true
				],
				[[arr1, arr1, func, obj2, func, obj1, arr1], `(array) [[${arr1}], [${arr1}], ${func}, ${obj2}, ${func}, ${obj1} [${arr1}]]`,
					[arr1, func, obj2, obj1], true
				],
				[[1, arr1, 2, arr2, 3, obj1, 4, obj2, 5, func], `(array) [1, [${arr1}], 2, [${arr2}], 3, ${obj1}, 4, ${obj2}, 5, ${func}]`,
					[1, arr1, 2, arr2, 3, obj1, 4, obj2, 5, func], true
				],
				[[1, arr1, 2, func, 3, 'test', obj1, 3, obj2, 1, func, 5, arr1, 'test', 6, func],
					`(array) [1, [${arr1}], 2, ${func}, 3, 'test', ${obj1}, 3, ${obj2}, 1, ${func}, 5, [${arr1}], 'test', 6, ${func}]`,
					[1, arr1, 2, func, 3, 'test', obj1, obj2, 5, 6],
					true
				]
			);

			it('call with a values who can convert to array as "arr" parameter', () => {
				let arrParams = params.arr.concat(params.toArr);
				for(let p in arrParams) {
					let res = helpLib.arr.unique(arrParams[p][0]);
					let deepRes = arrParams[p][3] ? arrParams[p][2] : Array.from((new Set(arrParams[p][2])).values());

					assert.notStrictEqual(res, arrParams[p][0], `result with "${arrParams[p][1]}" parameter is an "arr" parameter`);
					assert.deepEqual(res, deepRes, `result with "${arrParams[p][1]}" parameter is incorrect`);
				}
			});

			it('call with a values who can not convert to array as "arr" parameter', () => {
				for(let p in params.notArr) {
					assert.deepEqual(helpLib.arr.unique(params.notArr[p][0]), [],
						`result with "${params.notArr[p][1]}" parameter is incorrect`);
				}
			});
		});

		describe('checking "toNumberArray" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.arr.toNumberArray, 'function "toNumberArray" is not added or is not a function');
			});

			let params = getParams();

			params.arr.push(
				[[0, 10, -10, 0xf, -0xf, 1e2, -1e2, 1e-2, NaN, Infinity], `(array) [0, 10, -10, 0xf, -0xf, 1e2, -1e2, 1e-2, NaN, Infinity]`,
					[0, 10, -10, 0xf, -0xf, 1e2, -1e2, 1e-2], [0, 10, -10, 0xf, -0xf, 1e2, -1e2, 1e-2, 0, 0]],
				[['0', '10', '-10', '0xf', '-0xf', '1e2', '-1e2', '1e-2'], `(array) ['0', '10', '-10', '0xf', '-0xf', '1e2', '-1e2', '1e-2']`,
					[], [0, 10, -10, 0xf, -0xf, 1e2, -1e2, 1e-2]],
				[[' -10', '10 ', '\t0xf', '\n-0xf', '1e2\t', '1e-2\n', 'NaN', 'Infinity'],
					`(array) [' -10', '10 ', '\\t0xf', '\\n-0xf', '1e2\\t', '1e-2\\n', 'NaN', 'Infinity']`,
					[], [-10, 10, 0xf, -0xf, 1e2, 1e-2, 0, 0]
				],
				[[null, 1, undefined, '2',  {}, 3, [], '4', () => {}, 5, true, '6', false, 7],
					`(array) [null, 1, undefined, '2',  {}, 3, [], '4', () => {}, 5, true, '6', false, 7]`,
					[1, 3, 5, 7], [0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7]
				],
			);

			it('call with a values who can convert to array as "arr" parameter and negative value as "isAllConvert" parameter', () => {
				let arrParams = params.arr.concat(params.toArr);
				for(let p in arrParams) {
					let res = helpLib.arr.toNumberArray(arrParams[p][0], false);
					let deepRes = arrParams[p].length > 3 ? arrParams[p][2] : [];

					if(arrParams[p].length == 3) {
						for(let item of arrParams[p][2]) {
							if(typeof item === 'number' && Number.isFinite(item)) {
								deepRes.push(item);
							}
						}
					}

					assert.notStrictEqual(res, arrParams[p][0],
						`result with "${arrParams[p][1]}, (bool) false" parameters is an "arr" parameter`);
					assert.deepEqual(res, deepRes,
						`result with "${arrParams[p][1]}, (bool) false" parameters is incorrect`);
				}
			});

			it('call with a values who can convert to array as "arr" parameter and positive value as "isAllConvert" parameter', () => {
				let arrParams = params.arr.concat(params.toArr);
				for(let p in arrParams) {
					let res = helpLib.arr.toNumberArray(arrParams[p][0], true);
					let deepRes = arrParams[p].length > 3 ? arrParams[p][3] : [];

					if(arrParams[p].length == 3) {
						for(let item of arrParams[p][2]) {
							switch(typeof item) {
								case 'number': Number.isFinite(item) ? deepRes.push(item) : deepRes.push(0); break;
								case 'string': item.trim() > 0 ?
									(isFinite(Number(item.trim())) ? deepRes.push(Number(item.trim())) : deepRes.push(0)) : deepRes.push(0);
								break;
								default: deepRes.push(0);
							}
						}
					}

					assert.notStrictEqual(res, arrParams[p][0],
						`result with "${arrParams[p][1]}, (bool) true" parameters is an "arr" parameter`);
					assert.deepEqual(res, deepRes,
						`result with "${arrParams[p][1]}, (bool) true" parameters is incorrect`);
				}
			});

			it('call with a values who can convert to array as "arr" parameter and without "isAllConvert" parameter', () => {
				let arrParams = params.arr.concat(params.toArr);
				for(let p in arrParams) {
					let res = helpLib.arr.toNumberArray(arrParams[p][0]);
					let deepRes = arrParams[p].length > 3 ? arrParams[p][2] : [];

					if(arrParams[p].length == 3) {
						for(let item of arrParams[p][2]) {
							if(typeof item === 'number' && Number.isFinite(item)) {
								deepRes.push(item);
							}
						}
					}

					assert.notStrictEqual(res, arrParams[p][0], `result with "${arrParams[p][1]}" parameter is an "arr" parameter`);
					assert.deepEqual(res, deepRes, `result with "${arrParams[p][1]}" parameter is incorrect`);
				}
			});

			it('call without parameters or with null or undefined values', () => {
				assert.deepEqual(helpLib.arr.toNumberArray(), [], 'result without parameter is incorrect');

				assert.deepEqual(helpLib.arr.toNumberArray(undefined), [], 'result with "undefined" parameter is incorrect');
				assert.deepEqual(helpLib.arr.toNumberArray(undefined, undefined), [], 'result with "undefined, undefined" parameters is incorrect');

				assert.deepEqual(helpLib.arr.toNumberArray(null), [], 'result with "null" parameter is incorrect');
				assert.deepEqual(helpLib.arr.toNumberArray(null, null), [], 'result with "null, null" parameters is incorrect');
			});

			it('call with a values who can not convert to array as "arr" parameter and negative value as "isAllConvert" parameter', () => {
				for(let p in params.notArr) {
					assert.deepEqual(helpLib.arr.toNumberArray(params.notArr[p][0], false), [],
						`result with "${params.notArr[p][1]}, (bool) false" parameters is incorrect`);
				}
			});

			it('call with a values who can not convert to array as "arr" parameter and positive value as "isAllConvert" parameter', () => {
				for(let p in params.notArr) {
					assert.deepEqual(helpLib.arr.toNumberArray(params.notArr[p][0], false), [],
						`result with "${params.notArr[p][1]}, (bool) true" parameters is incorrect`);
				}
			});

			it('call with a values who can not convert to array as "arr" parameter and without "isAllConvert" parameter', () => {
				for(let p in params.notArr) {
						assert.deepEqual(helpLib.arr.toNumberArray(params.notArr[p][0]), [],
							`result with "${params.notArr[p][1]}" parameter is incorrect`);
				}
			});
		});
	});
};