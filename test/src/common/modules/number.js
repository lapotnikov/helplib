/**
 * Testing "num" library to work with strings
 * @author Artyom Lapotnikov <lapotnikov@gmail.com>
 * @copyright Artyom Lapotnikov
 * @license MIT
 */

/**
 * Create the export variable in the browser
 * If the testing happens in browser then the value of export variable is a window
 */
exports = typeof window !== 'undefined' ? window : exports;

exports.testNum = (describe, it, assert, helpLib) => {
	/**
	 * If "num" library is not exist in current version of helpLib, then we shouldn't test it
	 */
	if(helpLib.num === undefined) {
		return;
	}

	/**
	 * Creates a set of parameters for tests
	 * @returns {object} A set of parameters
	 */
	function getParams() {
		return {
			int: [
				[0, `(number) 0`, 0], [-0, `(number) -0`, 0],
				[1, `(number) 1`, 1], [-1, `(number) -1`, -1],
				[5, `(number) 5`, 5], [-5, `(number) -5`, -5],
				[1e2, `(number) 1e2`, 1e2], [-1e2, `(number) -1e2`, -1e2],
				[0xff, `(number) 0xff`, 0xff], [-0xff, `(number) -0xff`, -0xff],
				[Number.MAX_SAFE_INTEGER, `(number) ${Number.MAX_SAFE_INTEGER}`, Number.MAX_SAFE_INTEGER],
				[Number.MIN_SAFE_INTEGER, `(number) ${Number.MIN_SAFE_INTEGER}`, Number.MIN_SAFE_INTEGER],

				[`0`, `(string) '0'`, 0], [` 0 `, `(string) ' 0 '`, 0],
				[`1`, `(string) '1'`, 1], [` 1 `, `(string) ' 1 '`, 1],
				[`5`, `(string) '5'`, 5], [` 5 `, `(string) ' 5 '`, 5],
				[`-0`, `(string) '-0'`, 0], [` -0 `, `(string) ' -0 '`, 0],
				[`-1`, `(string) '-1'`, -1], [` -1 `, `(string) ' -1 '`, -1],
				[`-5`, `(string) '-5'`, -5], [` -5 `, `(string) ' -5 '`, -5],
				[`1e2`, `(string) '1e2'`, 1e2], [`1e2 `, `(string) '1e2 '`, 1e2], [` 1e2`, `(string) ' 1e2'`, 1e2],
				[`-1e2`, `(string) '-1e2'`, -1e2], [`-1e2 `, `(string) '-1e2 '`, -1e2], [` -1e2`, `(string) ' -1e2'`, -1e2],
				[`0.5e2`, `(string) '0.5e2'`, 0.5e2], [`0.5e2 `, `(string) '0.5e2 '`, 0.5e2], [` 0.5e2`, `(string) ' 0.5e2'`, 0.5e2],
				[`-0.5e2`, `(string) '-0.5e2'`, -0.5e2], [`-0.5e2 `, `(string) '-0.5e2 '`, -0.5e2], [` -0.5e2`, `(string) ' -0.5e2'`, -0.5e2],
				[`0xff`, `(string) '0xff'`, 0xff], [`0xff `, `(string) '0xff '`, 0xff], [` 0xff`, `(string) ' 0xff'`, 0xff],
				[`-0xff`, `(string) '-0xff'`, -0xff], [`-0xff `, `(string) '-0xff '`, -0xff], [` -0xff`, `(string) ' -0xff'`, -0xff],

				[`\t1`, `(string) '\\t1'`, 1], [`\n1`, `(string) '\\n1'`, 1],
				[`\t-1`, `(string) '\\t-1'`, -1], [`\n-1`, `(string) '\\n-1'`, -1],
				[`\t\n1`, `(string) '\\t\\\n1'`, 1], [`\n\t1`, `(string) '\\n\\t1'`, 1],
				[`\t\n-1`, `(string) '\\t\\\n-1'`, -1], [`\n\t-1`, `(string) '\\n\\t-1'`, -1],
				[`3\t`, `(string) '3\\t'`, 3], [`3\n`, `(string) '3\\n'`, 3],
				[`-3\t`, `(string) '-3\\t'`, -3], [`-3\n`, `(string) '-3\\n'`, -3],
				[`3\t\n`, `(string) '3\\t\\n'`, 3], [`3\n\t`, `(string) '3\\n\\t'`, 3],
				[`-3\t\n`, `(string) '-3\\t\\n'`, -3], [`-3\n\t`, `(string) '-3\\n\\t'`, -3],
				[`\n 2\t`, `(string) '\\n 2\\t'`, 2], [`\n  -2\n \t`, `(string) '\\n  -2\\n \\t'`, -2]
			],

			float: [
				[0.55, `(number) 0.55`, 0.55], [128.00001, `(number) 128.00001`, 128.00001],
				[-15.9999, `(number) -15.9999`, -15.9999], [-0.0001, `(number) -0.0001`, -0.0001],
				[1e-2, `(number) 1e-2`, 1e-2], [-1e-2, `(number) -1e-2`, -1e-2],

				[`0.55`, `(string) '0.55'`, 0.55], [`0.55 `, `(string) '0.55 '`, 0.55], [` 0.55`, `(string) ' 0.55'`, 0.55],
				[`-0.55`, `(string) '-0.55'`, -0.55], [`-0.55 `, `(string) '-0.55 '`, -0.55], [` -0.55`, `(string) ' -0.55'`, -0.55],
				[`1e-2`, `(string) '1e-2'`, 1e-2], [`1e-2 `, `(string) '1e-2 '`, 1e-2], [` 1e-2`, `(string) ' 1e-2'`, 1e-2],
				[`-1e-2`, `(string) '-1e-2'`, -1e-2], [`-1e-2 `, `(string) '-1e-2 '`, -1e-2], [` -1e-2`, `(string) ' -1e-2'`, -1e-2],
				[`0.5e-2`, `(string) '0.5e-2'`, 0.5e-2], [`0.5e-2 `, `(string) '0.5e-2 '`, 0.5e-2], [` 0.5e-2`, `(string) ' 0.5e-2'`, 0.5e-2],
				[`-0.5e-2`, `(string) '-0.5e-2'`, -0.5e-2], [`-0.5e-2 `, `(string) '-0.5e-2 '`, -0.5e-2],
				[` -0.5e-2`, `(string) ' -0.5e-2'`, -0.5e-2],

				[`\t0.5`, `(string) '\\t0.5'`, 0.5], [`\n0.5`, `(string) '\\n0.5'`, 0.5],
				[`\t-0.5`, `(string) '\\t-0.5'`, -0.5], [`\n-0.5`, `(string) '\\n-0.5'`, -0.5],
				[`\t15.9999`, `(string) '\\t15.9999'`, 15.9999], [`\n15.9999`, `(string) '\\n15.9999'`, 15.9999],
				[`\t-15.9999`, `(string) '\\t-15.9999'`, -15.9999], [`\n-15.9999`, `(string) '\\n-15.9999'`, -15.9999],
				[`\t\n1e-2`, `(string) '\\t\\\n1e-2'`, 1e-2], [`\n\t1e-2`, `(string) '\\n\\t1e-2'`, 1e-2],
				[`\t\n-1e-2`, `(string) '\\t\\\n-1e-2'`, -1e-2], [`\n\t-1e-2`, `(string) '\\n\\t-1e-2'`, -1e-2]
			],

			notfin: [
				[NaN, `NaN`],
				[Infinity, `Infinity`], [-Infinity, `-Infinity`]
			],

			notnum: [
				[true, `(bool) true`], [false, `(bool) false`],

				[``, `(string) ''`], [` `, `(string) ' '`], [`\n`, `(string) '\\n'`], [`\t`, `(string) '\\t'`],
				[`- 123`, `(string) '- 123'`], [`1.2.3`, `(string) '1.2.3'`], [`1,23`, `(string) '1,23'`], [`1 23`, `(string) '1 23'`],
				[`0xfg`, `(string) '0xfg'`], [`-0xfg`, `(string) '-0xfg'`], [`0x`, `(string) '0x'`], [`0x ff`, `(string) '0x ff'`],
				[`1 e2`, `(string) '1 e2'`], [`-1 e2`, `(string) '-1 e2'`], [`1e`, `(string) '1e'`],
				[`test`, `(string) 'test'`], [`123 test`, `(string) '123 test'`], [`test 123`, `(string) 'test 123'`],
				[`test-123`, `(string) 'test-123'`],

				[[], `(array) []`], [[1], `(array) [1]`], [['1'], `(array) ['1']`],
				[{}, `(object) {}`], [{test: 1}, `(object) {test: 1}`],
				[{toString: () => 1}, `(object) {toString: () => 1}`],
				[{toString: () => '1'}, `(object) {toString: () => '1'}`],
				[() => {}, `function`],

				[undefined, 'undefined'],
				[null, 'null']
			]
		};
	}

	describe('Test "num" library', () => {
		describe('checking "is" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.num.is, 'function "is" is not added or is not a function');
			});

			let params = getParams();

			it('call with a numeric parameters', () => {
				let numParams = params.int.concat(params.float);
				for(let p in numParams) {
					assert.isTrue(helpLib.num.is(numParams[p][0]), `result with "${numParams[p][1]}" parameter is incorrect`);
				}
			});

			it('call with not a finite numeric parameters', () => {
				for(let p in params.notfin) {
					assert.isTrue(helpLib.num.is(params.notfin[p][0]),
						`result with "${params.notfin[p][1]}" parameter is incorrect`);
				}
			});

			it('call with not a numeric parameters', () => {
				for(let p in params.notnum) {
					assert.isFalse(helpLib.num.is(params.notnum[p][0]),
						`result with "${params.notnum[p][1]}" parameter is incorrect`);
				}
			});
		});

		describe('checking "isFinite" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.num.isFinite, 'function "isFinite" is not added or is not a function');
			});

			let params = getParams();

			it('call with a numeric parameters', () => {
				let numParams = params.int.concat(params.float);
				for(let p in numParams) {
					assert.isTrue(helpLib.num.isFinite(numParams[p][0]),
						`result with "${numParams[p][1]}" parameter is incorrect`);
				}
			});

			it('call with not a finite numeric parameters', () => {
				for(let p in params.notfin) {
					assert.isFalse(helpLib.num.isFinite(params.notfin[p][0]),
						`result with "${params.notfin[p][1]}" parameter is incorrect`);
				}
			});

			it('call with not a numeric parameters', () => {
				for(let p in params.notnum) {
					assert.isFalse(helpLib.num.isFinite(params.notnum[p][0]),
						`result with "${params.notnum[p][1]}" parameter is incorrect`);
				}
			});
		});

		describe('checking "isInt" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.num.isInt, 'function "is" is not added or is not a function');
			});

			let params = getParams();

			it('call with a numeric integer parameters', () => {
				for(let p in params.int) {
					assert.isTrue(helpLib.num.isInt(params.int[p][0]),
						`result with "${params.int[p][1]}" parameter is incorrect`);
				}
			});

			it('call with a numeric but not integer parameters', () => {
				for(let p in params.float) {
					assert.isFalse(helpLib.num.isInt(params.float[p][0]),
						`result with "${params.float[p][1]}" parameter is incorrect`);
				}
			});

			it('call with not a finite numeric parameters', () => {
				for(let p in params.notfin) {
					assert.isFalse(helpLib.num.isInt(params.notfin[p][0]),
						`result with "${params.notfin[p][1]}" parameter is incorrect`);
				}
			});

			it('call with not a numeric parameters', () => {
				for(let p in params.notnum) {
					assert.isFalse(helpLib.num.isInt(params.notnum[p][0]),
						`result with "${params.notnum[p][1]}" parameter is incorrect`);
				}
			});
		});

		describe('checking "check" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.num.check, 'function "check" is not added or is not a function');
			});

			let params = getParams();

			it('call with a numeric as parameters', () => {
				let numParams = params.int.concat(params.float);
				for(let p in numParams) {
					assert.strictEqual(helpLib.num.check(numParams[p][0]), numParams[p][2],
						`result with "${numParams[p][1]}" parameter is incorrect`);
				}
			});

			it('call with a numeric as "num" parameter and some "defValue" parameter', () => {
				let numParams = params.int.concat(params.float);
				for(let p in numParams) {
					assert.strictEqual(helpLib.num.check(numParams[p][0], null), numParams[p][2],
						`result with "${numParams[p][1]}, null" parameters is incorrect`);
				}
			});

			it('call without parameters or with null or undefined values', () => {
				assert.isNumber(helpLib.num.check(), 'result without parameter is incorrect');

				assert.isNumber(helpLib.num.check(undefined), 'result with "undefined" parameter is incorrect');
				assert.isNumber(helpLib.num.check(undefined, undefined), 'result with "undefined, undefined" parameters is incorrect');

				assert.isNumber(helpLib.num.check(null), 'result with "null" parameter is incorrect');
				assert.isNull(helpLib.num.check(null, null), 'result with "null, null" parameters is incorrect');
			});

			it('call with not a finite numeric parameters', () => {
				for(let p in params.notfin) {
					assert.strictEqual(helpLib.num.check(params.notfin[p][0]), 0,
						`result with "${params.notfin[p][1]}" parameter is incorrect`);
				}
			});

			it('call with not a finite numeric parameters as "num" parameter and some "defValue" parameter', () => {
				for(let p in params.notfin) {
					assert.strictEqual(helpLib.num.check(params.notfin[p][0], -100), -100,
						`result with "${params.notfin[p][1]}, (number) -100" parameters is incorrect`);
				}
			});

			it('call with not a numeric as parameters', () => {
				for(let p in params.notnum) {
					assert.strictEqual(helpLib.num.check(params.notnum[p][0]), 0,
						`result with "${params.notnum[p][1]}" parameter is incorrect`);
				}
			});

			it('call with not a numeric as "num" parameter and some "defValue" parameter', () => {
				for(let p in params.notnum) {
					assert.strictEqual(helpLib.num.check(params.notnum[p][0], -100), -100,
						`result with "${params.notnum[p][1]}, (number) -100" parameters is incorrect`);
				}
			});
		});

		describe('checking "random" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.num.random, 'function "random" is not added or is not a function');
			});

			let iterationsCount = 100;
			let uniquePrc = 0.85;
			let min = Number.MIN_SAFE_INTEGER;
			let max = Number.MAX_SAFE_INTEGER;
			let params = getParams();

			params.int = [
				[0, `(number) 0`, 0], [-0, `(number) -0`, 0],
				[1e13, `(number) 1e13`, 1e13], [-1e13, `(number) -1e13`, -1e13],
				[0xffffffffffff, `(number) 0xffffffffffff`, 0xffffffffffff],
				[-0xffffffffffff, `(number) -0xffffffffffff`, -0xffffffffffff],
				[min, `(number) ${min}`, min], [max, `(number) ${max}`, max],
				[max - 10, `(number) ${(max - 10)}`, max - 10], [max + max / 2, `(number) ${(max + max / 2)}`, max],
				[min + 10, `(number) ${(min + 10)}`, min + 10], [min + min / 2, `(number) ${(min + min / 2)}`, min],

				[`0`, `(string) '0`, 0], [` 0 `, `(string) ' 0 `, 0],
				[`1`, `(string) '1`, 1], [` 1 `, `(string) ' 1 `, 1],
				[`-0`, `(string) '-0'`, 0], [` -0 `, `(string) ' -0 '`, 0],
				[`-1`, `(string) '-1`, -1], [` -1 `, `(string) ' -1 `, -1],
				[`1e13`, `(string) '1e13'`, 1e13], [` 1e13 `, `(string) ' 1e13 '`, 1e13],
				[`-1e13`, `(string) '-1e13'`, -1e13], [` -1e13 `, `(string) ' -1e13 '`, -1e13],
				[`0xffffffffffff`, `(string) '0xffffffffffff'`, 0xffffffffffff],
				[` 0xffffffffffff `, `(string) ' 0xffffffffffff '`, 0xffffffffffff],
				[`-0xffffffffffff`, `(string) '-0xffffffffffff'`, -0xffffffffffff],
				[` -0xffffffffffff `, `(string) ' -0xffffffffffff '`, -0xffffffffffff],

				[`${min}`, `(string) '${min}'`, min],
				[`${max}`, `(string) '${max}'`, max],
				[`${(max - 10)}`, `(string) '${(max - 10)}'`, max - 10],

				[`\t${(max - 10)}`, `(string) '\\t${(max - 10)}'`, max - 10], [`\t${min}`, `(string) '\\t${min}'`, min],
				[`\n${(max - 10)}`, `(string) '\\n${(max - 10)}'`, max - 10], [`\n${min}`, `(string) '\\n${min}'`, min],
				[`\n\t${(max - 10)}`, `(string) '\\n\\t${(max - 10)}'`, max - 10], [`\n\t${min}`, `(string) '\\n\\t${min}'`, min],
				[`${(max - 10)}\t`, `(string) '${(max - 10)}\\t'`, max - 10], [`${min}\t`, `(string) '${min}\\t'`, min],
				[`${(max - 10)}\n`, `(string) '${(max - 10)}\\n'`, max - 10], [`${min}\n`, `(string) '${min}\\n'`, min],
				[`${(max - 10)}\t\n`, `(string) '${(max - 10)}\\t\\n'`, max - 10], [`${min}\t\n`, `(string) '${min}\\t\\n'`, min],
				[`\n ${(max - 10)}\t`, `(string) '\\n ${(max - 10)}\\t'`, max - 10],
				[`\n  ${min}\n \t`, `(string) '\\n  ${min}\\n \\t'`, min]
			];

			params.float = [
				[0.55, `(number) 0.55`, 0.55], [128.00001, `(number) 128.00001`, 128.00001],
				[-15.9999, `(number) -15.9999`, -15.9999], [-0.0001, `(number) -0.0001`, -0.0001],
				[1e-3, `(number) 1e-3`, 1e-3], [-1e-3, `(number) -1e-3`, -1e-3],
				[max - 5.5, `(number) ${(max - 5.5)}`, max - 5.5], [min + 5.5, `(number) ${(min + 5.5)}`, min + 5.5],
				[max - 0.5, `(number) ${(max - 0.5)}`, max - 0.5], [min + 0.5, `(number) ${(min + 0.5)}`, min + 0.5],

				[`0.55`, `(string) '0.55'`, 0.55], [` 0.55 `, `(string) ' 0.55 '`, 0.55],
				[`-0.55`, `(string) '-0.55'`, -0.55], [` -0.55 `, `(string) ' -0.55 '`, -0.55],
				[`1e-3`, `(string) '1e-3'`, 1e-3], [` 1e-3 `, `(string) ' 1e-3 '`, 1e-3],
				[`-1e-3`, `(string) '-1e-3'`, -1e-3], [` -1e-3 `, `(string) ' -1e-3 '`, -1e-3],

				[`\t${(max - 5.5)}`, `(string) '\\t${(max - 5.5)}'`, max - 5.5],
				[`\n${(max - 5.5)}`, `(string) '\\n${(max - 5.5)}'`, max - 5.5],
				[`\t${(min + 5.5)}`, `(string) '\\t${(min + 5.5)}'`, min + 5.5],
				[`\n${(min + 5.5)}`, `(string) '\\n${(min + 5.5)}'`, min + 5.5],
				[`\t\n1e-3`, `(string) '\\t\\\n1e-3'`, 1e-3], [`\n\t1e-3`, `(string) '\\n\\t1e-3'`, 1e-3],
				[`\t\n-1e-3`, `(string) '\\t\\\n-1e-3'`, -1e-3], [`\n\t-1e-3`, `(string) '\\n\\t-1e-3'`, -1e-3]
			];

			params.unset = [
				[[], `without parameters`],
				[[null], `with "null" parameter`], [[null, null], `with "null, null" parameters`],
				[[undefined], `with "undefined" parameter`], [[undefined, undefined], `with "undefined, undefined" parameters`]
			];

			it('call with a numeric as "min" parameter', () => {
				let numParams = params.int.concat(params.float);
				for(let p in numParams) {
					let values = [];
					for(let i = 0; i < iterationsCount; i++) {
						let res = helpLib.num.random(numParams[p][0]);
						values.push(res);

						assert.isNumber(res, `result with "${numParams[p][1]}" parameter is incorrect`);
						assert.strictEqual(res % 1, 0, `result with "${numParams[p][1]}" parameter is not integer`);
						assert.isAtLeast(res, numParams[p][2], `result with "${numParams[p][1]}" parameter is bellow of correct value`);
						assert.isAtMost(res, max, `result with "${numParams[p][1]}" parameter is above of correct value`);
					}

					let count = Math.round(max - numParams[p][2]) + 1;
					let prc = [...new Set(values)].length / (count > iterationsCount ? iterationsCount : count);
					assert.isAtLeast(prc, uniquePrc,
						`The percentage of matches ${(1 - prc)} is bellow allowable percentage ${(1 - uniquePrc)}`);
				}
			});

			it('call with a numeric as "min" parameter and a numeric as "max" parameter', () => {
				let numParams = params.int.concat(params.float);
				for(let p in numParams) {
					let values = [];
					for(let i = 0; i < iterationsCount; i++) {
						let res = helpLib.num.random(min, numParams[p][0]);
						values.push(res);

						assert.isNumber(res,
							`result with "(number) ${min}, ${numParams[p][1]}" parameters is incorrect`);
						assert.strictEqual(res % 1, 0,
							`result with "(number) ${min}, ${numParams[p][1]}" parameters is not integer`);
						assert.isAtLeast(res, min,
							`result with "(number) ${min}, ${numParams[p][1]}" parameters is bellow of correct value`);
						assert.isAtMost(res, numParams[p][2],
							`result with "(number) ${min}, ${numParams[p][1]}" parameters is above of correct value`);
					}

					let count = Math.round(numParams[p][2] - min) + 1;
					let prc = [...new Set(values)].length / (count > iterationsCount ? iterationsCount : count);
					assert.isAtLeast(prc, uniquePrc,
						`The percentage of matches ${(1 - prc)} is bellow allowable percentage ${(1 - uniquePrc)}`);
				}
			});

			it('call with "min" parameter who more than "max" parameter', () => {
				let numParams = params.int.concat(params.float);
				for(let p in numParams) {
					let values = [];
					for(let i = 0; i < iterationsCount; i++) {
						let res = helpLib.num.random(max, numParams[p][0]);
						values.push(res);

						assert.isNumber(res,
							`result with "(number) ${max}, ${numParams[p][1]}" parameters is incorrect`);
						assert.strictEqual(res % 1, 0,
							`result with "(number) ${max}, ${numParams[p][1]}" parameters is not integer`);
						assert.isAtLeast(res, numParams[p][2],
							`result with "(number) ${max}, ${numParams[p][1]}" parameters is bellow of correct value`);
						assert.isAtMost(res, max,
							`result with "(number) ${max}, ${numParams[p][1]}" parameters is above of correct value`);
					}

					let count = Math.round(max - numParams[p][2]) + 1;
					let prc = [...new Set(values)].length / (count > iterationsCount ? iterationsCount : count);
					assert.isAtLeast(prc, uniquePrc,
						`The percentage of matches ${(1 - prc)} is bellow allowable percentage ${(1 - uniquePrc)}`);
				}
			});

			it('call without parameters or with null or undefined values', () => {
				for(let p in params.unset) {
					let values = [];
					for(let i = 0; i < iterationsCount; i++) {
						let res = helpLib.num.random.apply(helpLib, params.unset[p][0]);
						values.push(res);

						assert.isNumber(res, `result ${params.unset[p][1]} is not number`);
						assert.strictEqual(res % 1, 0, `result ${params.unset[p][1]} is not integer`);
						assert.isAtLeast(res, 0, `result ${params.unset[p][1]} is bellow of correct value`);
						assert.isAtMost(res, max, `result ${params.unset[p][1]} is above of correct value`);
					}

					let count = Math.round(max - 0) + 1;
					let prc = [...new Set(values)].length / (count > iterationsCount ? iterationsCount : count);
					assert.isAtLeast(prc, uniquePrc,
						`The percentage of matches ${(1 - prc)} is bellow allowable percentage ${(1 - uniquePrc)}`);
				}
			});

			it('call with not a finite numeric value as "min" parameter', () => {
				for(let p in params.notfin) {
					let values = [];
					for(let i = 0; i < iterationsCount; i++) {
						let res = helpLib.num.random(params.notfin[p][0]);
						values.push(res);

						assert.isNumber(res, `result with "${params.notfin[p][1]}" parameter is incorrect`);
						assert.strictEqual(res % 1, 0, `result with "${params.notfin[p][1]}" parameter is not integer`);
						assert.isAtLeast(res, 0, `result with "${params.notfin[p][1]}" parameter is bellow of correct value`);
						assert.isAtMost(res, max, `result with "${params.notfin[p][1]}" parameter is above of correct value`);
					}

					let count = Math.round(max - 0) + 1;
					let prc = [...new Set(values)].length / (count > iterationsCount ? iterationsCount : count);
					assert.isAtLeast(prc, uniquePrc,
						`The percentage of matches ${(1 - prc)} is bellow allowable percentage ${(1 - uniquePrc)}`);
				}
			});

			it('call with a numeric as "min" parameter and not a finite numeric value as "max" parameter', () => {
				for(let p in params.notfin) {
					let values = [];
					for(let i = 0; i < iterationsCount; i++) {
						let res = helpLib.num.random(max - 10, params.notfin[p][0]);
						values.push(res);

						assert.isNumber(res,
							`result with "(number) ${(max - 10)}, ${params.notfin[p][1]}" parameters is incorrect`);
						assert.strictEqual(res % 1, 0,
							`result with "(number) ${(max - 10)},${params.notfin[p][1]}" parameters is not integer`);
						assert.isAtLeast(res, max - 10,
							`result with "(number) ${(max - 10)},${params.notfin[p][1]}" parameters is bellow of correct value`);
						assert.isAtMost(res, max,
							`result with "(number) ${(max - 10)},${params.notfin[p][1]}" parameters is above of correct value`);
					}

					let count = Math.round(max - (max - 10)) + 1;
					let prc = [...new Set(values)].length / (count > iterationsCount ? iterationsCount : count);
					assert.isAtLeast(prc, uniquePrc,
						`The percentage of matches ${(1 - prc)} is bellow allowable percentage ${(1 - uniquePrc)}`);
				}
			});

			it('call with not a finite numeric value as "min" and "max" parameters', () => {
				for(let p in params.notfin) {
					let values = [];
					for(let i = 0; i < iterationsCount; i++) {
						let res = helpLib.num.random(params.notfin[p][0], params.notfin[p][0]);
						values.push(res);

						assert.isNumber(res,
							`result with "${params.notfin[p][1]}, ${params.notfin[p][1]}" parameters is incorrect`);
						assert.strictEqual(res % 1, 0,
							`result with "${params.notfin[p][1]},${params.notfin[p][1]}" parameters is not integer`);
						assert.isAtLeast(res, 0,
							`result with "${params.notfin[p][1]},${params.notfin[p][1]}" parameters is bellow of correct value`);
						assert.isAtMost(res, max,
							`result with "${params.notfin[p][1]},${params.notfin[p][1]}" parameters is above of correct value`);
					}

					let count = Math.round(max - 0) + 1;
					let prc = [...new Set(values)].length / (count > iterationsCount ? iterationsCount : count);
					assert.isAtLeast(prc, uniquePrc,
						`The percentage of matches ${(1 - prc)} is bellow allowable percentage ${(1 - uniquePrc)}`);
				}
			});

			it('call with not a numeric as "min" parameter', () => {
				for(let p in params.notnum) {
					let values = [];
					for(let i = 0; i < iterationsCount; i++) {
						let res = helpLib.num.random(max - 10, params.notnum[p][0]);
						values.push(res);

						assert.isNumber(res,
							`result with "(number) ${(max - 10)},${params.notnum[p][1]}" parameters is incorrect`);
						assert.strictEqual(res % 1, 0,
							`result with "(number) ${(max - 10)},${params.notnum[p][1]}" parameters is not integer`);
						assert.isAtLeast(res, max - 10,
							`result with "(number) ${(max - 10)},${params.notnum[p][1]}" parameters is bellow of correct value"`);
						assert.isAtMost(res, max,
							`result with "(number) ${(max - 10)},${params.notnum[p][1]}" parameters is above of correct value`);
					}

					let count = Math.round(max - (max - 10)) + 1;
					let prc = [...new Set(values)].length / (count > iterationsCount ? iterationsCount : count);
					assert.isAtLeast(prc, uniquePrc,
						`The percentage of matches ${(1 - prc)} is bellow allowable percentage ${(1 - uniquePrc)}`);
				}
			});

			it('call with a numeric as "min" parameter and not a numeric as "max" parameter', () => {
				for(let p in params.notnum) {
					let values = [];
					for(let i = 0; i < iterationsCount; i++) {
						let res = helpLib.num.random(params.notnum[p][0]);
						values.push(res);

						assert.isNumber(res, `result with "${params.notnum[p][1]}" parameter is incorrect`);
						assert.strictEqual(res % 1, 0, `result with "${params.notnum[p][1]}" parameter is not integer`);
						assert.isAtLeast(res, 0, `result with "${params.notnum[p][1]}" parameter is bellow of correct value"`);
						assert.isAtMost(res, max, `result with "${params.notnum[p][1]}" parameter is above of correct value`);
					}

					let count = Math.round(max - 0) + 1;
					let prc = [...new Set(values)].length / (count > iterationsCount ? iterationsCount : count);
					assert.isAtLeast(prc, uniquePrc,
						`The percentage of matches ${(1 - prc)} is bellow allowable percentage ${(1 - uniquePrc)}`);
				}
			});

			it('call with not a numeric as "min" and "max" parameters', () => {
				for(let p in params.notnum) {
					let values = [];
					for(let i = 0; i < iterationsCount; i++) {
						let res = helpLib.num.random(params.notnum[p][0], params.notnum[p][0]);
						values.push(res);

						assert.isNumber(res,
							`result with "${params.notnum[p][1]}, ${params.notnum[p][1]}" parameters is incorrect`);
						assert.strictEqual(res % 1, 0,
							`result with "${params.notnum[p][1]},${params.notnum[p][1]}" parameters is not integer`);
						assert.isAtLeast(res, 0,
							`result with "${params.notnum[p][1]},${params.notnum[p][1]}" parameters is bellow of correct value`);
						assert.isAtMost(res, max,
							`result with "${params.notnum[p][1]},${params.notnum[p][1]}" parameters is above of correct value`);
					}

					let count = Math.round(max - 0) + 1;
					let prc = [...new Set(values)].length / (count > iterationsCount ? iterationsCount : count);
					assert.isAtLeast(prc, uniquePrc,
						`The percentage of matches ${(1 - prc)} is bellow allowable percentage ${(1 - uniquePrc)}`);
				}
			});
		});

		describe('checking "format" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.num.format, 'function "format" is not added or is not a function');
			});

			let minIntSize = 0;
			let maxIntSize = 100;
			let minFractSize = 0;
			let maxFractSize = 20;
			let params = getParams();

			params.num = [
				[0, `(number) 0`, 0], [-0, `(number) -0`, 0],
				[1, `(number) 1`, 1], [-1, `(number) -1`, -1],
				[5, `(number) 5`, 5],
				[200, `(number) 200`, 200],

				[0.3, `(number) 0.3`, 0.3], [-0.3, `(number) -0.3`, -0.3],
				[3.9999, `(number) 3.9999`, 3.9999],
				[7.0001, `(number) 7.0001`, 7.0001]
			];

			params.unset = [
				[[], `without parameters`],
				[[null], `with "null" parameter`], [[null, null], `with "null, null" parameters`], ,
				[[null, null, null], `with "null, null, null" parameters`],
				[[undefined], `with "undefined" parameter`], [[undefined, undefined], `with "undefined, undefined" parameters`],
				[[undefined, undefined, undefined], `with "undefined, undefined, undefined" parameters`]
			];

			function strFormat(num, intSize, fractSize) {
				fractSize = fractSize !== null && fractSize < minFractSize ? minFractSize : fractSize;
				fractSize = fractSize !== null && fractSize > maxFractSize ? maxFractSize : fractSize;

				let isMinus = (fractSize !== null ? num.toFixed(fractSize) : num) < 0 ? true : false;
				let res = String(fractSize !== null ? Math.abs(num).toFixed(fractSize) : Math.abs(num));

				let intLength = res.split('.')[0].length;
				intSize = intSize - intLength < minIntSize ? minIntSize : intSize - intLength;
				intSize = intSize + intLength > maxIntSize ? (maxIntSize - intLength) : intSize;

				return (isMinus ? '-' : '') + '0'.repeat(intSize) + res;
			}

			it('call with a numeric as "num" parameter and some value as "intSize" parameter', () => {
				let numParams = params.int.concat(params.float);
				for(let p1 in numParams) {
					for(let p2 in params.num) {
						let res = strFormat(numParams[p1][2], params.num[p2][2], null);
						assert.strictEqual(helpLib.num.format(numParams[p1][0], params.num[p2][0]), res,
							`result with "${numParams[p1][1]}, ${params.num[p2][1]}" parameters is incorrect`);
					}
				}
			});

			it('call with a numeric as "num" parameter, and some values as "intSize" and "fractSize" parameters', () => {
				let numParams = params.int.concat(params.float);
				for(let p1 in numParams) {
					for(let p2 in params.num) {
						for(let p3 in params.num) {
							let res = strFormat(numParams[p1][2], params.num[p2][2], params.num[p3][0]);
							assert.strictEqual(helpLib.num.format(numParams[p1][0], params.num[p2][0], params.num[p3][0]), res,
								`result with "${numParams[p1][1]}, ${params.num[p2][1]}, ${params.num[p3][1]}" parameters is incorrect`);
						}
					}
				}
			});

			it('call with a numeric as "intSize" parameter and some value as "num" parameter', () => {
				let numParams = params.int.concat(params.float);
				for(let p1 in numParams) {
					for(let p2 in params.num) {
						let res = strFormat(params.num[p2][2], numParams[p1][2], null);
						assert.strictEqual(helpLib.num.format(params.num[p2][0], numParams[p1][0]), res,
							`result with "${params.num[p2][1]}, ${numParams[p1][1]}" parameters is incorrect`);
					}
				}
			});

			it('call with a numeric as "intSize" parameter, and some values as "num" and "fractSize" parameters', () => {
				let numParams = params.int.concat(params.float);
				for(let p1 in numParams) {
					for(let p2 in params.num) {
						for(let p3 in params.num) {
							let res = strFormat(params.num[p2][2], numParams[p1][2], params.num[p3][0]);
							assert.strictEqual(helpLib.num.format(params.num[p2][0], numParams[p1][0], params.num[p3][0]), res,
								`result with "${params.num[p2][1]}, ${numParams[p1][1]}, ${params.num[p3][1]}" parameters is incorrect`);
						}
					}
				}
			});

			it('call with a numeric as "fractSize" parameter, and some values as "num" and "intSize" parameters', () => {
				let numParams = params.int.concat(params.float);
				for(let p1 in numParams) {
					for(let p2 in params.num) {
						for(let p3 in params.num) {
							let res = strFormat(params.num[p2][2], params.num[p3][0], numParams[p1][2]);
							assert.strictEqual(helpLib.num.format(params.num[p2][0], params.num[p3][0], numParams[p1][0]), res,
								`result with "${params.num[p2][1]}, ${params.num[p3][1]}, ${numParams[p1][1]}" parameters is incorrect`);
						}
					}
				}
			});

			it('call without parameters or with null or undefined values', () => {
				for(let p in params.unset) {
					assert.strictEqual(helpLib.num.format.apply(helpLib, params.unset[p][0]), '0', `result ${params.unset[p][1]} is incorrect`);
				}
			});

			it('call with not a finite numeric value as "num" parameter and some value as "intSize" and "fractSize" parameters', () => {
				for(let p1 in params.notfin) {
					for(let p2 in params.num) {
						for(let p3 in params.num) {
							let res = strFormat(0, params.num[p2][2], params.num[p3][2]);
							assert.strictEqual(helpLib.num.format(params.notfin[p1][0], params.num[p2][0], params.num[p3][0]), res,
								`result with "${params.notfin[p1][1]}, ${params.num[p2][1]}, ${params.num[p3][1]}" parameters is incorrect`);
						}
					}
				}
			});

			it('call with not a finite numeric value as "intSize" parameter and some value as "num" and "fractSize" parameters', () => {
				for(let p1 in params.notfin) {
					for(let p2 in params.num) {
						for(let p3 in params.num) {
							let res = strFormat(params.num[p2][2], 0, params.num[p3][2]);
							assert.strictEqual(helpLib.num.format(params.num[p2][0], params.notfin[p1][0], params.num[p3][0]), res,
								`result with "${params.num[p2][1]}, ${params.notfin[p1][1]}, ${params.num[p3][1]}" parameters is incorrect`);
						}
					}
				}
			});

			it('call with not a finite numeric value as "fractSize" parameter and some value as "num" and "intSize" parameters', () => {
				for(let p1 in params.notfin) {
					for(let p2 in params.num) {
						for(let p3 in params.num) {
							let res = strFormat(params.num[p2][2], params.num[p3][2], null);
							assert.strictEqual(helpLib.num.format(params.num[p2][0], params.num[p3][0], params.notfin[p1][0]), res,
								`result with "${params.num[p2][1]}, ${params.num[p3][1]}, ${params.notfin[p1][1]}" parameters is incorrect`);
						}
					}
				}
			});

			it('call with not a finite numeric value as "fractSize", "num" and "intSize" parameters', () => {
				for(let p1 in params.notfin) {
					for(let p2 in params.notfin) {
						for(let p3 in params.notfin) {
							assert.strictEqual(helpLib.num.format(params.notfin[p1][0], params.notfin[p2][0], params.notfin[p3][0]), '0',
								`result with "${params.notfin[p1][1]}, ${params.notfin[p2][1]}, ${params.notfin[p3][1]}" parameters is incorrect`);
						}
					}
				}
			});

			it('call with not a numeric as "num" parameter and some value as "intSize" and "fractSize" parameters', () => {
				for(let p1 in params.notnum) {
					for(let p2 in params.num) {
						for(let p3 in params.num) {
							let res = strFormat(0, params.num[p2][2], params.num[p3][2]);
							assert.strictEqual(helpLib.num.format(params.notnum[p1][0], params.num[p2][0], params.num[p3][0]), res,
								`result with "${params.notnum[p1][1]}, ${params.num[p2][1]}, ${params.num[p3][1]}" parameters is incorrect`);
						}
					}
				}
			});

			it('call with not a numeric as "intSize" parameter and some value as "num" and "fractSize" parameters', () => {
				for(let p1 in params.notnum) {
					for(let p2 in params.num) {
						for(let p3 in params.num) {
							let res = strFormat(params.num[p2][2], 0, params.num[p3][2]);
							assert.strictEqual(helpLib.num.format(params.num[p2][0], params.notnum[p1][0], params.num[p3][0]), res,
								`result with "${params.num[p2][1]}, ${params.notnum[p1][1]}, ${params.num[p3][1]}" parameters is incorrect`);
						}
					}
				}
			});

			it('call with not a numeric as "fractSize" parameter and some value as "num" and "intSize" parameters', () => {
				for(let p1 in params.notnum) {
					for(let p2 in params.num) {
						for(let p3 in params.num) {
							let res = strFormat(params.num[p2][2], params.num[p3][2], null);
							assert.strictEqual(helpLib.num.format(params.num[p2][0], params.num[p3][0], params.notnum[p1][0]), res,
								`result with "${params.num[p2][1]}, ${params.num[p3][1]}, ${params.notnum[p1][1]}" parameters is incorrect`);
						}
					}
				}
			});

			it('call with not a numeric as "fractSize", "num" and "intSize" parameters', () => {
				for(let p1 in params.notnum) {
					for(let p2 in params.notnum) {
						for(let p3 in params.notnum) {
							assert.strictEqual(helpLib.num.format(params.notnum[p1][0], params.notnum[p2][0], params.notnum[p3][0]), '0',
								`result with "${params.notnum[p1][1]}, ${params.notnum[p2][1]}, ${params.notnum[p3][1]}" parameters is incorrect`);
						}
					}
				}
			});
		});
	});
};