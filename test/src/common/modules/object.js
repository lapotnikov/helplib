/**
 * Testing "obj" library to work with objects
 * @author Artyom Lapotnikov <lapotnikov@gmail.com>
 * @copyright Artyom Lapotnikov
 * @license MIT
 */

/**
 * Create the export variable in the browser
 * If the testing happens in browser then the value of export variable is a window
 */
exports = typeof window !== 'undefined' ? window : exports;

exports.testObj = (describe, it, assert, helpLib) => {
	/**
	 * If "obj" library is not exist in current version of helpLib, then we shouldn't test it
	 */
	if(helpLib.obj === undefined) {
		return;
	}

	/**
	 * Creates a set of parameters for tests
	 * @returns {object} A set of parameters
	 */
	function getParams() {
		let func1 = () => 'test';
		let func2 = () => 1;
		let func3 = () => 2;

		return {
			obj: [
				[new Object(), `(object) new Object()`, []], [new Object(null), `(object) new Object(null)`, []],
				[new Object(undefined), `(object) new Object(undefined)`, []],

				[{}, `(object) {}`, []], [{p: 'test'}, `(object) {p: 'test'}`, [`test`]], [{'p': 'test'}, `(object) {'p': 'test'}`, [`test`]],
				[{toString: func1}, `(object) {toString: ${func1}}`, [func1]], [{'toString': func1}, `(object) {'toString': ${func1}}`, [func1]],
				[{p: 'test', toString: func1}, `(object) {p: 'test', toString: ${func1}}`, [`test`, func1]],
				[{p1: 'test1', p2: 'test2', f1: func2, f2: func3},
					`(object) {p1: 'test1', p2: 'test2', f1: ${func2}, f2: ${func3}}`, [`test1`, `test2`, func2, func3]],

				[[], `(array) []`, []], [[1, 2, 3], `(array) [1, 2, 3]`, [1, 2, 3]],
				[new Array(), `(array) new Array()`, []], [new Array(5), `(array) new Array(5)`, []],
				[new Array(1, 2, 3), `(array) new Array(1, 2, 3)`, [1, 2, 3]],
				[new Object([1, 2]), `(array) new Object([1, 2])`, [1, 2]],

				[new String(), `(object) new String()`, []], [new String(12), `(object) new String(12)`, [`1`, `2`]],
				[new String('test'), `(object) new String('test')`, [`t`, `e`, `s`, `t`]],
				[new Object('test'), `(object) new Object('test')`, [`t`, `e`, `s`, `t`]],

				[new Number(), `(object) new Number()`, []], [new Number(12), `(object) new Number(12)`, []],
				[new Number('12'), `(object) new Number('12')`, []], [new Object(123), `(object) new Object(123)`, []],

				[new (function() {}), `(object) new (function() {})`, []],
				[new (function() {this.p1 = 'test1'; this.p2 = 'test2';}),
					`(object) new (function() {this.p1 = 'test1'; this.p2 = 'test2';})`, [`test1`, `test2`]],

				[new (class {init() {return 'test';}}), `(object) new (class {init() {return 'test';}})`, []],
				[new (class {constructor() {this.p1 = 'test1'; this.p2 = 'test2';} init() {return 'test';}}),
					`(object) new (class {constructor() {this.p1 = 'test1'; this.p2 = 'test2';} init() {return 'test';}})`, [`test1`, `test2`]]
			],

			set: [
				[new Set(), `(object) new Set()`, []], [new Set(null), `(object) new Set(null)`, []],
				[new Set(undefined), `(object) new Set(undefined)`, []],
				[new Set([1, 2, 3]), `(object) new Set([1, 2, 3])`, [1, 2, 3]],
				[new Set([1, 2, 2]), `(object) new Set([1, 2, 2])`, [1, 2]],
				[new Set('test'), `(object) new Set('test')`, [`t`, `e`, `s`]],
				[new Set(new Set([1, 2])), `(object) new Set(new Set([1, 2]))`, [1, 2]]
			],

			wset: [
				[new WeakSet(), `(object) new WeakSet()`, []], [new WeakSet(null), `(object) new WeakSet(null)`, []],
				[new WeakSet(undefined), `(object) new WeakSet(undefined)`, []],
				[new WeakSet([{}, {}]), `(object) new WeakSet([{}, {}])`, []],
				[new WeakSet([new Number('123')]), `(object) new WeakSet([new Number('123')])`, []],
				[new WeakSet([new String('test')]), `(object) new WeakSet([new String('test')])`, []]
			],

			map: [
				[new Map(), `(object) new Map()`, []], [new Map(null), `(object) new Map(null)`, []],
				[new Map(undefined), `(object) new Map(undefined)`, []],
				[new Map([[null, 'test1'], [undefined, 'test2']]), `(object) new Map([[null, 'test1'], [undefined, 'test2']])`, [`test1`, `test2`]],
				[new Map([[null, 'test1'], [null, 'test2']]), `(object) new Map([[null, 'test1'], [null, 'test2']])`, [`test2`]],
				[new Map([['0', 1], ['1', 2], ['2', 3]]), `(object) new Map([['0', 1], ['1', 2], ['2', 3]])`, [1, 2, 3]],
				[new Map([['0', 1], ['1', 2], ['1', 3]]), `(object) new Map([['0', 1], ['1', 2], ['1', 3]])`, [1, 3]],
				[new Map([['p1', 'testM1'], ['p2', 'testM2']]), `(object) new Map([['p1', 'testM1'], ['p2', 'testM2']])`, ['testM1', 'testM2']],
				[new Map(new Map([['0', 1], ['1', 2]])), `(object) new Map(new Map([['0', 1], ['1', 2]]))`, [1, 2]]
			],

			wmap: [
				[new WeakMap(), `(object) new WeakMap()`, []], [new WeakMap(null), `(object) new WeakMap(null)`, []],
				[new WeakMap(undefined), `(object) new WeakMap(undefined)`, []],
				[new WeakMap([[{}, 1], [{}, 2]]), `(object) new WeakMap([[{}, 1], [{}, 2]])`, []],
				[new WeakMap([[new Number('123'), 1]]), `(object) new WeakMap([[new Number('123'), 1]])`, []],
				[new WeakMap([[new String('test'), 1]]), `(object) new WeakMap([[new String('test'), 1]])`, []]
			],

			notObj: [
				['', `(string) ''`], [' ', `(string) ' '`], ['1', `(string) '1'`], ['test', `(string) 'test'`],
				['{}', `(string) '{}'`], ['[]', `(string) '[]'`], ['[object Object]', `(string) '[object Object]'`],

				[0, `(number) 0`], [1, `(number) 1`], [-1, `(number) -1`], [NaN, `(number) NaN`], [Infinity, `(number) Infinity`],
				[false, `(bool) false`], [true, `(bool) true`],
				[undefined, `undefined`], [null, `null`],

				[() => {}, `(function) () => {}`], [function() {}, `(function) function() {}`], [new Function(), `(function) new Function()`],
				[Set, `(function) Set`], [Map, `(function) Map`], [WeakSet, `(function) WeakSet`], [WeakMap, `(function) WeakMap`],
				[Number, `(function) Number`], [String, `(function) String`], [Array, `(function) Array`],
				[(class {init() {return 'test';}}), `(function) (class {init() {return 'test';}})`]
			]
		};
	}

	describe('Test "obj" library', () => {
		describe('checking "is" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.obj.is, 'function "is" is not added or is not a function');
			});

			let params = getParams();

			it('call with a object parameters', () => {
				let objParams = params.obj.concat(params.set, params.wset, params.map, params.wmap);
				for(let p in objParams) {
					assert.isTrue(helpLib.obj.is(objParams[p][0]), `result with "${objParams[p][1]}" parameter is incorrect`);
				}
			});

			it('call with not a object parameters', () => {
				for(let p in params.notObj) {
					assert.isFalse(helpLib.obj.is(params.notObj[p][0]), `result with "${params.notObj[p][1]}" parameter is incorrect`);
				}
			});
		});

		describe('checking "isSet" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.obj.isSet, 'function "isSet" is not added or is not a function');
			});

			let params = getParams();

			it('call with a objects of Set class as "obj" parameter', () => {
				for(let p in params.set) {
					assert.isTrue(helpLib.obj.isSet(params.set[p][0]), `result with "${params.set[p][1]}" parameter is incorrect`);
				}
			});

			it('call with not a objects or with object is not of Set class as "obj" parameter', () => {
				let invParams = params.obj.concat(params.wset, params.map, params.wmap, params.notObj);
				for(let p in invParams) {
					assert.isFalse(helpLib.obj.isSet(invParams[p][0]), `result with "${invParams[p][1]}" parameter is incorrect`);
				}
			});
		});

		describe('checking "isWeakSet" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.obj.isWeakSet, 'function "isWeakSet" is not added or is not a function');
			});

			let params = getParams();

			it('call with not a objects or with object is not of WeakSet class as "obj" parameter', () => {
				for(let p in params.wset) {
					assert.isTrue(helpLib.obj.isWeakSet(params.wset[p][0]), `result with "${params.wset[p][1]}" parameter is incorrect`);
				}
			});

			it('call with not a objects of WeakSet class as "obj" parameter', () => {
				let invParams = params.obj.concat(params.set, params.map, params.wmap, params.notObj);
				for(let p in invParams) {
					assert.isFalse(helpLib.obj.isWeakSet(invParams[p][0]), `result with "${invParams[p][1]}" parameter is incorrect`);
				}
			});
		});

		describe('checking "isMap" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.obj.isMap, 'function "isMap" is not added or is not a function');
			});

			let params = getParams();

			it('call with a objects of Map class as "obj" parameter', () => {
				for(let p in params.map) {
					assert.isTrue(helpLib.obj.isMap(params.map[p][0]), `result with "${params.map[p][1]}" parameter is incorrect`);
				}
			});

			it('call with not a objects or with object is not of Map class as "obj" parameter', () => {
				let invParams = params.obj.concat(params.set, params.wset, params.wmap, params.notObj);
				for(let p in invParams) {
					assert.isFalse(helpLib.obj.isMap(invParams[p][0]), `result with "${invParams[p][1]}" parameter is incorrect`);
				}
			});
		});

		describe('checking "isWeakMap" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.obj.isWeakMap, 'function "isWeakMap" is not added or is not a function');
			});

			let params = getParams();

			it('call with a objects of WeakMap class as "obj" parameter', () => {
				for(let p in params.wmap) {
					assert.isTrue(helpLib.obj.isWeakMap(params.wmap[p][0]), `result with "${params.wmap[p][1]}" parameter is incorrect`);
				}
			});

			it('call with not a objects or with object is not of WeakMap class as "obj" parameter', () => {
				let invParams = params.obj.concat(params.set, params.wset, params.map, params.notObj);
				for(let p in invParams) {
					assert.isFalse(helpLib.obj.isWeakMap(invParams[p][0]), `result with "${invParams[p][1]}" parameter is incorrect`);
				}
			});
		});

		describe('checking "isCollection" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.obj.isCollection, 'function "isCollection" is not added or is not a function');
			});

			let params = getParams();

			it('call with a objects of Set or Map classes as "obj" parameter', () => {
				let collParams = params.set.concat(params.map);
				for(let p in collParams) {
					assert.isTrue(helpLib.obj.isCollection(collParams[p][0]), `result with "${collParams[p][1]}" parameter is incorrect`);
				}
			});

			it('call with not a objects or with object is not of Set or Map classes as "obj" parameter', () => {
				let invParams = params.obj.concat(params.wset, params.wmap, params.notObj);
				for(let p in invParams) {
					assert.isFalse(helpLib.obj.isCollection(invParams[p][0]), `result with "${invParams[p][1]}" parameter is incorrect`);
				}
			});
		});

		describe('checking "isWeakCollection" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.obj.isWeakCollection, 'function "isWeakCollection" is not added or is not a function');
			});

			let params = getParams();

			it('call with a objects of WeakSet or WeakMap classes as "obj" parameter', () => {
				let collParams = params.wset.concat(params.wmap);
				for(let p in collParams) {
					assert.isTrue(helpLib.obj.isWeakCollection(collParams[p][0]), `result with "${collParams[p][1]}" parameter is incorrect`);
				}
			});

			it('call with not a objects or with object is not of WeakSet or WeakMap classes as "obj" parameter', () => {
				let invParams = params.obj.concat(params.set, params.map, params.notObj);
				for(let p in invParams) {
					assert.isFalse(helpLib.obj.isWeakCollection(invParams[p][0]), `result with "${invParams[p][1]}" parameter is incorrect`);
				}
			});
		});

		describe('checking "check" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.obj.check, 'function "check" is not added or is not a function');
			});

			let params = getParams();

			it('call with a object parameters', () => {
				let objParams = params.obj.concat(params.set, params.wset, params.map, params.wmap);
				for(let p in objParams) {
					assert.strictEqual(helpLib.obj.check(objParams[p][0]), objParams[p][0],
						`result with "${objParams[p][1]}" parameter is incorrect`);
				}
			});

			it('call with a object as "obj" parameter and some "defValue" parameter', () => {
				let objParams = params.obj.concat(params.set, params.wset, params.map, params.wmap);
				for(let p in objParams) {
					assert.strictEqual(helpLib.obj.check(objParams[p][0], null), objParams[p][0],
						`result with "${objParams[p][1]}, null" parameters is incorrect`);
				}
			});

			it('call without parameters or with null or undefined values', () => {
				assert.deepEqual(helpLib.obj.check(), {}, 'result without parameter is incorrect');

				assert.deepEqual(helpLib.obj.check(undefined), {}, 'result with "undefined" parameter is incorrect');
				assert.deepEqual(helpLib.obj.check(undefined, undefined), {},
					'result with "undefined, undefined" parameters is incorrect');

				assert.deepEqual(helpLib.obj.check(null), {}, 'result with "null" parameter is incorrect');
				assert.isNull(helpLib.obj.check(null, null), 'result with "null, null" parameters is incorrect');
			});

			it('call with not a object parameters', () => {
				for(let p in params.notObj) {
					assert.deepEqual(helpLib.obj.check(params.notObj[p][0]), {},
						`result with "${params.notObj[p][1]}" parameter is incorrect`);
				}
			});

			it('call with not a object as "obj" parameter and some "defValue" parameter', () => {
				for(let p in params.notObj) {
					assert.isNull(helpLib.obj.check(params.notObj[p][0], null),
						`result with "${params.notObj[p][1]}, null" parameters is incorrect`);
				}
			});
		});

		describe('checking "checkSet" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.obj.checkSet, 'function "checkSet" is not added or is not a function');
			});

			let params = getParams();

			it('call with a objects of Set class as "obj" parameter', () => {
				for(let p in params.set) {
					assert.strictEqual(helpLib.obj.checkSet(params.set[p][0]), params.set[p][0],
						`result with "${params.set[p][1]}" parameter is incorrect`);
				}
			});

			it('call with a objects of Set class as "obj" parameter and some "defValue" parameter', () => {
				for(let p in params.set) {
					assert.strictEqual(helpLib.obj.checkSet(params.set[p][0], null), params.set[p][0],
						`result with "${params.set[p][1]}" parameter is incorrect`);
				}
			});

			it('call without parameters or with null or undefined values', () => {
				assert.deepEqual(helpLib.obj.checkSet(), new Set(), 'result without parameter is incorrect');

				assert.deepEqual(helpLib.obj.checkSet(undefined), new Set(), 'result with "undefined" parameter is incorrect');
				assert.deepEqual(helpLib.obj.checkSet(undefined, undefined), new Set(),
					'result with "undefined, undefined" parameters is incorrect');

				assert.deepEqual(helpLib.obj.checkSet(null), new Set(), 'result with "null" parameter is incorrect');
				assert.isNull(helpLib.obj.checkSet(null, null), 'result with "null, null" parameters is incorrect');
			});

			it('call with not a objects or with object is not of Set class as "obj" parameter', () => {
				let invParams = params.obj.concat(params.wset, params.map, params.wmap, params.notObj);
				for(let p in invParams) {
					assert.deepEqual(helpLib.obj.checkSet(invParams[p][0]), new Set(),
						`result with "${invParams[p][1]}" parameter is incorrect`);
				}
			});

			it('call with not a objects or with object is not of Set class as "obj" parameter and some "defValue" parameter', () => {
				let invParams = params.obj.concat(params.wset, params.map, params.wmap, params.notObj);
				for(let p in invParams) {
					assert.isNull(helpLib.obj.checkSet(invParams[p][0], null),
						`result with "${invParams[p][1]}" parameter is incorrect`);
				}
			});
		});

		describe('checking "checkWeakSet" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.obj.checkWeakSet, 'function "checkWeakSet" is not added or is not a function');
			});

			let params = getParams();

			it('call with a objects of WeakSet class as "obj" parameter', () => {
				for(let p in params.wset) {
					assert.strictEqual(helpLib.obj.checkWeakSet(params.wset[p][0]), params.wset[p][0],
						`result with "${params.wset[p][1]}" parameter is incorrect`);
				}
			});

			it('call with a objects of WeakSet class as "obj" parameter and some "defValue" parameter', () => {
				for(let p in params.wset) {
					assert.strictEqual(helpLib.obj.checkWeakSet(params.wset[p][0], null), params.wset[p][0],
						`result with "${params.wset[p][1]}" parameter is incorrect`);
				}
			});

			it('call without parameters or with null or undefined values', () => {
				assert.instanceOf(helpLib.obj.checkWeakSet(), WeakSet, 'result without parameter is incorrect');

				assert.instanceOf(helpLib.obj.checkWeakSet(undefined), WeakSet, 'result with "undefined" parameter is incorrect');
				assert.instanceOf(helpLib.obj.checkWeakSet(undefined, undefined), WeakSet,
					'result with "undefined, undefined" parameters is incorrect');

				assert.instanceOf(helpLib.obj.checkWeakSet(null), WeakSet, 'result with "null" parameter is incorrect');
				assert.isNull(helpLib.obj.checkWeakSet(null, null), 'result with "null, null" parameters is incorrect');
			});

			it('call with not a objects or with object is not of WeakSet class as "obj" parameter', () => {
				let invParams = params.obj.concat(params.set, params.map, params.wmap, params.notObj);
				for(let p in invParams) {
					assert.instanceOf(helpLib.obj.checkWeakSet(invParams[p][0]), WeakSet,
						`result with "${invParams[p][1]}" parameter is incorrect`);
				}
			});

			it('call with not a objects or with object is not of WeakSet class as "obj" parameter and some "defValue" parameter', () => {
				let invParams = params.obj.concat(params.set, params.map, params.wmap, params.notObj);
				for(let p in invParams) {
					assert.isNull(helpLib.obj.checkWeakSet(invParams[p][0], null),
						`result with "${invParams[p][1]}" parameter is incorrect`);
				}
			});
		});

		describe('checking "checkMap" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.obj.checkMap, 'function "checkMap" is not added or is not a function');
			});

			let params = getParams();

			it('call with a objects of Map class as "obj" parameter', () => {
				for(let p in params.map) {
					assert.strictEqual(helpLib.obj.checkMap(params.map[p][0]), params.map[p][0],
						`result with "${params.map[p][1]}" parameter is incorrect`);
				}
			});

			it('call with a objects of Map class as "obj" parameter and some "defValue" parameter', () => {
				for(let p in params.map) {
					assert.strictEqual(helpLib.obj.checkMap(params.map[p][0], null), params.map[p][0],
						`result with "${params.map[p][1]}" parameter is incorrect`);
				}
			});

			it('call without parameters or with null or undefined values', () => {
				assert.deepEqual(helpLib.obj.checkMap(), new Map(), 'result without parameter is incorrect');

				assert.deepEqual(helpLib.obj.checkMap(undefined), new Map(), 'result with "undefined" parameter is incorrect');
				assert.deepEqual(helpLib.obj.checkMap(undefined, undefined), new Map(),
					'result with "undefined, undefined" parameters is incorrect');

				assert.deepEqual(helpLib.obj.checkMap(null), new Map(), 'result with "null" parameter is incorrect');
				assert.isNull(helpLib.obj.checkMap(null, null), 'result with "null, null" parameters is incorrect');
			});

			it('call with not a objects or with object is not of Map class as "obj" parameter', () => {
				let invParams = params.obj.concat(params.set, params.wset, params.wmap, params.notObj);
				for(let p in invParams) {
					assert.deepEqual(helpLib.obj.checkMap(invParams[p][0]), new Map(),
						`result with "${invParams[p][1]}" parameter is incorrect`);
				}
			});

			it('call with not a objects or with object is not of Map class as "obj" parameter and some "defValue" parameter', () => {
				let invParams = params.obj.concat(params.set, params.wset, params.wmap, params.notObj);
				for(let p in invParams) {
					assert.isNull(helpLib.obj.checkMap(invParams[p][0], null),
						`result with "${invParams[p][1]}" parameter is incorrect`);
				}
			});
		});

		describe('checking "checkWeakMap" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.obj.checkWeakMap, 'function "checkWeakMap" is not added or is not a function');
			});

			let params = getParams();

			it('call with a objects of WeakMap class as "obj" parameter', () => {
				for(let p in params.wmap) {
					assert.strictEqual(helpLib.obj.checkWeakMap(params.wmap[p][0]), params.wmap[p][0],
						`result with "${params.wmap[p][1]}" parameter is incorrect`);
				}
			});

			it('call with a objects of WeakMap class as "obj" parameter and some "defValue" parameter', () => {
				for(let p in params.wmap) {
					assert.strictEqual(helpLib.obj.checkWeakMap(params.wmap[p][0], null), params.wmap[p][0],
						`result with "${params.wmap[p][1]}" parameter is incorrect`);
				}
			});

			it('call without parameters or with null or undefined values', () => {
				assert.instanceOf(helpLib.obj.checkWeakMap(), WeakMap, 'result without parameter is incorrect');

				assert.instanceOf(helpLib.obj.checkWeakMap(undefined), WeakMap, 'result with "undefined" parameter is incorrect');
				assert.instanceOf(helpLib.obj.checkWeakMap(undefined, undefined), WeakMap,
					'result with "undefined, undefined" parameters is incorrect');

				assert.instanceOf(helpLib.obj.checkWeakMap(null), WeakMap, 'result with "null" parameter is incorrect');
				assert.isNull(helpLib.obj.checkWeakMap(null, null), 'result with "null, null" parameters is incorrect');
			});

			it('call with not a objects or with object is not of WeakMap class as "obj" parameter', () => {
				let invParams = params.obj.concat(params.set, params.wset, params.map, params.notObj);
				for(let p in invParams) {
					assert.instanceOf(helpLib.obj.checkWeakMap(invParams[p][0]), WeakMap,
						`result with "${invParams[p][1]}" parameter is incorrect`);
				}
			});

			it('call with not a objects or with object is not of WeakMap class as "obj" parameter and some "defValue" parameter', () => {
				let invParams = params.obj.concat(params.set, params.wset, params.map, params.notObj);
				for(let p in invParams) {
					assert.isNull(helpLib.obj.checkWeakMap(invParams[p][0], null),
						`result with "${invParams[p][1]}" parameter is incorrect`);
				}
			});
		});

		describe('checking "size" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.obj.size, 'function "size" is not added or is not a function');
			});

			let params = getParams();

			it('call with a object parameters', () => {
				let objParams = params.obj.concat(params.set, params.wset, params.map, params.wmap);
				for(let p in objParams) {
					assert.strictEqual(helpLib.obj.size(objParams[p][0]), objParams[p][2].length,
						`result with "${objParams[p][1]}" parameter is incorrect`);
				}
			});

			it('call with not a object parameters', () => {
				for(let p in params.notObj) {
					assert.strictEqual(helpLib.obj.size(params.notObj[p][0]), 0,
						`result with "${params.notObj[p][1]}" parameter is incorrect`);
				}
			});
		});

		describe('checking "forEach" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.obj.forEach, 'function "forEach" is not added or is not a function');
			});

			function cbFunc(res, item, value, key, obj) {
				let valByKey = item[0] instanceof Set ? value : (item[0] instanceof Map ? item[0].get(key) : item[0][key]);

				res.push(value);
				assert.strictEqual(obj, item[0],
					`the "object" parametr of callback function is incorrect (call with "${item[1]}, (function)" parameters)`);
				assert.strictEqual(value, valByKey,
					`the "value" or "key" parametr of callback function is incorrect (call with "${item[1]}, (function)" parameters)`);
			}

			let params = getParams();

			params.noFunc = [
				['', `(string) ''`], [' ', `(string) ' '`], ['1', `(string) '1'`], ['test', `(string) 'test'`],
				['{}', `(string) '{}'`], ['[]', `(string) '[]'`], ['[object Object]', `(string) '[object Object]'`],

				[0, `(number) 0`], [1, `(number) 1`], [-1, `(number) -1`], [NaN, `(number) NaN`], [Infinity, `(number) Infinity`],
				[false, `(bool) false`], [true, `(bool) true`],
				[undefined, `undefined`], [null, `null`]
			];

			it('call with a object as "obj" parameter and some function as "callback" parameter', () => {
				let objParams = params.obj.concat(params.set, params.wset, params.map, params.wmap);
				for(let p in objParams) {
					let res = [];
					let funcRes = helpLib.obj.forEach(objParams[p][0], cbFunc.bind(this, res, objParams[p]));

					assert.isUndefined(funcRes, `result with "${objParams[p][1]}, (function)" parameters is incorrect`);
					assert.deepEqual(res, objParams[p][2],
						`result that was obtained by callback function is incorrect (call with "${objParams[p][1]}, (function)" parameters)`);
				}
			});

			it('call without parameters or with null or undefined values', () => {
				assert.isUndefined(helpLib.obj.forEach(), 'result without parameter is incorrect');

				assert.isUndefined(helpLib.obj.forEach(undefined), 'result with "undefined" parameter is incorrect');
				assert.isUndefined(helpLib.obj.forEach(undefined, undefined),
					'result with "undefined, undefined" parameters is incorrect');

				assert.isUndefined(helpLib.obj.forEach(null), 'result with "null" parameter is incorrect');
				assert.isUndefined(helpLib.obj.forEach(null, null), 'result with "null, null" parameters is incorrect');
			});

			it('call with not a object as "obj" parameter and some function as "callback" parameter', () => {
				for(let p in params.notObj) {
					let res = [];
					let funcRes = helpLib.obj.forEach(params.notObj[p][0], cbFunc.bind(this, res, params.notObj[p]));

					assert.isUndefined(funcRes, `result with "${params.notObj[p][1]}, (function)" parameters is incorrect`);
					assert.deepEqual(res, [],
						`result that was obtained by callback function is incorrect (call with "${params.notObj[p][1]}, (function)" parameters)`);
				}
			});

			it('call with a object as "obj" parameter and not a function as "callback" parameter', () => {
				let objParams = params.obj.concat(params.set, params.wset, params.map, params.wmap);
				let cbParams = params.obj.concat(params.set, params.wset, params.map, params.wmap, params.noFunc);

				for(let p1 in objParams) {
					for(let p2 in cbParams) {
						assert.isUndefined(helpLib.obj.forEach(objParams[p1][0], cbParams[p2][0]),
							`result with "${objParams[p1][1]}, ${cbParams[p2][1]}" parameters is incorrect`);
					}
				}
			});
		});

		describe('checking "toArray" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.obj.toArray, 'function "toArray" is not added or is not a function');
			});

			let params = getParams();

			it('call with a object parameters', () => {
				let objParams = params.obj.concat(params.set, params.wset, params.map, params.wmap);
				for(let p in objParams) {
					let res = helpLib.obj.toArray(objParams[p][0]);

					assert.notStrictEqual(res, objParams[p][0], `result with "${objParams[p][1]}" parameter is an "obj" parameter`);
					assert.deepEqual(res, objParams[p][2], `result with "${objParams[p][1]}" parameter is incorrect`);
				}
			});

			it('call with not a object parameters', () => {
				for(let p in params.notObj) {
					assert.deepEqual(helpLib.obj.toArray(params.notObj[p][0]), [],
						`result with "${params.notObj[p][1]}" parameter is incorrect`);
				}
			});
		});

		describe('checking "copy" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.obj.copy, 'function "copy" is not added or is not a function');
			});

			let params = getParams();

			it('call with a object parameters', () => {
				let objParams = [[Object, params.obj], [Set, params.set], [Map, params.map]];
				for(let p1 in objParams) {
					for(let p2 in objParams[p1][1]) {
						let res = helpLib.obj.copy(objParams[p1][1][p2][0]);
						let arrRes = objParams[p1][0] === Object ? Object.values(res) : Array.from(res.values());
						let equalRes = Array.isArray(objParams[p1][1][p2][0]) ? Object.assign({}, objParams[p1][1][p2][0]) : res;

						assert.instanceOf(res, objParams[p1][0], `result with "${objParams[p1][1][p2][1]}" parameter is not a object`);
						assert.notStrictEqual(res, objParams[p1][1][p2][0], `result with "${objParams[p1][1][p2][1]}" parameter is not a copy`);
						assert.deepEqual(res, equalRes, `result with "${objParams[p1][1][p2][1]}" parameter is incorrect`);
						assert.deepEqual(arrRes, objParams[p1][1][p2][2], `result with "${objParams[p1][1][p2][1]}" parameter is incorrect`);
					}
				}

				let weakParams = params.wmap.concat(params.wset);
				for(let p in weakParams) {
					assert.deepEqual(helpLib.obj.copy(weakParams[p][0]), {}, `result with "${weakParams[p][1]}" parameter is incorrect`);
				}
			});

			it('call with not a object parameters', () => {
				for(let p in params.notObj) {
					assert.deepEqual(helpLib.obj.copy(params.notObj[p][0]), {},
						`result with "${params.notObj[p][1]}" parameter is incorrect`);
				}
			});
		});

		describe('checking "merge" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.obj.merge, 'function "merge" is not added or is not a function');
			});

			function toObject(item, type) {
				let ret = {};
				switch(type) {
					case Object: Object.keys(item).forEach((key) => ret[key] = item[key]); break;
					case Set: ret = Object.assign({}, Array.from(item.values())); break;
					case Map: Array.from(item.keys()).forEach((key) => ret[key] = item.get(key)); break;
				}

				return ret;
			}

			function merge(obj1, obj2, type) {
				if(type === Set) {
					obj1 = new Set(Object.values(obj1));
					Object.values(obj2).forEach((val) => obj1.add(val));
					return toObject(obj1, Set);
				} else {
					return Object.assign({}, obj1, obj2);
				}
			}

			function checkWithThreeParameters(pramsList1, pramsList2, pramsList3) {
				for(let p1 in pramsList1) {
					let item1 = pramsList1[p1];
					let params1 = item1[2];

					for(let p2 in params1) {
						let res1 = helpLib.obj.merge(params1[p2][0]);
						let objRes1 = toObject(params1[p2][0], item1[1]);

						assert.instanceOf(res1, item1[0], `result with "${params1[p2][1]}" parameter is not a object`);
						assert.notStrictEqual(res1, params1[p2][0], `result with "${params1[p2][1]}" parameter is an first parameter`);
						assert.deepEqual(toObject(res1, item1[0]), objRes1, `result with "${params1[p2][1]}" parameter is incorrect`);
						assert.deepEqual(Object.values(toObject(res1, item1[0])), Object.values(objRes1),
							`result with "${params1[p2][1]}" parameter is incorrect`);

						for(let p3 in pramsList2) {
							let item2 = pramsList2[p3];
							let params2 = item2[2];

							for(let p4 in params2) {
								let res2 = helpLib.obj.merge(params1[p2][0], params2[p4][0]);
								let objRes2 = merge(objRes1, toObject(params2[p4][0], item2[1]), item1[1]);

								assert.instanceOf(res2, item1[0],
									`result with "${params1[p2][1]}, ${params2[p4][1]}" parameters is not a object`);
								assert.notStrictEqual(res2, params1[p2][0],
									`result with "${params1[p2][1]}, ${params2[p4][1]}" parameters is an first parameter`);
								assert.notStrictEqual(res2, params2[p4][0],
									`result with "${params1[p2][1]}, ${params2[p4][1]}" parameters is an second parameter`);
								assert.deepEqual(toObject(res2, item1[0]), objRes2,
									`result with "${params1[p2][1]}, ${params2[p4][1]}" parameters is incorrect`);
								assert.deepEqual(Object.values(toObject(res2, item1[0])), Object.values(objRes2),
									`result with "${params1[p2][1]}, ${params2[p4][1]}" parameters is incorrect`);

								for(let p5 in pramsList3) {
									let item3 = pramsList3[p5];
									let params3 = item3[2];

									for(let p6 in params3) {
										let res3 = helpLib.obj.merge(params1[p2][0], params2[p4][0], params3[p6][0]);
										let objRes3 = merge(objRes2, toObject(params3[p6][0], item3[1]), item1[1]);

										assert.instanceOf(res3, item1[0],
											`result with "${params1[p2][1]}, ${params2[p4][1]}, ${params3[p6][1]}" parameters is not a object`);
										assert.notStrictEqual(res3, params1[p2][0],
											`result with "${params1[p2][1]}, ${params2[p4][1]}, ${params3[p6][1]}" parameters is an first parameter`);
										assert.notStrictEqual(res3, params2[p4][0],
											`result with "${params1[p2][1]}, ${params2[p4][1]}, ${params3[p6][1]}" parameters is an second parameter`);
										assert.notStrictEqual(res3, params3[p6][0],
											`result with "${params1[p2][1]}, ${params2[p4][1]}, ${params3[p6][1]}" parameters is an third parameter`);
										assert.deepEqual(toObject(res3, item1[0]), objRes3,
											`result with "${params1[p2][1]}, ${params2[p4][1]}, ${params3[p6][1]}" parameters is incorrect`);
										assert.deepEqual(Object.values(toObject(res3, item1[0])), Object.values(objRes3),
											`result with "${params1[p2][1]}, ${params2[p4][1]}, ${params3[p6][1]}" parameters is incorrect`);
									}
								}
							}
						}
					}
				}
			}

			let params = getParams();

			it('call with a object as first parameter, with a object as first and second parameters, ' +
				'with a object as first, second and third parameters', function() {
				this.timeout(30000);

				let objParams = [
					[Object, Object, params.obj], [Set, Set, params.set], [Map, Map, params.map],
					[Object, null, params.wmap.concat(params.wset)]
				];

				checkWithThreeParameters(objParams, objParams, objParams);
			});

			it('call without parameters or with null or undefined values', () => {
				assert.deepEqual(helpLib.obj.merge(), {}, 'result without parameter is incorrect');

				assert.deepEqual(helpLib.obj.merge(undefined), {}, 'result with "undefined" parameter is incorrect');
				assert.deepEqual(helpLib.obj.merge(undefined, undefined), {},
					'result with "undefined, undefined" parameters is incorrect');

				assert.deepEqual(helpLib.obj.merge(null), {}, 'result with "null" parameter is incorrect');
				assert.deepEqual(helpLib.obj.merge(null, null), {}, 'result with "null, null" parameters is incorrect');
			});

			it('call with not a object as first parameter, with not a object as first and second parameters, ' +
				'with not a object as first, second and third parameters', function() {
				this.timeout(30000);
				checkWithThreeParameters([[Object, null, params.notObj]], [[Object, null, params.notObj]], [[Object, null, params.notObj]]);
			});

			it('call with not a object as first parameter, with not a object as first parameter and a object as second parameter, ' +
				'with not a object as first parameter and a object as second and third parameters', function() {
				this.timeout(30000);

				let objParams = [
					[Object, Object, params.obj], [Set, Set, params.set], [Map, Map, params.map],
					[Object, null, params.wmap.concat(params.wset)]
				];

				checkWithThreeParameters([[Object, null, params.notObj]], objParams, objParams);
			});

			it('call with a object as first parameter and not a object as second parameter, ' +
				'with a object as first and third parameters and not a object as second parameter', function() {
				this.timeout(30000);

				let objParams = [
					[Object, Object, params.obj], [Set, Set, params.set], [Map, Map, params.map],
					[Object, null, params.wmap.concat(params.wset)]
				];

				checkWithThreeParameters(objParams, [[Object, null, params.notObj]], objParams);
			});

			it('call with a object as first and second parameters and not a object as third parameter', function() {
				this.timeout(30000);

				let objParams = [
					[Object, Object, params.obj], [Set, Set, params.set], [Map, Map, params.map],
					[Object, null, params.wmap.concat(params.wset)]
				];

				checkWithThreeParameters(objParams, objParams, [[Object, null, params.notObj]]);
			});
		});
	});
};