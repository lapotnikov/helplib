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
						`result with "${strParams[p][1]}" parameter is incorrect`);
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
						`result with "${params.notset[p][1]}" parameter is incorrect`);
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
			],

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
			],

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
			],

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
			],


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
	});
};