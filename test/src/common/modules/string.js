/**
 * Testing "str" library to work with strings
 * @author Artyom Lapotnikov <lapotnikov@gmail.com>
 * @copyright Artyom Lapotnikov
 * @license MIT
 */

/**
 * Create the export variable in the browser
 * If the testing happens in browser then the value of export variable is a window
 */
exports = typeof window !== 'undefined' ? window : exports;

exports.testStr = (describe, it, assert, helpLib) => {
	/**
	 * If "str" library is not exist in current version of helpLib, then we shouldn't test it
	 */
	if(helpLib.str === undefined) {
		return;
	}

	/**
	 * Creates a set of parameters for tests
	 * @returns {object} A set of parameters
	 */
	function getParams() {
		return {
			strE: [
				['', `(string) ''`, ``], ["", `(string) ""`, ``], [``, `(string) \`\``, ``],
				[' ', `(string) ' '`, ` `], [" ", `(string) " "`, ` `], [` `, `(string) \` \``, ` `],

				['\t', `(string) '\\t'`, `\t`], ["\t", `(string) "\\t"`, `\t`], [`\t`, `(string) \`\\t\``, `\t`],
				[' \t', `(string) ' \\t'`, ` \t`], [" \t", `(string) " \\t"`, ` \t`], [` \t`, `(string) \` \\t\``, ` \t`],
				['\t ', `(string) '\\t '`, `\t `], ["\t ", `(string) "\\t "`, `\t `], [`\t `, `(string) \`\\t \``, `\t `],

				['\n', `(string) '\\n'`, `\n`], ["\n", `(string) "\\n"`, `\n`], [`\n`, `(string) \`\\n\``, `\n`],
				[' \n', `(string) ' \\n'`, ` \n`], [" \n", `(string) " \\n"`, ` \n`], [` \n`, `(string) \` \\n\``, ` \n`],
				['\n ', `(string) '\\n '`, `\n `], ["\n ", `(string) "\\n "`, `\n `], [`\n `, `(string) \`\\n \``, `\n `],

				['\t\n', `(string) '\\t\\n'`, `\t\n`], ["\t\n", `(string) "\\t\\n"`, `\t\n`], [`\t\n`, `(string) \`\\t\\n\``, `\t\n`],
				[' \t\n', `(string) ' \\t\\n'`, ` \t\n`], [" \t\n", `(string) " \\t\\n"`, ` \t\n`], [` \t\n`, `(string) \` \\t\\n\``, ` \t\n`],
				['\t \n', `(string) '\\t \\n'`, `\t \n`], ["\t \n", `(string) "\\t \\n"`, `\t \n`], [`\t \n`, `(string) \`\\t \\n\``, `\t \n`],
				['\t\n ', `(string) '\\t\\n '`, `\t\n `], ["\t\n ", `(string) "\\t\\n "`, `\t\n `], [`\t\n `, `(string) \`\\t\\n \``, `\t\n `],
				[' \t \n ', `(string) ' \\t \\n '`, ` \t \n `], [" \t \n ", `(string) " \\t \\n "`, ` \t \n `],
				[` \t \n `, `(string) \` \\t \\n \``, ` \t \n `],

				['\n\t', `(string) '\\n\\t'`, `\n\t`], ["\n\t", `(string) "\\n\\t"`, `\n\t`], [`\n\t`, `(string) \`\\n\\t\``, `\n\t`],
				[' \n\t', `(string) ' \\n\\t'`, ` \n\t`], [" \n\t", `(string) " \\n\\t"`, ` \n\t`], [` \n\t`, `(string) \` \\n\\t\``, ` \n\t`],
				['\n \t', `(string) '\\n \\t'`, `\n \t`], ["\n \t", `(string) "\\n \\t"`, `\n \t`], [`\n \t`, `(string) \`\\n \\t\``, `\n \t`],
				['\n\t ', `(string) '\\n\\t '`, `\n\t `], ["\n\t ", `(string) "\\n\\t "`, `\n\t `], [`\n\t `, `(string) \`\\n\\t \``, `\n\t `],
				[' \n \t ', `(string) ' \\n \\t '`, ` \n \t `], [" \n \t ", `(string) " \\n \\t "`, ` \n \t `],
				[` \n \t `, `(string) \` \\n \\t \``, ` \n \t `],

				['\u00A0', `(string) '\\u00A0'`, `\u00A0`], ["\u00A0", `(string) "\\u00A0"`, `\u00A0`],
				[`\u00A0`, `(string) \`\\u00A0\``, `\u00A0`],
				[' \u00A0', `(string) ' \\u00A0'`, ` \u00A0`], [" \u00A0", `(string) " \\u00A0"`, ` \u00A0`],
				[` \u00A0`, `(string) \` \\u00A0\``, ` \u00A0`],
				['\t\u00A0', `(string) '\\t\\u00A0'`, `\t\u00A0`], ["\t\u00A0", `(string) "\\t\\u00A0"`, `\t\u00A0`],
				[`\t\u00A0`, `(string) \`\\t\\u00A0\``, `\t\u00A0`],
				['\n\u00A0', `(string) '\\n\\u00A0'`, `\n\u00A0`], ["\n\u00A0", `(string) "\\n\\u00A0"`, `\n\u00A0`],
				[`\n\u00A0`, `(string) \`\\n\\u00A0\``, `\n\u00A0`],
				['\t\n\u00A0', `(string) '\\t\\n\\u00A0'`, `\t\n\u00A0`], ["\t\n\u00A0", `(string) "\\t\\n\\u00A0"`, `\t\n\u00A0`],
				[`\t\n\u00A0`, `(string) \`\\t\\n\\u00A0\``, `\t\n\u00A0`]
			],

			strT: [
				['test', `(string) 'test'`, `test`], ["test", `(string) "test"`, `test`], [`test`, `(string) \`test\``, `test`],
				['Test', `(string) 'Test'`, `Test`], ["Test", `(string) "Test"`, `Test`], [`Test`, `(string) \`Test\``, `Test`],
				['tesT', `(string) 'tesT'`, `tesT`], ["tesT", `(string) "tesT"`, `tesT`], [`tesT`, `(string) \`tesT\``, `tesT`],
				['tEst', `(string) 'tEst'`, `tEst`], ["tEst", `(string) "tEst"`, `tEst`], [`tEst`, `(string) \`tEst\``, `tEst`]
			],

			strN: [
				['0', `(string) '0'`, `0`], ['1', `(string) '1'`, `1`], ['-1', `(string) '-1'`, `-1`],
				['1e2', `(string) '1e2'`, `1e2`], ['-1e2', `(string) '-1e2'`, `-1e2`],
				['0xf', `(string) '0xf'`, `0xf`], ['-0xf', `(string) '-0xf'`, `-0xf`],

				['5.55', `(string) '5.55'`, `5.55`], ['-5.55', `(string) '-5.55'`, `-5.55`],
				['1e-99', `(string) '1e-99'`, `1e-99`], ['-1e-99', `(string) '-1e-99'`, `-1e-99`]
			],

			strS: [
				['(test)', `(string) '(test)'`, `(test)`], ['(Test)', `(string) '(Test)'`, `(Test)`],
				['(tesT)', `(string) '(tesT)'`, `(tesT)`],
				['"test"', `(string) '"test"'`, `"test"`], ['"Test"', `(string) '"Test"'`, `"Test"`],
				['"tesT"', `(string) '"tesT"'`, `"tesT"`],
				['\'test\'', `(string) '\\'test\\''`, `'test'`], ['\'Test\'', `(string) '\\'Test\\''`, `'Test'`],
				['\'tesT\'', `(string) '\\'tesT\\''`, `'tesT'`],
				['#test', `(string) '#test'`, `#test`], ['#Test', `(string) '#Test'`, `#Test`],
				['#tesT', `(string) '#tesT'`, `#tesT`]
			],

			num: [
				[0, `(number) 0`, `0`],
				[100, `(number) 100`, `100`], [-100, `(number) -100`, `-100`],
				[1e2, `(number) 1e2`, `${1e2}`], [-1e2, `(number) -1e2`, `${-1e2}`],
				[0xf, `(number) 0xf`, `${0xf}`], [-0xf, `(number) -0xf`, `${-0xf}`],

				[5.55, `(number) 5.55`, `5.55`], [-5.55, `(number) -5.55`, `-5.55`],
				[1e-2, `(number) 1e-2`, `${1e-2}`], [-1e-2, `(number) -1e-2`, `${-1e-2}`],

				[NaN, `NaN`, `NaN`], [Infinity, `Infinity`, `Infinity`], [-Infinity, `-Infinity`, `-Infinity`]
			],

			arr: [
				[[], `(array) []`, ``],
				[[1], `(array) [1]`, `1`], [[1, 2], `(array) [1, 2]`, `1,2`],

				[['test'], `(array) ['test']`, `test`],
				[['test', 'test'], `(array) ['test', 'test']`, `test,test`],
				[['Test'], `(array) ['Test']`, `Test`],
				[['tesT'], `(array) ['tesT']`, `tesT`],
				[['tEst'], `(array) ['tEst']`, `tEst`],

				[[' test '], `(array) [' test ']`, ` test `],
				[[' test ', ' test '], `(array) [' test ', ' test ']`, ` test , test `],
				[[' ', 'test', ' '], `(array) [' ', 'test', ' ']`, ` ,test, `],
				[['\t', 'test', '\t'], `(array) ['\\t', 'test', '\\t']`, `\t,test,\t`],
				[['\n', 'test', '\n'], `(array) ['\\n', 'test', '\\n']`, `\n,test,\n`],
				[['\u00A0', 'test', '\u00A0'], `(array) ['\\u00A0', 'test', '\\u00A0']`, `\u00A0,test,\u00A0`]
			],

			obj: [
				[{}, `(object) {}`, `[object Object]`],
				[{t: 'test'}, `(object) {t: 'test'}`, `[object Object]`],
				[{t1: 't1', t2: 't2'}, `(object) {t1: 't1', t2: 't2'}`, `[object Object]`],

				[{toString: () => 'test'}, `(object) {toString: () => 'test'}`, `test`],
				[{toString: () => 'Test'}, `(object) {toString: () => 'Test'}`, `Test`],
				[{toString: () => 'tesT'}, `(object) {toString: () => 'tesT'}`, `tesT`],
				[{toString: () => 'tEst'}, `(object) {toString: () => 'tEst'}`, `tEst`],

				[{toString: () => ' test '}, `(object) {toString: () => ' test '}`, ` test `],
				[{toString: () => '\ttest\t'}, `(object) {toString: () => '\\ttest\\t'}`, `\ttest\t`],
				[{toString: () => '\ntest\n'}, `(object) {toString: () => '\\ntest\\n'}`, `\ntest\n`],
				[{toString: () => '\u00A0test\u00A0'}, `(object) {toString: () => '\\u00A0test\\u00A0'}`, `\u00A0test\u00A0`]
			],

			func: [
				[() => {}, `(function) () => {}`, `() => {}`],
				[() => 'test', `(function) () => 'test'`, `() => 'test'`],
				[function() {}, `(function) function() {}`, `function() {}`],
				[function() {return 'test';}, `(function) function() {return 'test';}`, `function() {return 'test';}`]
			],

			bool: [[false, `(bool) false`, `false`], [true, `(bool) true`, `true`]],
			notset: [[undefined, `undefined`, ``], [null, `null`, ``]]
		};
	}

	describe('Test "str" library', () => {
		describe('checking "is" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.str.is, 'function "is" is not added or is not a function');
			});

			let params = getParams();

			it('call with a string parameters', () => {
				let strParams = params.strE.concat(params.strT, params.strN, params.strS);
				for(let p in strParams) {
					assert.isTrue(helpLib.str.is(strParams[p][0]), `result with "${strParams[p][1]}" parameter is incorrect`);
				}
			});

			it('call with not a string parameters', () => {
				let noStrParams = params.num.concat(params.arr, params.obj, params.func, params.bool, params.notset);
				for(let p in noStrParams) {
					assert.isFalse(helpLib.str.is(noStrParams[p][0]), `result with "${noStrParams[p][1]}" parameter is incorrect`);
				}
			});
		});

		describe('checking "check" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.str.check, 'function "check" is not added or is not a function');
			});

			let params = getParams();

			it('call with parameters who can convert to string', () => {
				let strParams = params.strE.concat(params.strT, params.strN, params.strS,
					params.num, params.arr, params.obj, params.func, params.bool);

				for(let p in strParams) {
					assert.strictEqual(helpLib.str.check(strParams[p][0]), strParams[p][2],
						`result with "${strParams[p][1]}" parameter is incorrect`);
				}
			});

			it('call with a values who can convert to string as "str" parameter and some "defValue" parameter', () => {
				let strParams = params.strE.concat(params.strT, params.strN, params.strS,
					params.num, params.arr, params.obj, params.func, params.bool);

				for(let p in strParams) {
					assert.strictEqual(helpLib.str.check(strParams[p][0], null), strParams[p][2],
						`result with "${strParams[p][1]}, null" parameters is incorrect`);
				}
			});

			it('call without parameters or with null or undefined values', () => {
				assert.isString(helpLib.str.check(), 'result without parameter is incorrect');

				assert.isString(helpLib.str.check(undefined), 'result with "undefined" parameter is incorrect');
				assert.isString(helpLib.str.check(undefined, undefined), 'result with "undefined, undefined" parameters is incorrect');

				assert.isString(helpLib.str.check(null), 'result with "null" parameter is incorrect');
				assert.isNull(helpLib.str.check(null, null), 'result with "null, null" parameters is incorrect');
			});

			it('call with parameters who can not convert to string', () => {
				for(let p in params.notset) {
					assert.strictEqual(helpLib.str.check(params.notset[p][0]), params.notset[p][2],
						`result with "${params.notset[p][1]}" parameter is incorrect`);
				}
			});

			it('call with values who can not convert to string as "str" parameter and some "defValue" parameter', () => {
				for(let p in params.notset) {
					assert.strictEqual(helpLib.str.check(params.notset[p][0], null), null,
						`result with "${params.notset[p][1]}, null" parameters is incorrect`);
				}
			});
		});

		describe('checking "trim" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.str.trim, 'function "trim" is not added or is not a function');
			});

			let params = getParams();

			it('call with parameters who can convert to string', () => {
				for(let p1 in params.strE) {
					assert.strictEqual(helpLib.str.trim(params.strE[p1][0]), '', `result with "${params.strE[p1][1]}" parameter is incorrect`);

					let strParams = params.strT.concat(params.strN, params.strS, params.num, params.bool);
					for(let p2 in strParams) {
						let vp1 = params.strE[p1];
						let vp2 = strParams[p2];
						let dp1 = vp1[1].replace(/^\(string\)\s['"`](.*)['"`]$/, '$1');
						let dp2 = vp2[1].replace(/^\(string\)\s['"`](.*)['"`]$/, '$1').replace(/^\((?:(?:number)|(?:bool))\)\s(.*)$/, '$1');
						let comboParams  = [
							vp2,
							[vp1[0] + vp2[0], `(string) '${dp1}${dp2}'`, vp2[2]],
							[vp2[0] + vp1[0], `(string) '${dp2}${dp1}'`, vp2[2]],
							[vp1[0] + vp2[0] + vp1[0], `(string) '${dp1}${dp2}${dp1}'`, vp2[2]],
							[vp1[0] + vp2[0] + vp1[0] + vp2[0] + vp1[0], `(string) '${dp1}${dp2}${dp1}${dp2}${dp1}'`, vp2[2] + vp1[2] + vp2[2]]
						];

						for(let p3 in comboParams) {
							assert.strictEqual(helpLib.str.trim(comboParams[p3][0]), comboParams[p3][2],
								`result with "${comboParams[p3][1]}" parameter is incorrect`);
						}
					}
				}

				let otheParams = params.arr.concat(params.obj, params.func);
				for(let p in otheParams) {
					let res = String(otheParams[p][2]).trim();
					assert.strictEqual(helpLib.str.trim(otheParams[p][0]), res, `result with "${otheParams[p][1]}" parameter is incorrect`);
				}
			});

			it('call with parameters who can not convert to string', () => {
				for(let p in params.notset) {
					assert.strictEqual(helpLib.str.trim(params.notset[p][0]), params.notset[p][2],
						`result with "${params.notset[p][1]}" parameter is incorrect`);
				}
			});
		});

		describe('checking "clearDoubleSpace" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.str.clearDoubleSpace, 'function "clearDoubleSpace" is not added or is not a function');
			});

			let params = getParams();

			params.strE = [
				['', `(string) ''`, ``], ["", `(string) ""`, ``], [``, `(string) \`\``, ``],
				['  ', `(string) '  '`, ` `], ["  ", `(string) "  "`, ` `], [`  `, `(string) \`  \``, ` `],
				['   ', `(string) '   '`, ` `], ["   ", `(string) "   "`, ` `], [`   `, `(string) \`   \``, ` `],

				['\t', `(string) '\\t'`, ` `], ["\t", `(string) "\\t"`, ` `], [`\t`, `(string) \`\\t\``, ` `],
				['  \t', `(string) '  \\t'`, ` `], ["  \t", `(string) "  \\t"`, ` `], [`  \t`, `(string) \`  \\t\``, ` `],
				['\t\t', `(string) '\\t\\t'`, ` `], ["\t\t", `(string) "\\t\\t"`, ` `], [`\t\t`, `(string) \`\\t\\t\``, ` `],
				['\t \t', `(string) '\\t \\t'`, ` `], ["\t \t", `(string) "\\t \\t"`, ` `], [`\t \t`, `(string) \`\\t \\t\``, ` `],
				['  \t \t', `(string) '  \\t \\t'`, ` `], ["  \t \t", `(string) "  \\t \\t"`, ` `], [`  \t \t`, `(string) \`  \\t \\t\``, ` `],
				['\t\t\t', `(string) '\\t\\t\\t'`, ` `], ["\t\t\t", `(string) "\\t\\t\\t"`, ` `], [`\t\t\t`, `(string) \`\\t\\t\\t\``, ` `],

				['\n', `(string) '\\n'`, `\n`], ["\n", `(string) "\\n"`, `\n`], [`\n`, `(string) \`\\n\``, `\n`],
				['\n ', `(string) '\\n '`, `\n `], ["\n ", `(string) "\\n "`, `\n `], [`\n `, `(string) \`\\n \``, `\n `],
				['  \n', `(string) '  \\n'`, ` \n`], ["  \n", `(string) "  \\n"`, ` \n`], [`  \n`, `(string) \`  \\n\``, ` \n`],
				['\n  \n   ', `(string) '\\n  \\n   '`, `\n \n `], ["\n  \n   ", `(string) "\\n  \\n   "`, `\n \n `],
				[`\n  \n   `, `(string) \`\\n  \\n   \``, `\n \n `],

				['\n\t', `(string) '\\n\\t'`, `\n `], ["\n\t", `(string) "\\n\\t"`, `\n `], [`\n\t`, `(string) \`\\n\\t\``, `\n `],
				['\t \n', `(string) '\\t \\n'`, ` \n`], ["\t \n", `(string) "\\t \\n"`, ` \n`], [`\t \n`, `(string) \`\\t \\n\``, ` \n`],
				['\t\t\n', `(string) '\\t\\t\\n'`, ` \n`],
				["\t\t\n", `(string) "\\t\\t\\n"`, ` \n`],
				[`\t\t\n`, `(string) \`\\t\\t\\n\``, ` \n`],
				['\n\t\t\n\t\t\t', `(string) '\\n\\t\\t\\n\\t\\t\\t'`, `\n \n `],
				["\n\t\t\n\t\t\t", `(string) "\\n\\t\\t\\n\\t\\t\\t"`, `\n \n `],
				[`\n\t\t\n\t\t\t`, `(string) \`\\n\\t\\t\\n\\t\\t\\t\``, `\n \n `],
				['\n\t \n\t  ', `(string) '\\n\\t \\n\\t  '`, `\n \n `],
				["\n\t \n\t  ", `(string) "\\n\\t \\n\\t  "`, `\n \n `],
				[`\n\t \n\t  `, `(string) \`\\n\\t \\n\\t  \``, `\n \n `],


				['\u00A0', `(string) '\\u00A0'`, ` `], ["\u00A0", `(string) "\\u00A0"`, ` `], [`\u00A0`, `(string) \`\\u00A0\``, ` `],
				['\u00A0\u00A0', `(string) '\\u00A0\\u00A0'`, ` `],
				["\u00A0\u00A0", `(string) "\\u00A0\\u00A0"`, ` `],
				[`\u00A0\u00A0`, `(string) \`\\u00A0\\u00A0\``, ` `],
				[' \u00A0 \u00A0', `(string) ' \\u00A0 \\u00A0'`, ` `],
				[" \u00A0 \u00A0", `(string) " \\u00A0 \\u00A0"`, ` `],
				[` \u00A0 \u00A0`, `(string) \` \\u00A0 \\u00A0\``, ` `],
				['\u00A0\u00A0   \u00A0', `(string) '\\u00A0\\u00A0   \\u00A0'`, ` `],
				["\u00A0\u00A0   \u00A0", `(string) "\\u00A0\\u00A0   \\u00A0"`, ` `],
				[`\u00A0\u00A0   \u00A0`, `(string) \`\\u00A0\\u00A0   \\u00A0\``, ` `],

				[' \u00A0\t\u00A0', `(string) ' \\u00A0\\t\\u00A0'`, ` `],
				[" \u00A0\t\u00A0", `(string) " \\u00A0\\t\\u00A0"`, ` `],
				[` \u00A0\t\u00A0`, `(string) \` \\u00A0\\t\\u00A0\``, ` `],
				['\u00A0\u00A0\t \t\u00A0\t', `(string) '\\u00A0\\u00A0\\t \\t\\u00A0\\t'`, ` `],
				["\u00A0\u00A0\t \t\u00A0\t", `(string) "\\u00A0\\u00A0\\t \\t\\u00A0\\t"`, ` `],
				[`\u00A0\u00A0\t \t\u00A0\t`, `(string) \`\\u00A0\\u00A0\\t \\t\\u00A0\\t\``, ` `],
				['\t\u00A0\t\t\u00A0  \t', `(string) '\\t\\u00A0\\t\\t\\u00A0  \\t'`, ` `],
				["\t\u00A0\t\t\u00A0  \t", `(string) "\\t\\u00A0\\t\\t\\u00A0  \\t"`, ` `],
				[`\t\u00A0\t\t\u00A0  \t`, `(string) \`\\t\\u00A0\\t\\t\\u00A0  \\t\``, ` `],

				['\u00A0\t \n\u00A0\u00A0\t\u00A0', `(string) '\\u00A0\\t \\n\\u00A0\\u00A0\\t\\u00A0'`, ` \n `],
				["\u00A0\t \n\u00A0\u00A0\t\u00A0", `(string) "\\u00A0\\t \\n\\u00A0\\u00A0\\t\\u00A0"`, ` \n `],
				[`\u00A0\t \n\u00A0\u00A0\t\u00A0`, `(string) \`\\u00A0\\t \\n\\u00A0\\u00A0\\t\\u00A0\``, ` \n `],
				['\u00A0\n\t\u00A0 \n  ', `(string) '\\u00A0\\n\\t\\u00A0 \\n  '`, ` \n \n `],
				["\u00A0\n\t\u00A0 \n  ", `(string) "\\u00A0\\n\\t\\u00A0 \\n  "`, ` \n \n `],
				[`\u00A0\n\t\u00A0 \n  `, `(string) \`\\u00A0\\n\\t\\u00A0 \\n  \``, ` \n \n `],
				['\n\u00A0\t \u00A0\n\u00A0\t\u00A0\n', `(string) '\\n\\u00A0\\t \\u00A0\\n\\u00A0\\t\\u00A0\\n'`, `\n \n \n`],
				["\n\u00A0\t \u00A0\n\u00A0\t\u00A0\n", `(string) "\\n\\u00A0\\t \\u00A0\\n\\u00A0\\t\\u00A0\\n"`, `\n \n \n`],
				[`\n\u00A0\t \u00A0\n\u00A0\t\u00A0\n`, `(string) \`\\n\\u00A0\\t \\u00A0\\n\\u00A0\\t\\u00A0\\n\``, `\n \n \n`]
			];

			params.arr.push(
				[['   test   '], `(array) ['   test   ']`, ` test `],
				[['test  ', '  test'], `(array) ['test  ', '  test']`, `test , test`],
				[['  test   ', '   test  '], `(array) ['  test   ', '   test  ']`, ` test , test `],
				[['\t\t ', 'test', ' \t\t'], `(array) ['\\t\\t ', 'test', ' \\t\\t']`, ` ,test, `],
				[['\u00A0\u00A0 ', 'test', ' \u00A0\u00A0'], `(array) ['\\u00A0\\u00A0 ', 'test', ' \\u00A0\\u00A0']`, ` ,test, `]
			);

			params.obj.push(
				[{toString: () => '   test   '}, `(object) {toString: () => '   test   '}`, ` test `],
				[{toString: () => 'test  test'}, `(object) {toString: () => 'test  test'}`, `test test`],
				[{toString: () => '  test   test  '}, `(object) {toString: () => '  test   test  '}`, ` test test `],
				[{toString: () => '\t\t test \t\t'}, `(object) {toString: () => '\\t\\t test \\t\\t'}`, ` test `],
				[{toString: () => '\u00A0\u00A0 test \u00A0\u00A0'}, `(object) {toString: () => '\\u00A0\\u00A0 test \\u00A0\\u00A0'}`, ` test `]
			);

			it('call with parameters who can convert to string', () => {
				for(let p1 in params.strE) {
					assert.strictEqual(helpLib.str.clearDoubleSpace(params.strE[p1][0]), params.strE[p1][2],
						`result with "${params.strE[p1][1]}" parameter is incorrect`);

					let strParams = params.strT.concat(params.strN, params.strS, params.num, params.bool);
					for(let p2 in strParams) {
						let vp1 = params.strE[p1];
						let vp2 = strParams[p2];
						let dp1 = vp1[1].replace(/^\(string\)\s['"`](.*)['"`]$/, '$1');
						let dp2 = vp2[1].replace(/^\(string\)\s['"`](.*)['"`]$/, '$1').replace(/^\((?:(?:number)|(?:bool))\)\s(.*)$/, '$1');
						let comboParams  = [
							vp2,
							[vp1[0] + vp2[0], `(string) '${dp1}${dp2}'`, vp1[2] + vp2[2]],
							[vp2[0] + vp1[0], `(string) '${dp2}${dp1}'`, vp2[2] + vp1[2]],
							[vp1[0] + vp2[0] + vp1[0], `(string) '${dp1}${dp2}${dp1}'`, vp1[2] + vp2[2] + vp1[2]],
							[vp2[0] + vp1[0] + vp2[0], `(string) '${dp2}${dp1}${dp2}'`, vp2[2] + vp1[2] + vp2[2]],
							[vp1[0] + vp2[0] + vp1[0] + vp2[0] + vp1[0], `(string) '${dp1}${dp2}${dp1}${dp2}${dp1}'`, vp1[2]+ vp2[2] + vp1[2] + vp2[2] + vp1[2]]
						];

						for(let p3 in comboParams) {
							assert.strictEqual(helpLib.str.clearDoubleSpace(comboParams[p3][0]), comboParams[p3][2],
								`result with "${comboParams[p3][1]}" parameter is incorrect`);
						}
					}
				}

				let otheParams = params.arr.concat(params.obj, params.func);
				for(let p in otheParams) {
					let res = otheParams[p][2].replace(/[\t\u00A0]+/g, ' ');
					assert.strictEqual(helpLib.str.clearDoubleSpace(otheParams[p][0]), res,
						`result with "${otheParams[p][1]}" parameter is incorrect`);
				}
			});

			it('call with parameters who can not convert to string', () => {
				for(let p in params.notset) {
					assert.strictEqual(helpLib.str.clearDoubleSpace(params.notset[p][0]), params.notset[p][2],
						`result with "${params.notset[p][1]}" parameter is incorrect`);
				}
			});
		});

		describe('checking "ucFirst" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.str.ucFirst, 'function "ucFirst" is not added or is not a function');
			});

			let params = getParams();

			params.strUC = [
				['test', `(string) 'test'`, `Test`], ['Test', `(string) 'Test'`, `Test`],
				['tesT', `(string) 'tesT'`, `TesT`], ['tEst', `(string) 'tEst'`, `TEst`],

				['test test', `(string) 'test test'`, `Test test`], [' test test', `(string) ' test test'`, ` test test`],
				['\ttest test', `(string) '\\ttest test'`, `\ttest test`], ['\ntest test', `(string) '\\ntest test'`, `\ntest test`],
				['\u00A0test test', `(string) '\\u00A0test test'`, `\u00A0test test`]
			];

			it('call with parameters who can convert to string', () => {
				let changedParams = params.strT.concat(params.arr, params.obj, params.func, params.bool);
				for(let p in changedParams) {
					let res = changedParams[p][2].length > 0 ? (changedParams[p][2][0].toUpperCase() + changedParams[p][2].substr(1)) : '';
					assert.strictEqual(helpLib.str.ucFirst(changedParams[p][0]), res,
						`result with "${changedParams[p][1]}" parameter is incorrect`);
				}

				let noChangedParams = params.strE.concat(params.strN, params.strS, params.num, params.strUC);
				for(let p in noChangedParams) {
					assert.strictEqual(helpLib.str.ucFirst(noChangedParams[p][0]), noChangedParams[p][2],
						`result with "${noChangedParams[p][1]}" parameter is incorrect`);
				}
			});

			it('call with parameters who can not convert to string', () => {
				for(let p in params.notset) {
					assert.strictEqual(helpLib.str.ucFirst(params.notset[p][0]), params.notset[p][2],
						`result with "${params.notset[p][1]}" parameter is incorrect`);
				}
			});
		});

		describe('checking "lcFirst" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.str.lcFirst, 'function "lcFirst" is not added or is not a function');
			});

			let params = getParams();

			params.strLC = [
				['test', `(string) 'test'`, `test`], ['Test', `(string) 'Test'`, `test`],
				['TesT', `(string) 'TesT'`, `tesT`], ['TEst', `(string) 'TEst'`, `tEst`],

				['Test Test', `(string) 'Test Test'`, `test Test`], [' Test Test', `(string) ' Test Test'`, ` Test Test`],
				['\tTest Test', `(string) '\\tTest Test'`, `\tTest Test`], ['\nTest Test', `(string) '\\nTest Test'`, `\nTest Test`],
				['\u00A0Test Test', `(string) '\\u00A0Test Test'`, `\u00A0Test Test`]
			];

			it('call with parameters who can convert to string', () => {
				let changedParams = params.strT.concat(params.arr, params.obj, params.num);
				for(let p in changedParams) {
					let res = changedParams[p][2].length > 0 ? (changedParams[p][2][0].toLowerCase() + changedParams[p][2].substr(1)) : '';
					assert.strictEqual(helpLib.str.lcFirst(changedParams[p][0]), res,
						`result with "${changedParams[p][1]}" parameter is incorrect`);
				}

				let noChangedParams = params.strE.concat(params.strN, params.strS, params.func, params.bool, params.strLC);
				for(let p in noChangedParams) {
					assert.strictEqual(helpLib.str.lcFirst(noChangedParams[p][0]), noChangedParams[p][2],
						`result with "${noChangedParams[p][1]}" parameter is incorrect`);
				}
			});

			it('call with parameters who can not convert to string', () => {
				for(let p in params.notset) {
					assert.strictEqual(helpLib.str.lcFirst(params.notset[p][0]), params.notset[p][2],
						`result with "${params.notset[p][1]}" parameter is incorrect`);
				}
			});
		});

		describe('checking "reverse" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.str.reverse, 'function "reverse" is not added or is not a function');
			});

			let params = getParams();

			params.strR = [
				['test', `(string) 'test'`, `tset`], ['Test', `(string) 'Test'`, `tseT`],
				['tesT', `(string) 'tesT'`, `Tset`], ['tEst', `(string) 'tEst'`, `tsEt`],
				['#test', `(string) '#test'`, `tset#`], ['test#', `(string) 'test#'`, `#tset`],

				['test test', `(string) 'test test'`, `tset tset`], [' test test', `(string) ' test test'`, `tset tset `],
				['\ttest test', `(string) '\\ttest test'`, `tset tset\t`], ['\ntest test', `(string) '\\ntest test'`, `tset tset\n`],
				['\u00A0test test', `(string) '\\u00A0test test'`, `tset tset\u00A0`],

				['100', `(string) '100'`, `001`], ['-0xff', `(string) '-0xff'`, `ffx0-`]
			];


			it('call with parameters who can convert to string', () => {
				let changedParams = params.strE.concat(params.strT, params.strN, params.strS,
					params.num, params.arr, params.obj, params.func, params.bool);

				for(let p in changedParams) {
					let res = Array.from(changedParams[p][2]).reverse().join('');
					assert.strictEqual(helpLib.str.reverse(changedParams[p][0]), res,
						`result with "${changedParams[p][1]}" parameter is incorrect`);
				}

				for(let p in params.strR) {
					assert.strictEqual(helpLib.str.reverse(params.strR[p][0]), params.strR[p][2],
						`result with "${params.strR[p][1]}" parameter is incorrect`);
				}
			});

			it('call with parameters who can not convert to string', () => {
				for(let p in params.notset) {
					assert.strictEqual(helpLib.str.reverse(params.notset[p][0]), params.notset[p][2],
						`result with "${params.notset[p][1]}" parameter is incorrect`);
				}
			});
		});

		describe('checking "test" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.str.test, 'function "test" is not added or is not a function');
			});

			let params = getParams();

			params.findReg = [
				[/^$/, `(RegExp) /^$/`, /^$/], [/\s$/, `(RegExp) /\\s$/`, /\s$/], [/\s\n/, `(RegExp) /\\s\\n/`, /\s\n/],
				[/^[tT]/, `(RegExp) /^[tT]/`, /^[tT]/], [/esT$/, `(RegExp) /esT$/`, /esT$/],
				[/\d/, `(RegExp) /\\d/`, /\d/], [/^\-?0x/, `(RegExp) /^\\-?0x/`, /^\-?0x/],
				[/[Nn]a[Nn]/, `(RegExp) /[Nn]a[Nn]/`, /[Nn]a[Nn]/], [/-?[Ii]\w{7}/, `(RegExp) /-?[Ii]\\w{7}/`, /-?[Ii]\w{7}/],
				[/^([\("'#])\w+([\)"'])?$/, `(RegExp) /^([\\("'#])\\w+([\\)"'])?$/`, /^([\("'#])\w+([\)"'])?$/],
				[/\{[^\}]*\}$/, `(RegExp) /\\{[^\\}]*\\}$/`, /\{[^\}]*\}$/],
				[/(obj)|(ret)|(\)\s+=>)/, `(RegExp) /(obj)|(ret)|(\\)\\s+=>)/`, /(obj)|(ret)|(\)\s+=>)/],
				[/^((fal)|(tr))\w{2}$/, `(RegExp) /^(fal)|(tr)\w{2}$/`, /^((fal)|(tr))\w{2}$/]
			];

			params.notFindReg = [
				[/\?/, `(RegExp) /\\?/`], [/^[BbWw]/, `(RegExp) /^[BbWw]/`],
				[/^\s\d/, `(RegExp) /^\\s\\d/`], [/\d[az]$/, `(RegExp) /\\d[az]$/`],
				[/\+[Ii]\w{7}/, `(RegExp) /\\+[Ii]\\w{7}/`],
				[/(oBj)|(reT)|(\)=>)/, `(RegExp) /(oBj)|(reT)|(\\)=>)/`],
				[/^((fal)|(tr))\w{3,}$/, `(RegExp) /^((fal)|(tr))\\w{3,}$/`]
			];

			params.findRegStr = [
				['^$', `(string) '^$'`, /^$/], ['\\s$', `(string) '\\s$'`, /\s$/], ['\\s\\n', `(string) '\\s\\n'`, /\s\n/],
				['^[tT]', `(string) '^[tT]'`, /^[tT]/], ['esT$', `(string) 'esT$'`, /esT$/],
				['\\d', `(string) '\\d'`, /\d/], ['^\\-?0x', `(string) '^\\-?0x'`, /^\-?0x/],
				['[Nn]a[Nn]', `(string) '[Nn]a[Nn]'`, /[Nn]a[Nn]/], ['-?[Ii]\\w{7}', `(string) '-?[Ii]\\w{7}'`, /-?[Ii]\w{7}/],
				['^([\\("\'#])\\w+([\\)"\'])?$', `(string) '^([\\("'#])\\w+([\\)"'])?$'`, /^([\("'#])\w+([\)"'])?$/],
				['\\{[^\\}]*\\}$', `(string) '\\{[^\\}]*\\}$'`, /\{[^\}]*\}$/],
				['(obj)|(ret)|(\\)\\s+=>)', `(string) '(obj)|(ret)|(\\)\\s+=>)'`, /(obj)|(ret)|(\)\s+=>)/],
				['^((fal)|(tr))\\w{2}$', `(string) '^((fal)|(tr))\\w{2}$'`, /^((fal)|(tr))\w{2}$/]
			];

			params.notFindRegStr = [
				['\\?', `(RegExp) '\\?'`], ['^[BbWw]', `(RegExp) '^[BbWw]'`],
				['^\\s\\d', `(RegExp) '^\\s\\d'`], ['\\d[az]$', `(RegExp) '\\d[az]$'`],
				['\\+[Ii]\\w{7}', `(RegExp) '\\+[Ii]\\w{7}'`],
				['(oBj)|(reT)|(\\)=>)', `(RegExp) '(oBj)|(reT)|(\\)=>)'`],
				['^((fal)|(tr))\\w{3,}$', `(RegExp) '^((fal)|(tr))\\w{3,}$'`]
			];

			params.badRegStr = [
				['^[tT', `(string) '^[tT'`], ['[tT]{', `(string) '[tT]{'`],
				['esT)', `(string) 'esT)'`], ['(?tT)', `(string) '(?tT)'`]
			];

			it('call with parameters who can convert to string as "str" parameter ' +
				'and regular expression who must find something as "regExp" parameter', () => {
				let strParams = params.strE.concat(params.strT, params.strN, params.strS,
					params.num, params.arr, params.obj, params.func, params.bool);

				for(let p1 in strParams) {
					let regRes = false;
					for(let p2 in params.findReg) {
						let res = params.findReg[p2][2].test(strParams[p1][2]);
						regRes = regRes === false && res ? true : regRes;

						assert.strictEqual(helpLib.str.test(strParams[p1][0], params.findReg[p2][0]), res,
							`result with "${strParams[p1][1]}, ${params.findReg[p2][1]}" parameters is incorrect`);
					}

					assert.isTrue(regRes, `not one of the search options are not triggered with "${strParams[p1][1]}" as "str" parameter`);
				}
			});

			it('call with parameters who can convert to string as "str" parameter ' +
				'and regular expression who not must find something as "regExp" parameter', () => {
				let strParams = params.strE.concat(params.strT, params.strN, params.strS,
					params.num, params.arr, params.obj, params.func, params.bool);

				for(let p1 in strParams) {
					for(let p2 in params.notFindReg) {
						assert.isFalse(helpLib.str.test(strParams[p1][0], params.notFindReg[p2][0]),
							`result with "${strParams[p1][1]}, ${params.notFindReg[p2][1]}" parameters is incorrect`);
					}
				}
			});

			it('call with parameters who can convert to string as "str" parameter ' +
				'and string with regular expression who must find something as "regExp" parameter', () => {
				let strParams = params.strE.concat(params.strT, params.strN, params.strS,
					params.num, params.arr, params.obj, params.func, params.bool);

				for(let p1 in strParams) {
					let regRes = false;
					for(let p2 in params.findRegStr) {
						let res = params.findRegStr[p2][2].test(strParams[p1][2]);
						regRes = regRes == false && res ? true : regRes;

						assert.strictEqual(helpLib.str.test(strParams[p1][0], params.findRegStr[p2][0]), res,
							`result with "${strParams[p1][1]}, ${params.findRegStr[p2][1]}" parameters is incorrect`);
					}

					assert.isTrue(regRes, `not one of the search options are not triggered with "${strParams[p1][1]}" as "str" parameter`);
				}
			});

			it('call with parameters who can convert to string as "str" parameter ' +
				'and string with regular expression who not must find something as "regExp" parameter', () => {
				let strParams = params.strE.concat(params.strT, params.strN, params.strS,
					params.num, params.arr, params.obj, params.func, params.bool);

				for(let p1 in strParams) {
					for(let p2 in params.notFindRegStr) {
						assert.isFalse(helpLib.str.test(strParams[p1][0], params.notFindRegStr[p2][0]),
							`result with "${strParams[p1][1]}, ${params.notFindRegStr[p2][1]}" parameters is incorrect`);
					}
				}
			});

			it('call with parameters who can convert to string as "str" and "regExp" parameters', () => {
				let strParams = params.strE.concat(params.strT, params.strN, params.strS,
					params.num, params.arr, params.obj, params.bool);

				for(let p1 in strParams) {
					let regRes = false;
					for(let p2 in strParams) {
						let res = (new RegExp(strParams[p1][2])).test(strParams[p2][2]);
						regRes = regRes == false && res ? true : regRes;

						assert.strictEqual(helpLib.str.test(strParams[p2][0], strParams[p1][0]), res,
							`result with "${strParams[p2][1]}, ${strParams[p1][1]}" parameters is incorrect`);
					}

					assert.isTrue(regRes, `none of the string did not match the search option "${strParams[p1][1]}" as "regExp" parameter`);
				}
			});

			it('call without parameters or with null or undefined values', () => {
				assert.isFalse(helpLib.str.test(), 'result without parameter is incorrect');

				assert.isFalse(helpLib.str.test(undefined), 'result with "undefined" parameter is incorrect');
				assert.isFalse(helpLib.str.test(undefined, undefined), 'result with "undefined, undefined" parameters is incorrect');

				assert.isFalse(helpLib.str.test(null), 'result with "null" parameter is incorrect');
				assert.isFalse(helpLib.str.test(null, null), 'result with "null, null" parameters is incorrect');
			});

			it('call with values who can not convert to string as "str" parameter and some "regExp" parameter', () => {
				for(let p in params.notset) {
					assert.isFalse(helpLib.str.test(params.notset[p][0], /^.*$/),
						`result with "${params.notset[p][1]}, (RegExp) /^.*$/" parameters is incorrect`);
				}
			});

			it('call with parameters who can convert to string as "str" parameter ' +
				'and string with invalid regular expression as "regExp" parameter', () => {
				let strParams = params.strE.concat(params.strT, params.strN, params.strS,
					params.num, params.arr, params.obj, params.func, params.bool);

				for(let p1 in strParams) {
					for(let p2 in params.badRegStr) {
						assert.isFalse(helpLib.str.test(strParams[p1][0], params.badRegStr[p2][0]),
							`result with "${strParams[p1][1]}, ${params.badRegStr[p2][1]}" parameters is incorrect`);
					}
				}
			});

			it('call with values who can not convert to string as "str" parameter ' +
				'and with values who can not convert to string as "regExp" parameter', () => {
				let strParams = params.strE.concat(params.strT, params.strN, params.strS,
					params.num, params.arr, params.obj, params.bool);

				for(let p1 in strParams) {
					for(let p2 in params.notset) {
						assert.isFalse(helpLib.str.test(strParams[p1][0], params.notset[p2][0]),
							`result with "${strParams[p1][1]}, ${params.notset[p2][1]}" parameters is incorrect`);
					}
				}
			});
		});

		describe('checking "testList" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.str.testList, 'function "testList" is not added or is not a function');
			});

			let params = getParams();

			params.findReg = [
				[[/^$/, /\s$/, /\s\n/], `(array) [/^$/, /\\s$/, /\\s\\n/]`, /(^$)|(\s$)|(\s\n)/],
				[[/^[tT]/, /\d/, /^\-?0x/], `(array) [/^[tT]/, /\\d/, /^\\-?0x/]`, /(^[tT])|(\d)|(^\-?0x)/],
				[[/[Nn]a[Nn]/, /-?[Ii]\w{7}/], `(array) [/[Nn]a[Nn]/, /-?[Ii]\\w{7}/]`, /([Nn]a[Nn])|(-?[Ii]\w{7})/],
				[[/^([\("'#])\w+([\)"'])?$/], `(array) [/^([\\("'#])\\w+([\\)"'])?$/]`, /^([\("'#])\w+([\)"'])?$/],
				[[/\{[^\}]*\}$/], `(array) [/\\{[^\\}]*\\}$/]`, /\{[^\}]*\}$/],
				[[/obj/, /ret/, /\)\s+=>/], `(array) [/obj/, /ret/, /\\)\\s+=>/]`, /(obj)|(ret)|(\)\s+=>)/],
				[[/^(fal)\w{2}$/, /^(tr)\w{2}$/], `(array) [/^(fal)\\w{2}$/, /^(tr)\\w{2}$/]`, /(^(fal)\w{2}$)|(^(tr)\w{2}$)/]
			];

			params.notFindReg = [
				[[/\?/, /^[BbWw]/], `(array) [/\\?/, /^[BbWw]/]`],
				[[/^\s\d/, /\d[az]$/], `(array) [/^\\s\\d/, /\\d[az]$/]`],
				[[/\+[Ii]\w{7}/, /oBj/, /reT/, /\)=>/], `(array) [/\\+[Ii]\\w{7}/, /oBj/, /reT/, /\\)=>/]`],
				[[/^(fal)\w{3,}$/, /^(tr)\w{3,}$/], `(array) [/^(fal)\\w{3,}$/, /^(tr)\\w{3,}$/]`]
			];

			params.findRegStr = [
				[['^$', '\\s$', '\\s\\n'], `(array) ['^$', '\\s$', '\\s\\n']`, /(^$)|(\s$)|(\s\n)/],
				[['^[tT]', '\\d', '^\\-?0x'], `(array) ['^[tT]', '\\d', '^\\-?0x']`, /(^[tT])|(\d)|(^\-?0x)/],
				[['[Nn]a[Nn]', '-?[Ii]\\w{7}'], `(array) ['[Nn]a[Nn]', '-?[Ii]\\w{7}']`, /([Nn]a[Nn])|(-?[Ii]\w{7})/],
				[['^([\\("\'#])\\w+([\\)"\'])?$'], `(array) ['^([\\("\\'#])\\w+([\\)"\\'])?$']`, /^([\("'#])\w+([\)"'])?$/],
				[['\\{[^\\}]*\\}$'], `(array) ['\\{[^\\}]*\\}$']`, /\{[^\}]*\}$/],
				[['obj', 'ret', '\\)\\s+=>'], `(array) ['obj', 'ret', '\\)\\s+=>']`, /(obj)|(ret)|(\)\s+=>)/],
				[['^(fal)\\w{2}$', '^(tr)\\w{2}$'], `(array) ['^(fal)\\w{2}$', '^(tr)\\w{2}$']`, /(^(fal)\w{2}$)|(^(tr)\w{2}$)/]
			];

			params.notFindRegStr = [
				[['\\?', '^[BbWw]'], `(array) ['\\?', '^[BbWw]']`],
				[['^\\s\\d', '\\d[az]$'], `(array) ['^\\s\\d', '\\d[az]$']`],
				[['\\+[Ii]\\w{7}', 'oBj', 'reT', '\\)=>'], `(array) ['\\+[Ii]\\w{7}', 'oBj', 'reT', '\\)=>']`],
				[['^(fal)\\w{3,}$', '^(tr)\\w{3,}$'] ,`(array) ['^(fal)\\w{3,}$', '^(tr)\\w{3,}$']`]
			];

			params.badRegStr = [
				[['^('], `(array) ['^(']`],
				[['^[tT', '[tT]{'], `(array) ['^[tT', '[tT]{']`],
				[['esT)', '(?tT)'], `(array) ['esT)', '(?tT)']`]
			];

			it('call with parameters who can convert to string as "str" parameter ' +
				'and with list of regular expressions who must find something as "list" parameter', () => {
				let strParams = params.strE.concat(params.strT, params.strN, params.strS,
					params.num, params.arr, params.obj, params.func, params.bool);

				for(let p1 in strParams) {
					let regRes = false;
					for(let p2 in params.findReg) {
						let res = params.findReg[p2][2].test(strParams[p1][2]);
						regRes = regRes === false && res ? true : regRes;

						assert.strictEqual(helpLib.str.testList(strParams[p1][0], params.findReg[p2][0]), res,
							`result with "${strParams[p1][1]}, ${params.findReg[p2][1]}" parameters is incorrect`);

						for(let p3 in params.notFindReg) {
							let param1 = params.notFindReg[p3][1].replace(/^\(array\) \[(.*)\]$/, '$1');
							let param2 = params.findReg[p2][1].replace(/^\(array\) \[(.*)\]$/, '$1');

							assert.strictEqual(helpLib.str.testList(strParams[p1][0], params.notFindReg[p3][0].concat(params.findReg[p2][0])), res,
								`result with "${strParams[p1][1]}, (array) [${param1}, ${param2}]" parameters is incorrect`);
						}
					}

					assert.isTrue(regRes, `not one of the search options are not triggered with "${strParams[p1][1]}" as "str" parameter`);
				}
			});

			it('call with parameters who can convert to string as "str" parameter ' +
				'and with list of regular expressions who not must find something as "list" parameter', () => {
				let strParams = params.strE.concat(params.strT, params.strN, params.strS,
					params.num, params.arr, params.obj, params.func, params.bool);

				for(let p1 in strParams) {
					for(let p2 in params.notFindReg) {
						assert.isFalse(helpLib.str.testList(strParams[p1][0], params.notFindReg[p2][0]),
							`result with "${strParams[p1][1]}, ${params.notFindReg[p2][1]}" parameters is incorrect`);
					}
				}
			});

			it('call with parameters who can convert to string as "str" parameter ' +
				'and with list of strings with regular expressions who must find something as "list" parameter', () => {
				let strParams = params.strE.concat(params.strT, params.strN, params.strS,
					params.num, params.arr, params.obj, params.func, params.bool);

				for(let p1 in strParams) {
					let regRes = false;
					for(let p2 in params.findRegStr) {
						let res = params.findRegStr[p2][2].test(strParams[p1][2]);
						regRes = regRes == false && res ? true : regRes;

						assert.strictEqual(helpLib.str.testList(strParams[p1][0], params.findRegStr[p2][0]), res,
							`result with "${strParams[p1][1]}, ${params.findRegStr[p2][1]}" parameters is incorrect`);

						let badParams = params.notFindRegStr.concat(params.badRegStr);
						for(let p3 in badParams) {
							let param1 = badParams[p3][1].replace(/^\(array\) \[(.*)\]$/, '$1');
							let param2 = params.findReg[p2][1].replace(/^\(array\) \[(.*)\]$/, '$1');

							assert.strictEqual(helpLib.str.testList(strParams[p1][0], badParams[p3][0].concat(params.findReg[p2][0])), res,
								`result with "${strParams[p1][1]}, (array) [${param1}, ${param2}]" parameters is incorrect`);
						}
					}

					assert.isTrue(regRes, `not one of the search options are not triggered with "${strParams[p1][1]}" as "str" parameter`);
				}
			});

			it('call with parameters who can convert to string as "str" parameter ' +
				'and with list of strings with regular expressions who not must find something as "list" parameter', () => {
				let strParams = params.strE.concat(params.strT, params.strN, params.strS,
					params.num, params.arr, params.obj, params.func, params.bool);

				for(let p1 in strParams) {
					for(let p2 in params.notFindRegStr) {
						assert.isFalse(helpLib.str.testList(strParams[p1][0], params.notFindRegStr[p2][0]),
							`result with "${strParams[p1][1]}, ${params.notFindRegStr[p2][1]}" parameters is incorrect`);
					}
				}
			});

			it('call with parameters who can convert to string as "str" parameter ' +
				'and with list of values who can convert to string as "list" parameter', () => {
				let strParams = params.strE.concat(params.strT, params.strN, params.strS,
					params.num, params.arr, params.obj, params.bool);

				for(let p1 in strParams) {
					let regRes = false;
					for(let p2 in strParams) {
						let res = (new RegExp(strParams[p1][2])).test(strParams[p2][2]);
						regRes = regRes == false && res ? true : regRes;

						assert.strictEqual(helpLib.str.testList(strParams[p2][0], [strParams[p1][0]]), res,
							`result with "${strParams[p2][1]}, (array) [${strParams[p1][1]}]" parameters is incorrect`);
					}

					assert.isTrue(regRes, `none of the string did not match the search option "${strParams[p1][1]}" as "regExp" parameter`);
				}
			});

			it('call without parameters or with null or undefined values', () => {
				assert.isFalse(helpLib.str.testList(), 'result without parameter is incorrect');

				assert.isFalse(helpLib.str.testList(undefined), 'result with "undefined" parameter is incorrect');
				assert.isFalse(helpLib.str.testList(undefined, undefined), 'result with "undefined, undefined" parameters is incorrect');

				assert.isFalse(helpLib.str.testList(null), 'result with "null" parameter is incorrect');
				assert.isFalse(helpLib.str.testList(null, null), 'result with "null, null" parameters is incorrect');
			});

			it('call with values who can not convert to string as "str" parameter ' +
				'and with list of some regular expressions as "list" parameter', () => {
				for(let p in params.notset) {
					assert.isFalse(helpLib.str.testList(params.notset[p][0], [/^.*$/]),
						`result with "${params.notset[p][1]}, (array) [/^.*$/]" parameters is incorrect`);
				}
			});

			it('call with parameters who can convert to string as "str" parameter ' +
				'and with list of strings with invalid regular expressions as "list" parameter', () => {
				let strParams = params.strE.concat(params.strT, params.strN, params.strS,
					params.num, params.arr, params.obj, params.func, params.bool);

				for(let p1 in strParams) {
					for(let p2 in params.badRegStr) {
						assert.isFalse(helpLib.str.testList(strParams[p1][0], params.badRegStr[p2][0]),
							`result with "${strParams[p1][1]}, ${params.badRegStr[p2][1]}" parameters is incorrect`);
					}
				}
			});

			it('call with values who can convert to string as "str" parameter ' +
				'and with list of values who can not convert to string as "list" parameter', () => {
				let strParams = params.strE.concat(params.strT, params.strN, params.strS,
					params.num, params.arr, params.obj, params.bool);

				for(let p1 in strParams) {
					for(let p2 in params.notset) {
						assert.isFalse(helpLib.str.testList(strParams[p1][0], [params.notset[p2][0]]),
							`result with "${strParams[p1][1]}, (array) [${params.notset[p2][1]}]" parameters is incorrect`);
					}
				}
			});

			it('call with values who can convert to string as "str" parameter ' +
				'and with values who can not convert to list as "list" parameter', () => {
				let strParams = params.strE.concat(params.strT, params.strN, params.strS,
					params.num, params.arr, params.obj, params.bool);
				let notListParams = params.strE.concat(params.strT, params.strN, params.strS,
					params.num, params.obj, params.bool, params.notset);

				for(let p1 in strParams) {
					for(let p2 in notListParams) {
						assert.isFalse(helpLib.str.testList(strParams[p1][0], notListParams[p2][0]),
							`result with "${strParams[p1][1]}, ${notListParams[p2][1]}" parameters is incorrect`);
					}
				}
			});
		});

		describe('checking "isEmail" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.str.isEmail, 'function "isEmail" is not added or is not a function');
			});

			let params = getParams();

			params.email = [
				['email@example.com', `(string) 'email@example.com'`],
				['Email@example.name', `(string) 'Email@example.name'`],
				['eMail@example.museum', `(string) 'eMail@example.museum'`],
				['emAil@example-one.com', `(string) 'emAil@example-one.com'`],
				['EMAIL@example.co.jp', `(string) 'EMAIL@example.co.jp'`],
				['email@Subdomain.example.com', `(string) 'email@Subdomain.example.com'`],
				['email@subdomain.EXAMPLE.com.ru', `(string) 'email@subdomain.EXAMPLE.com.ru'`],
				['email@subdomain.example.E.RU', `(string) 'email@subdomain.example.E.RU'`],
				['email@example.рф', `(string) 'email@example.рф'`],
				['email@КИРИЛЛИЦА.рф', `(string) 'email@КИРИЛЛИЦА.рф'`],
				['email@кириллица.КОМ.РФ', `(string) 'email@кириллица.КОМ.РФ'`],
				['email@1.example.com', `(string) 'email@1.example.com'`],
				['email@1.кириллица.com', `(string) 'email@1.кириллица.com'`],
				['email@[127.0.0.1]', `(string) 'email@[127.0.0.1]'`],
				['email@[8.8.8.8]', `(string) 'email@[8.8.8.8]'`],
				['email@[123.123.123.123]', `(string) 'email@[123.123.123.123]'`],
				['email@127.0.0.1', `(string) 'email@127.0.0.1'`],
				['email@8.8.8.8', `(string) 'email@8.8.8.8'`],
				['email@123.123.123.123', `(string) 'email@123.123.123.123'`],

				['x@example.com', `(string) 'x@example.com'`],
				['мыло@кириллица.ком.рф', `(string) 'мыло@кириллица.ком.рф'`],
				['firstname.lastname@example.com', `(string) 'firstname.lastname@example.com'`],
				['very.common.mail@example.com', `(string) 'very.common.mail@example.com'`],
				['тест.тест.мыло@кириллица.ком.рф', `(string) 'тест.тест.мыло@кириллица.ком.рф'`],
				['fully-qualified-domain@example.com', `(string) 'fully-qualified-domain@example.com'`],
				['example-indeed@strange-example.com', `(string) 'example-indeed@strange-example.com'`],
				['тест-мыло@кириллица.ком.рф', `(string) 'тест-мыло@кириллица.ком.рф'`],
				['example_indeed@example.com', `(string) 'example_indeed@example.com'`],
				['fully_qualified-domain@example.com', `(string) 'fully_qualified-domain@example.com'`],
				['мыло_тест-мыло@кириллица.ком.рф', `(string) 'мыло_тест-мыло@кириллица.ком.рф'`],
				['other.email-with-hyphen@example.com', `(string) 'other.email-with-hyphen@example.com'`],
				['other.email-with-hyphen.example@example.com', `(string) 'other.email-with-hyphen.example@example.com'`],
				['мыло.тест-мыло.кириллица@кириллица.ком.рф', `(string) 'мыло.тест-мыло.кириллица@кириллица.ком.рф'`],

				['firstname+lastname@example.com', `(string) 'firstname+lastname@example.com'`],
				['user.name+tag+sorting@example.com', `(string) 'user.name+tag+sorting@example.com'`],
				['user-name+tag+sorting@example.com', `(string) 'user-name+tag+sorting@example.com'`],
				['user_name+tag+sorting@example.com', `(string) 'user_name+tag+sorting@example.com'`],
				['user+tag-sorting@example.com', `(string) 'user+tag-sorting@example.com'`],
				['user+tag_sorting@example.com', `(string) 'user+tag_sorting@example.com'`],
				['user+тег-сортировка@example.com', `(string) 'user+тег-сортировка@example.com'`],
				['пользователь+тег_сортировка@кириллица.ком.рф', `(string) 'пользователь+тег_сортировка@кириллица.ком.рф'`],
				['disposable.style.email.with+symbol@example.com', `(string) 'disposable.style.email.with+symbol@example.com'`],

				['_______@example.com', `(string) '_______@example.com'`],
				['1234567890@example.com', `(string) '1234567890@example.com'`],
				['1234567890@кириллица.ком.рф', `(string) '1234567890@кириллица.ком.рф'`],
				['firstname`lastname`@example.com', `(string) 'firstname\`lastname\'@example.com'`],
				['firstname\'lastname\'@example.com', `(string) 'firstname'lastname'@example.com'`],
				['имя\'фамилия\'@кириллица.ком.рф', `(string) 'имя'фамилия'@кириллица.ком.рф'`],
				['mailhost!username@example.org', `(string) 'mailhost!username@example.org'`],
				['user%example.com@example.org', `(string) 'user%example.com@example.org'`],
				['user{example}#hash@example.org', `(string) 'user{example}#hash@example.org'`],
				['!#$%&\'*+-/=?^_`{|}~@example.org', `(string) '!#$%&\'*+-/=?^_\`{|}~@example.org'`]
			];

			params.notEmail = [
				['email@mailserver', `(string) 'email@mailserver'`],
				['email@s.example', `(string) 'email@s.example'`],
				['email@кириллица', `(string) 'example@кириллица'`],
				['email@1example.com', `(string) 'email@1example.com'`],
				['example@example.co1', `(string) 'example@example.co1'`],
				['email@1кириллица.рф', `(string) 'email@1кириллица.рф'`],
				['email@кириллица.р1', `(string) 'email@кириллица.р1'`],
				['email@[2001:0db8:11a3:09d7:1f34:8a2e:07a0:765d]', `(string) 'email@[2001:0db8:11a3:09d7:1f34:8a2e:07a0:765d]'`],
				['email@[::ffff:192.0.2.1]', `(string) 'email@[::ffff:192.0.2.1]'`],
				['email@2001:0db8:11a3:09d7:1f34:8a2e:07a0:765d', `(string) 'email@2001:0db8:11a3:09d7:1f34:8a2e:07a0:765d'`],
				['email@::ffff:192.0.2.1', `(string) 'email@::ffff:192.0.2.1'`],
				['email@its_not_allow.example.com', `(string) 'email@its_not_allow.example.com'`],
				['email@не_правильно.кириллица.рф', `(string) 'email@не_правильно.кириллица.рф'`],

				['@example.com', `(string) '@example.com'`],
				[' email@example.com', `(string) ' email@example.com'`],
				['email@example.com ', `(string) 'email@example.com '`],
				['" "@example.com', `(string) '" "@example.com'`],
				['"email"@example.com', `(string) '"email"@example.com'`],
				['email."test"@example.com', `(string) 'email."test"@example.com'`],
				['"почта"@кириллица.ком.рф', `(string) '"почта"@кириллица.ком.рф'`],
				['почта."тег"@кириллица.ком.рф', `(string) 'почта."тег"@кириллица.ком.рф'`],
				['.user@example.com', `(string) '.user@example.com'`],
				['+user@example.com', `(string) '+user@example.com'`],
				['user+tag.sorting@example.com', `(string) 'user+tag.sorting@example.com'`],
				['.пользователь@кириллица.ком.рф', `(string) '.пользователь@кириллица.ком.рф'`],
				['+пользователь@кириллица.ком.рф', `(string) '+пользователь@кириллица.ком.рф'`],
				['пользователь+тег.сортировка@кириллица.ком.рф', `(string) 'пользователь+тег.сортировка@кириллица.ком.рф'`],

				['Abc.example.com', `(string) 'Abc.example.com'`],
				['почта.кириллица.ком.рф', `(string) 'почта.кириллица.ком.рф'`],
				['A@@example.com', `(string) 'A@@example.com'`],
				['почта@@кириллица.ком.рф', `(string) 'почта@@кириллица.ком.рф'`],
				['A@b@c@example.com', `(string) 'A@b@c@example.com'`],
				['почт@а@кириллица.ком.рф', `(string) 'почт@а@кириллица.ком.рф'`],
				['this not allowed@example.com', `(string) 'this not allowed@example.com'`],
				['почта не корректно@кириллица.ком.рф', `(string) 'почта не корректно@кириллица.ком.рф'`],
				['firstname(lastname)@example.com', `(string) 'firstname(lastname)@example.com'`],
				['email(firstname)lastname@example.com', `(string) 'email(firstname)lastname@example.com'`],
				['имя(фамилия)@кириллица.ком.рф', `(string) 'имя(фамилия)@кириллица.ком.рф'`],
				['почта(имя)фамилия@кириллица.ком.рф', `(string) 'почта(имя)фамилия@кириллица.ком.рф'`],

				['ab(c)d,e:f;g<h>i[j\k]l@example.com', `(string) 'ab(c)d,e:f;g<h>i[j\k]l@example.com'`],
				['1234567890123456789012345678901234567890123456789012345678901234+x@example.com',
					`(string) '1234567890123456789012345678901234567890123456789012345678901234+x@example.com'`]
			];

			it('call with parameters who can convert to string and who is containing email', () => {
				for(let p in params.email) {
					assert.isTrue(helpLib.str.isEmail(params.email[p][0]), `result with "${params.email[p][1]}" parameter is incorrect`);
				}
			});

			it('call with parameters who can convert to string and who not containing email', () => {
				let neParams = params.notEmail.concat(params.strE, params.strT, params.strN, params.strS,
					params.num, params.arr, params.obj, params.func, params.bool);

				for(let p in neParams) {
					assert.isFalse(helpLib.str.isEmail(neParams[p][0]), `result with "${neParams[p][1]}" parameter is incorrect`);
				}
			});

			it('call with parameters who can not convert to string', () => {
				for(let p in params.notset) {
					assert.isFalse(helpLib.str.isEmail(params.notset[p][0]),
						`result with "${params.notset[p][1]}" parameter is incorrect`);
				}
			});
		});

		describe('checking "clear" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.str.clear, 'function "clear" is not added or is not a function');
			});

			let params = getParams();

			params.findReg = [
				[/\s/, `(RegExp) /\\s/`, /\s/g], [/\s\n/, `(RegExp) /\\s\\n/`, /\s\n/g],
				[/[tT]/, `(RegExp) /[tT]/`, /[tT]/g], [/esT$/, `(RegExp) /esT$/`, /esT$/g],
				[/\d/, `(RegExp) /\\d/`, /\d/g], [/^\-?0x/, `(RegExp) /^\\-?0x/`, /^\-?0x/g],
				[/[Nn]a[Nn]/, `(RegExp) /[Nn]a[Nn]/`, /[Nn]a[Nn]/g], [/-?[Ii]\w{7}/, `(RegExp) /-?[Ii]\\w{7}/`, /-?[Ii]\w{7}/g],
				[/^([\("'#])\w+([\)"'])?$/, `(RegExp) /^([\\("'#])\\w+([\\)"'])?$/`, /^([\("'#])\w+([\)"'])?$/g],
				[/\{[^\}]*\}$/, `(RegExp) /\\{[^\\}]*\\}$/`, /\{[^\}]*\}$/g],
				[/(obj)|(ret)|(\)\s+=>)/, `(RegExp) /(obj)|(ret)|(\\)\\s+=>)/`, /(obj)|(ret)|(\)\s+=>)/g],
				[/^((fal)|(tr))\w{2}$/, `(RegExp) /^(fal)|(tr)\w{2}$/`, /^((fal)|(tr))\w{2}$/g]
			];

			params.notFindReg = [
				[/\?/, `(RegExp) /\\?/`], [/^[BbWw]/, `(RegExp) /^[BbWw]/`],
				[/^\s\d/, `(RegExp) /^\\s\\d/`], [/\d[az]$/, `(RegExp) /\\d[az]$/`],
				[/\+[Ii]\w{7}/, `(RegExp) /\\+[Ii]\\w{7}/`],
				[/(oBj)|(reT)|(\)=>)/, `(RegExp) /(oBj)|(reT)|(\\)=>)/`],
				[/^((fal)|(tr))\w{3,}$/, `(RegExp) /^((fal)|(tr))\\w{3,}$/`]
			];

			params.findRegStr = [
				['\\s', `(string) '\\s'`, /\s/g], ['\\s\\n', `(string) '\\s\\n'`, /\s\n/g],
				['[tT]', `(string) '[tT]'`, /[tT]/g], ['esT$', `(string) 'esT$'`, /esT$/g],
				['\\d', `(string) '\\d'`, /\d/g], ['^\\-?0x', `(string) '^\\-?0x'`, /^\-?0x/g],
				['[Nn]a[Nn]', `(string) '[Nn]a[Nn]'`, /[Nn]a[Nn]/g], ['-?[Ii]\\w{7}', `(string) '-?[Ii]\\w{7}'`, /-?[Ii]\w{7}/g],
				['^([\\("\'#])\\w+([\\)"\'])?$', `(string) '^([\\("'#])\\w+([\\)"'])?$'`, /^([\("'#])\w+([\)"'])?$/g],
				['\\{[^\\}]*\\}$', `(string) '\\{[^\\}]*\\}$'`, /\{[^\}]*\}$/g],
				['(obj)|(ret)|(\\)\\s+=>)', `(string) '(obj)|(ret)|(\\)\\s+=>)'`, /(obj)|(ret)|(\)\s+=>)/g],
				['^((fal)|(tr))\\w{2}$', `(string) '^((fal)|(tr))\\w{2}$'`, /^((fal)|(tr))\w{2}$/g]
			];

			params.notFindRegStr = [
				['\\?', `(RegExp) '\\?'`], ['^[BbWw]', `(RegExp) '^[BbWw]'`],
				['^\\s\\d', `(RegExp) '^\\s\\d'`], ['\\d[az]$', `(RegExp) '\\d[az]$'`],
				['\\+[Ii]\\w{7}', `(RegExp) '\\+[Ii]\\w{7}'`],
				['(oBj)|(reT)|(\\)=>)', `(RegExp) '(oBj)|(reT)|(\\)=>)'`],
				['^((fal)|(tr))\\w{3,}$', `(RegExp) '^((fal)|(tr))\\w{3,}$'`]
			];

			params.badRegStr = [
				['^[tT', `(string) '^[tT'`], ['[tT]{', `(string) '[tT]{'`],
				['esT)', `(string) 'esT)'`], ['(?tT)', `(string) '(?tT)'`]
			];

			it('call with parameters who can convert to string as "str" parameter ' +
				'and regular expression who must find something as "regExp" parameter', () => {
				let strParams = params.strE.concat(params.strT, params.strN, params.strS,
					params.num, params.arr, params.obj, params.func, params.bool);

				for(let p1 in strParams) {
					let regRes = false;
					for(let p2 in params.findReg) {
						let res = strParams[p1][2].replace(params.findReg[p2][2], '');
						regRes = regRes === false && (strParams[p1][2].length == 0 || res !== strParams[p1][2]) ? true : regRes;

						assert.strictEqual(helpLib.str.clear(strParams[p1][0], params.findReg[p2][0]), res,
							`result with "${strParams[p1][1]}, ${params.findReg[p2][1]}" parameters is incorrect`);
					}

					assert.isTrue(regRes, `not one of the search options are not triggered with "${strParams[p1][1]}" as "str" parameter`);
				}
			});

			it('call with parameters who can convert to string as "str" parameter ' +
				'and regular expression who not must find something as "regExp" parameter', () => {
				let strParams = params.strE.concat(params.strT, params.strN, params.strS,
					params.num, params.arr, params.obj, params.func, params.bool);

				for(let p1 in strParams) {
					for(let p2 in params.notFindReg) {
						assert.strictEqual(helpLib.str.clear(strParams[p1][0], params.notFindReg[p2][0]), strParams[p1][2],
							`result with "${strParams[p1][1]}, ${params.notFindReg[p2][1]}" parameters is incorrect`);
					}
				}
			});

			it('call with parameters who can convert to string as "str" parameter ' +
				'and string with regular expression who must find something as "regExp" parameter', () => {
				let strParams = params.strE.concat(params.strT, params.strN, params.strS,
					params.num, params.arr, params.obj, params.func, params.bool);

				for(let p1 in strParams) {
					let regRes = false;
					for(let p2 in params.findRegStr) {
						let res = strParams[p1][2].replace(params.findRegStr[p2][2], '');
						regRes = regRes === false && (strParams[p1][2].length == 0 || res !== strParams[p1][2]) ? true : regRes;

						assert.strictEqual(helpLib.str.clear(strParams[p1][0], params.findRegStr[p2][0]), res,
							`result with "${strParams[p1][1]}, ${params.findRegStr[p2][1]}" parameters is incorrect`);
					}

					assert.isTrue(regRes, `not one of the search options are not triggered with "${strParams[p1][1]}" as "str" parameter`);
				}
			});

			it('call with parameters who can convert to string as "str" parameter ' +
				'and string with regular expression who not must find something as "regExp" parameter', () => {
				let strParams = params.strE.concat(params.strT, params.strN, params.strS,
					params.num, params.arr, params.obj, params.func, params.bool);

				for(let p1 in strParams) {
					for(let p2 in params.notFindRegStr) {
						assert.strictEqual(helpLib.str.clear(strParams[p1][0], params.notFindRegStr[p2][0]), strParams[p1][2],
							`result with "${strParams[p1][1]}, ${params.notFindRegStr[p2][1]}" parameters is incorrect`);
					}
				}
			});

			it('call with parameters who can convert to string as "str" and "regExp" parameters', () => {
				let strParams = params.strE.concat(params.strT, params.strN, params.strS,
					params.num, params.arr, params.obj, params.bool);

				for(let p1 in strParams) {
					let regRes = false;
					for(let p2 in strParams) {
						let res = strParams[p2][2].replace(new RegExp(strParams[p1][2], 'g'), '');
						regRes = regRes === false && (strParams[p2][2].length == 0 || res !== strParams[p2][2]) ? true : regRes;

						assert.strictEqual(helpLib.str.clear(strParams[p2][0], strParams[p1][0]), res,
							`result with "${strParams[p2][1]}, ${strParams[p1][1]}" parameters is incorrect`);
					}

					assert.isTrue(regRes, `none of the string did not match the search option "${strParams[p1][1]}" as "regExp" parameter`);
				}
			});

			it('call without parameters or with null or undefined values', () => {
				assert.strictEqual(helpLib.str.clear(), '', 'result without parameter is incorrect');

				assert.strictEqual(helpLib.str.clear(undefined), '', 'result with "undefined" parameter is incorrect');
				assert.strictEqual(helpLib.str.clear(undefined, undefined), '', 'result with "undefined, undefined" parameters is incorrect');

				assert.strictEqual(helpLib.str.clear(null), '', 'result with "null" parameter is incorrect');
				assert.strictEqual(helpLib.str.clear(null, null), '', 'result with "null, null" parameters is incorrect');
			});

			it('call with values who can not convert to string as "str" parameter and some "regExp" parameter', () => {
				for(let p in params.notset) {
					assert.strictEqual(helpLib.str.clear(params.notset[p][0], /^.*$/), '',
						`result with "${params.notset[p][1]}, (RegExp) /^.*$/" parameters is incorrect`);
				}
			});

			it('call with parameters who can convert to string as "str" parameter ' +
				'and string with invalid regular expression as "regExp" parameter', () => {
				let strParams = params.strE.concat(params.strT, params.strN, params.strS,
					params.num, params.arr, params.obj, params.func, params.bool);

				for(let p1 in strParams) {
					for(let p2 in params.badRegStr) {
						assert.strictEqual(helpLib.str.clear(strParams[p1][0], params.badRegStr[p2][0]), strParams[p1][2],
							`result with "${strParams[p1][1]}, ${params.badRegStr[p2][1]}" parameters is incorrect`);
					}
				}
			});

			it('call with values who can not convert to string as "str" parameter ' +
				'and with values who can not convert to string as "regExp" parameter', () => {
				let strParams = params.strE.concat(params.strT, params.strN, params.strS,
					params.num, params.arr, params.obj, params.bool);

				for(let p1 in strParams) {
					for(let p2 in params.notset) {
						assert.strictEqual(helpLib.str.clear(strParams[p1][0], params.notset[p2][0]), strParams[p1][2],
							`result with "${strParams[p1][1]}, ${params.notset[p2][1]}" parameters is incorrect`);
					}
				}
			});
		});

		describe('checking "clearList" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.str.clearList, 'function "clearList" is not added or is not a function');
			});

			let params = getParams();

			params.findReg = [
				[[/\s/, /\s\n/], `(array) [/\\s/, /\\s\\n/]`, /(\s)|(\s\n)/g],
				[[/[tT]/, /^\-?0x/, /\d/], `(array) [/[tT]/, /^\\-?0x/, /\\d/]`, /([tT])|(^\-?0x)|(\d)/g],
				[[/[Nn]a[Nn]/, /-?[Ii]\w{7}/], `(array) [/[Nn]a[Nn]/, /-?[Ii]\\w{7}/]`, /([Nn]a[Nn])|(-?[Ii]\w{7})/g],
				[[/^([\("'#])\w+([\)"'])?$/], `(array) [/^([\\("'#])\\w+([\\)"'])?$/]`, /^([\("'#])\w+([\)"'])?$/g],
				[[/\{[^\}]*\}$/], `(array) [/\\{[^\\}]*\\}$/]`, /\{[^\}]*\}$/g],
				[[/obj/, /ret/, /\)\s+=>/], `(array) [/obj/, /ret/, /\\)\\s+=>/]`, /(obj)|(ret)|(\)\s+=>)/g],
				[[/^(fal)\w{2}$/, /^(tr)\w{2}$/], `(array) [/^(fal)\\w{2}$/, /^(tr)\\w{2}$/]`, /(^(fal)\w{2}$)|(^(tr)\w{2}$)/g]
			];

			params.notFindReg = [
				[[/\?/, /^[BbWw]/], `(array) [/\\?/, /^[BbWw]/]`],
				[[/^\s\d/, /\d[az]$/], `(array) [/^\\s\\d/, /\\d[az]$/]`],
				[[/\+[Ii]\w{7}/, /oBj/, /reT/, /\)=>/], `(array) [/\\+[Ii]\\w{7}/, /oBj/, /reT/, /\\)=>/]`],
				[[/^(fal)\w{3,}$/, /^(tr)\w{3,}$/], `(array) [/^(fal)\\w{3,}$/, /^(tr)\\w{3,}$/]`]
			];

			params.findRegStr = [
				[['\\s', '\\s\\n'], `(array) ['\\s', '\\s\\n']`, /(\s)|(\s\n)/g],
				[['[tT]', '^\\-?0x', '\\d'], `(array) ['[tT]', '^\\-?0x', '\\d']`, /([tT])|(^\-?0x)|(\d)/g],
				[['[Nn]a[Nn]', '-?[Ii]\\w{7}'], `(array) ['[Nn]a[Nn]', '-?[Ii]\\w{7}']`, /([Nn]a[Nn])|(-?[Ii]\w{7})/g],
				[['^([\\("\'#])\\w+([\\)"\'])?$'], `(array) ['^([\\("\\'#])\\w+([\\)"\\'])?$']`, /^([\("'#])\w+([\)"'])?$/g],
				[['\\{[^\\}]*\\}$'], `(array) ['\\{[^\\}]*\\}$']`, /\{[^\}]*\}$/g],
				[['obj', 'ret', '\\)\\s+=>'], `(array) ['obj', 'ret', '\\)\\s+=>']`, /(obj)|(ret)|(\)\s+=>)/g],
				[['^(fal)\\w{2}$', '^(tr)\\w{2}$'], `(array) ['^(fal)\\w{2}$', '^(tr)\\w{2}$']`, /(^(fal)\w{2}$)|(^(tr)\w{2}$)/g]
			];

			params.notFindRegStr = [
				[['\\?', '^[BbWw]'], `(array) ['\\?', '^[BbWw]']`],
				[['^\\s\\d', '\\d[az]$'], `(array) ['^\\s\\d', '\\d[az]$']`],
				[['\\+[Ii]\\w{7}', 'oBj', 'reT', '\\)=>'], `(array) ['\\+[Ii]\\w{7}', 'oBj', 'reT', '\\)=>']`],
				[['^(fal)\\w{3,}$', '^(tr)\\w{3,}$'] ,`(array) ['^(fal)\\w{3,}$', '^(tr)\\w{3,}$']`]
			];

			params.badRegStr = [
				[['^('], `(array) ['^(']`],
				[['^[tT', '[tT]{'], `(array) ['^[tT', '[tT]{']`],
				[['esT)', '(?tT)'], `(array) ['esT)', '(?tT)']`]
			];

			it('call with parameters who can convert to string as "str" parameter ' +
				'and list of regular expressions who must find something as "list" parameter', () => {
				let strParams = params.strE.concat(params.strT, params.strN, params.strS,
					params.num, params.arr, params.obj, params.func, params.bool);

				for(let p1 in strParams) {
					let regRes = false;
					for(let p2 in params.findReg) {
						let res = strParams[p1][2].replace(params.findReg[p2][2], '');
						regRes = regRes === false && (strParams[p1][2].length == 0 || res !== strParams[p1][2]) ? true : regRes;

						assert.strictEqual(helpLib.str.clearList(strParams[p1][0], params.findReg[p2][0]), res,
							`result with "${strParams[p1][1]}, ${params.findReg[p2][1]}" parameters is incorrect`);

						for(let p3 in params.notFindReg) {
							let param1 = params.notFindReg[p3][1].replace(/^\(array\) \[(.*)\]$/, '$1');
							let param2 = params.findReg[p2][1].replace(/^\(array\) \[(.*)\]$/, '$1');

							assert.strictEqual(helpLib.str.clearList(strParams[p1][0], params.notFindReg[p3][0].concat(params.findReg[p2][0])), res,
								`result with "${strParams[p1][1]}, (array) [${param1}, ${param2}]" parameters is incorrect`);
						}
					}

					assert.isTrue(regRes, `not one of the search options are not triggered with "${strParams[p1][1]}" as "str" parameter`);
				}
			});

			it('call with parameters who can convert to string as "str" parameter ' +
				'and list of regular expressions who not must find something as "list" parameter', () => {
				let strParams = params.strE.concat(params.strT, params.strN, params.strS,
					params.num, params.arr, params.obj, params.func, params.bool);

				for(let p1 in strParams) {
					for(let p2 in params.notFindReg) {
						assert.strictEqual(helpLib.str.clearList(strParams[p1][0], params.notFindReg[p2][0]), strParams[p1][2],
							`result with "${strParams[p1][1]}, ${params.notFindReg[p2][1]}" parameters is incorrect`);
					}
				}
			});

			it('call with parameters who can convert to string as "str" parameter ' +
				'and list of strings with regular expressions who must find something as "list" parameter', () => {
				let strParams = params.strE.concat(params.strT, params.strN, params.strS,
					params.num, params.arr, params.obj, params.func, params.bool);

				for(let p1 in strParams) {
					let regRes = false;
					for(let p2 in params.findRegStr) {
						let res = strParams[p1][2].replace(params.findRegStr[p2][2], '');
						regRes = regRes === false && (strParams[p1][2].length == 0 || res !== strParams[p1][2]) ? true : regRes;

						assert.strictEqual(helpLib.str.clearList(strParams[p1][0], params.findRegStr[p2][0]), res,
							`result with "${strParams[p1][1]}, ${params.findRegStr[p2][1]}" parameters is incorrect`);

						let badParams = params.notFindRegStr.concat(params.badRegStr);
						for(let p3 in badParams) {
							let param1 = badParams[p3][1].replace(/^\(array\) \[(.*)\]$/, '$1');
							let param2 = params.findReg[p2][1].replace(/^\(array\) \[(.*)\]$/, '$1');

							assert.strictEqual(helpLib.str.clearList(strParams[p1][0], badParams[p3][0].concat(params.findReg[p2][0])), res,
								`result with "${strParams[p1][1]}, (array) [${param1}, ${param2}]" parameters is incorrect`);
						}
					}

					assert.isTrue(regRes, `not one of the search options are not triggered with "${strParams[p1][1]}" as "str" parameter`);
				}
			});

			it('call with parameters who can convert to string as "str" parameter ' +
				'and list of strings with regular expressions who not must find something as "list" parameter', () => {
				let strParams = params.strE.concat(params.strT, params.strN, params.strS,
					params.num, params.arr, params.obj, params.func, params.bool);

				for(let p1 in strParams) {
					for(let p2 in params.notFindRegStr) {
						assert.strictEqual(helpLib.str.clearList(strParams[p1][0], params.notFindRegStr[p2][0]), strParams[p1][2],
							`result with "${strParams[p1][1]}, ${params.notFindRegStr[p2][1]}" parameters is incorrect`);
					}
				}
			});

			it('call with parameters who can convert to string as "str" parameter ' +
				'and with list of values who can convert to string as "list" parameter', () => {
				let strParams = params.strE.concat(params.strT, params.strN, params.strS,
					params.num, params.arr, params.obj, params.bool);

				for(let p1 in strParams) {
					let regRes = false;
					for(let p2 in strParams) {
						let res = strParams[p2][2].replace(new RegExp(strParams[p1][2], 'g'), '');
						regRes = regRes === false && (strParams[p2][2].length == 0 || res !== strParams[p2][2]) ? true : regRes;

						assert.strictEqual(helpLib.str.clearList(strParams[p2][0], [strParams[p1][0]]), res,
							`result with "${strParams[p2][1]}, (array) [${strParams[p1][1]}]" parameters is incorrect`);
					}

					assert.isTrue(regRes, `none of the string did not match the search option "${strParams[p1][1]}" as "regExp" parameter`);
				}
			});

			it('call without parameters or with null or undefined values', () => {
				assert.strictEqual(helpLib.str.clearList(), '', 'result without parameter is incorrect');

				assert.strictEqual(helpLib.str.clearList(undefined), '', 'result with "undefined" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearList(undefined, undefined), '', 'result with "undefined, undefined" parameters is incorrect');

				assert.strictEqual(helpLib.str.clearList(null), '', 'result with "null" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearList(null, null), '', 'result with "null, null" parameters is incorrect');
			});

			it('call with values who can not convert to string as "str" parameter ' +
				'and with list of some regular expressions as "list" parameter', () => {
				for(let p in params.notset) {
					assert.strictEqual(helpLib.str.clearList(params.notset[p][0], [/^.*$/]), '',
						`result with "${params.notset[p][1]}, (array) [/^.*$/]" parameters is incorrect`);
				}
			});

			it('call with parameters who can convert to string as "str" parameter ' +
				'and with list of strings with invalid regular expressions as "list" parameter', () => {
				let strParams = params.strE.concat(params.strT, params.strN, params.strS,
					params.num, params.arr, params.obj, params.func, params.bool);

				for(let p1 in strParams) {
					for(let p2 in params.badRegStr) {
						assert.strictEqual(helpLib.str.clearList(strParams[p1][0], params.badRegStr[p2][0]), strParams[p1][2],
							`result with "${strParams[p1][1]}, ${params.badRegStr[p2][1]}" parameters is incorrect`);
					}
				}
			});

			it('call with values who can not convert to string as "str" parameter ' +
				'and with list of values who can not convert to string as "list" parameter', () => {
				let strParams = params.strE.concat(params.strT, params.strN, params.strS,
					params.num, params.arr, params.obj, params.bool);

				for(let p1 in strParams) {
					for(let p2 in params.notset) {
						assert.strictEqual(helpLib.str.clearList(strParams[p1][0], params.notset[p2][0]), strParams[p1][2],
							`result with "${strParams[p1][1]}, ${params.notset[p2][1]}" parameters is incorrect`);
					}
				}
			});

			it('call with values who can not convert to string as "str" parameter ' +
				'and with values who can not convert to list as "list" parameter', () => {
				let strParams = params.strE.concat(params.strT, params.strN, params.strS,
					params.num, params.arr, params.obj, params.bool);
				let notListParams = params.strE.concat(params.strT, params.strN, params.strS,
					params.num, params.obj, params.bool, params.notset);

				for(let p1 in strParams) {
					for(let p2 in notListParams) {
						assert.strictEqual(helpLib.str.clearList(strParams[p1][0], notListParams[p2][0]), strParams[p1][2],
							`result with "${strParams[p1][1]}, ${notListParams[p2][1]}" parameters is incorrect`);
					}
				}
			});
		});
	});
};