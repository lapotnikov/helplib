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

				[['  test  '], `(array) ['  test  ']`, `  test  `],
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
							[vp1[0] + vp2[0] + vp1[0] + vp2[0] + vp1[0], `(string) '${dp1}${dp2}${dp1}${dp2}${dp1}'`,vp2[0] + vp1[0] + vp2[0]]
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

			it('call with parameters who can convert to string', () => {
				assert.strictEqual(helpLib.str.clearDoubleSpace(true), 'true', 'result with "(bool) true" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearDoubleSpace(false), 'false', 'result with "(bool) false" parameter is incorrect');

				assert.strictEqual(helpLib.str.clearDoubleSpace(0), '0', 'result with "(number) 0" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearDoubleSpace(1), '1', 'result with "(number) 1" parameter is incorrect');

				assert.strictEqual(helpLib.str.clearDoubleSpace(''), '',
					'result with "(string) \'\'" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearDoubleSpace(' '), ' ',
					'result with "(string) \'  \'" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearDoubleSpace('  '), ' ',
					'result with "(string) \'   \'" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearDoubleSpace('   '), ' ',
					'result with "(string) \'    \'" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearDoubleSpace('test'), 'test',
					'result with "(string) \'test\'" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearDoubleSpace(' test '), ' test ',
					'result with "(string) \' test \'" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearDoubleSpace('   test    test   '), ' test test ',
					'result with "(string) \'   test    test   \'" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearDoubleSpace("\t"), ' ',
					'result with "(string) "\\t"" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearDoubleSpace("\t\t"), ' ',
					'result with "(string) "\\t\\t"" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearDoubleSpace(" \t \t \t "), ' ',
					'result with "(string) " \\t \\t \\t "" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearDoubleSpace("\t \n \t \t   \t\r\n\t\t "), " \n \r\n ",
					'result with "(string) "\\t \\n \\t \\t   \\t\\r\\n\\t\\t "" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearDoubleSpace("\ttest\t \t\t"), ' test ',
					'result with "(string) "\\ttest\\t \\t\\t"" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearDoubleSpace("test\t \n  \t\t"), "test \n ",
					'result with "(string) "test\\t \\n  \\t\\t"" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearDoubleSpace(" test\r\n \r\n\t\n"), " test\r\n \r\n \n",
					'result with "(string) " test\\r\\n \\r\\n\\t\\n"" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearDoubleSpace("\u00A0"), " ",
					'result with "(string) "\\u00A0"" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearDoubleSpace("\u00A0\u00A0"), " ",
					'result with "(string) "\\u00A0\\u00A0"" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearDoubleSpace("\u00A0 \u00A0\t\u00A0 "), " ",
					'result with "(string) "\\u00A0 \\u00A0\\t\\u00A0 "" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearDoubleSpace("\u00A0test\u00A0"), " test ",
					'result with "(string) "\\u00A0test\\u00A0"" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearDoubleSpace("\u00A0 \ttest\u00A0 \t\u00A0 test"), " test test",
					'result with "(string) "\\u00A0 \\ttest\\u00A0 \\t\\u00A0 test"" parameter is incorrect');

				assert.strictEqual(helpLib.str.clearDoubleSpace([]), '',
					'result with "(array) []" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearDoubleSpace(['test']), 'test',
					'result with "(array) [\'test\']" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearDoubleSpace(['   test   ']), ' test ',
					'result with "(array) [\'   test   \']" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearDoubleSpace([' test   ', '     test ']), ' test , test ',
					'result with "(array) [\' test   \', \'        test \']" parameter is incorrect');

				assert.strictEqual(helpLib.str.clearDoubleSpace({}), '[object Object]',
					'result with "(object) {}" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearDoubleSpace({test: 'test'}), '[object Object]',
					'result with "(object) {test: \'test\'}" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearDoubleSpace({toString: () => 'test'}), 'test',
					'result with "(object) {toString: () => \'test\'}" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearDoubleSpace({toString: () => '   test   '}), ' test ',
					'result with "(object) {toString: () => \'   test   \'}" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearDoubleSpace({toString: () => ' test   test '}), ' test test ',
					'result with "(object) {toString: () => \' test   test \'}" parameter is incorrect');

				assert.strictEqual(helpLib.str.clearDoubleSpace(() => {}), '() => {}', 'result with "function" parameter is incorrect');

				assert.strictEqual(helpLib.str.clearDoubleSpace(NaN), 'NaN', 'result with "NaN" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearDoubleSpace(Infinity), 'Infinity', 'result with "Infinity" parameter is incorrect');
			});

			it('call with parameters who can not convert to string', () => {
				assert.strictEqual(helpLib.str.clearDoubleSpace(undefined), '', 'result with "undefined" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearDoubleSpace(null), '', 'result with "null" parameter is incorrect');
			});
		});

		describe('checking "ucFirst" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.str.ucFirst, 'function "ucFirst" is not added or is not a function');
			});

			it('call with parameters who can convert to string', () => {
				assert.strictEqual(helpLib.str.ucFirst(true), 'True', 'result with "(bool) true" parameter is incorrect');
				assert.strictEqual(helpLib.str.ucFirst(false), 'False', 'result with "(bool) false" parameter is incorrect');

				assert.strictEqual(helpLib.str.ucFirst(0), '0', 'result with "(number) 0" parameter is incorrect');
				assert.strictEqual(helpLib.str.ucFirst(1), '1', 'result with "(number) 1" parameter is incorrect');

				assert.strictEqual(helpLib.str.ucFirst(''), '', 'result with "(string) \'\'" parameter is incorrect');
				assert.strictEqual(helpLib.str.ucFirst(' '), ' ', 'result with "(string) \'  \'" parameter is incorrect');
				assert.strictEqual(helpLib.str.ucFirst('test'), 'Test', 'result with "(string) \'test\'" parameter is incorrect');
				assert.strictEqual(helpLib.str.ucFirst('Test'), 'Test', 'result with "(string) \'Test\'" parameter is incorrect');
				assert.strictEqual(helpLib.str.ucFirst('TEST'), 'TEST', 'result with "(string) \'TEST\'" parameter is incorrect');
				assert.strictEqual(helpLib.str.ucFirst(' test '), ' test ', 'result with "(string) \' test \'" parameter is incorrect');
				assert.strictEqual(helpLib.str.ucFirst('test test'), 'Test test', 'result with "(string) \'test test\'" parameter is incorrect');
				assert.strictEqual(helpLib.str.ucFirst('100test'), '100test', 'result with "(string) \'100test\'" parameter is incorrect');
				assert.strictEqual(helpLib.str.ucFirst('(test)'), '(test)', 'result with "(string) \'(test)\'" parameter is incorrect');
				assert.strictEqual(helpLib.str.ucFirst('#test'), '#test', 'result with "(string) \'#test\'" parameter is incorrect');
				assert.strictEqual(helpLib.str.ucFirst("\ttest"), "\ttest", 'result with "(string) "\\ttest"" parameter is incorrect');
				assert.strictEqual(helpLib.str.ucFirst("test\t"), "Test\t", 'result with "(string) "test\\t"" parameter is incorrect');
				assert.strictEqual(helpLib.str.ucFirst("\ntest"), "\ntest", 'result with "(string) "\\ntest"" parameter is incorrect');
				assert.strictEqual(helpLib.str.ucFirst("test\n"), "Test\n", 'result with "(string) "test\\n"" parameter is incorrect');

				assert.strictEqual(helpLib.str.ucFirst([]), '',
					'result with "(array) []" parameter is incorrect');
				assert.strictEqual(helpLib.str.ucFirst(['test']), 'Test',
					'result with "(array) [\'test\']" parameter is incorrect');
				assert.strictEqual(helpLib.str.ucFirst(['test', 'test']), 'Test,test',
					'result with "(array) [\'test\', \'test\']" parameter is incorrect');

				assert.strictEqual(helpLib.str.ucFirst({}), '[object Object]',
					'result with "(object) {}" parameter is incorrect');
				assert.strictEqual(helpLib.str.ucFirst({test: 'test'}), '[object Object]',
					'result with "(object) {test: \'test\'}" parameter is incorrect');
				assert.strictEqual(helpLib.str.ucFirst({toString: () => 'test'}), 'Test',
					'result with "(object) {toString: () => \'test\'}" parameter is incorrect');
				assert.strictEqual(helpLib.str.ucFirst({toString: () => 'test test'}), 'Test test',
					'result with "(object) {toString: () => \'test test\'}" parameter is incorrect');

				assert.strictEqual(helpLib.str.ucFirst(() => {}), '() => {}', 'result with "function" parameter is incorrect');

				assert.strictEqual(helpLib.str.ucFirst(NaN), 'NaN', 'result with "NaN" parameter is incorrect');
				assert.strictEqual(helpLib.str.ucFirst(Infinity), 'Infinity', 'result with "Infinity" parameter is incorrect');
			});

			it('call with parameters who can not convert to string', () => {
				assert.strictEqual(helpLib.str.ucFirst(undefined), '', 'result with "undefined" parameter is incorrect');
				assert.strictEqual(helpLib.str.ucFirst(null), '', 'result with "null" parameter is incorrect');
			});
		});

		describe('checking "lcFirst" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.str.lcFirst, 'function "lcFirst" is not added or is not a function');
			});

			it('call with parameters who can convert to string', () => {
				assert.strictEqual(helpLib.str.lcFirst(true), 'true', 'result with "(bool) true" parameter is incorrect');
				assert.strictEqual(helpLib.str.lcFirst(false), 'false', 'result with "(bool) false" parameter is incorrect');

				assert.strictEqual(helpLib.str.lcFirst(0), '0', 'result with "(number) 0" parameter is incorrect');
				assert.strictEqual(helpLib.str.lcFirst(1), '1', 'result with "(number) 1" parameter is incorrect');

				assert.strictEqual(helpLib.str.lcFirst(''), '', 'result with "(string) \'\'" parameter is incorrect');
				assert.strictEqual(helpLib.str.lcFirst(' '), ' ', 'result with "(string) \'  \'" parameter is incorrect');
				assert.strictEqual(helpLib.str.lcFirst('test'), 'test', 'result with "(string) \'test\'" parameter is incorrect');
				assert.strictEqual(helpLib.str.lcFirst('Test'), 'test', 'result with "(string) \'Test\'" parameter is incorrect');
				assert.strictEqual(helpLib.str.lcFirst('TEST'), 'tEST', 'result with "(string) \'TEST\'" parameter is incorrect');
				assert.strictEqual(helpLib.str.lcFirst(' Test '), ' Test ', 'result with "(string) \' Test \'" parameter is incorrect');
				assert.strictEqual(helpLib.str.lcFirst('Test Test'), 'test Test', 'result with "(string) \'Test Test\'" parameter is incorrect');
				assert.strictEqual(helpLib.str.lcFirst('100Test'), '100Test', 'result with "(string) \'100Test\'" parameter is incorrect');
				assert.strictEqual(helpLib.str.lcFirst('(Test)'), '(Test)', 'result with "(string) \'(Test)\'" parameter is incorrect');
				assert.strictEqual(helpLib.str.lcFirst('#Test'), '#Test', 'result with "(string) \'#Test\'" parameter is incorrect');
				assert.strictEqual(helpLib.str.lcFirst("\tTest"), "\tTest", 'result with "(string) "\\tTest"" parameter is incorrect');
				assert.strictEqual(helpLib.str.lcFirst("Test\t"), "test\t", 'result with "(string) "Test\\t"" parameter is incorrect');
				assert.strictEqual(helpLib.str.lcFirst("\nTest"), "\nTest", 'result with "(string) "\\nTest"" parameter is incorrect');
				assert.strictEqual(helpLib.str.lcFirst("Test\n"), "test\n", 'result with "(string) "Test\\n"" parameter is incorrect');

				assert.strictEqual(helpLib.str.lcFirst([]), '',
					'result with "(array) []" parameter is incorrect');
				assert.strictEqual(helpLib.str.lcFirst(['Test']), 'test',
					'result with "(array) [\'Test\']" parameter is incorrect');
				assert.strictEqual(helpLib.str.lcFirst(['Test', 'Test']), 'test,Test',
					'result with "(array) [\'Test\', \'Test\']" parameter is incorrect');

				assert.strictEqual(helpLib.str.lcFirst({}), '[object Object]',
					'result with "(object) {}" parameter is incorrect');
				assert.strictEqual(helpLib.str.lcFirst({test: 'test'}), '[object Object]',
					'result with "(object) {test: \'test\'}" parameter is incorrect');
				assert.strictEqual(helpLib.str.lcFirst({toString: () => 'Test'}), 'test',
					'result with "(object) {toString: () => \'Test\'}" parameter is incorrect');
				assert.strictEqual(helpLib.str.lcFirst({toString: () => 'Test Test'}), 'test Test',
					'result with "(object) {toString: () => \'Test Test\'}" parameter is incorrect');

				assert.strictEqual(helpLib.str.lcFirst(() => {}), '() => {}', 'result with "function" parameter is incorrect');

				assert.strictEqual(helpLib.str.lcFirst(NaN), 'naN', 'result with "NaN" parameter is incorrect');
				assert.strictEqual(helpLib.str.lcFirst(Infinity), 'infinity', 'result with "Infinity" parameter is incorrect');
			});

			it('call with parameters who can not convert to string', () => {
				assert.strictEqual(helpLib.str.lcFirst(undefined), '', 'result with "undefined" parameter is incorrect');
				assert.strictEqual(helpLib.str.lcFirst(null), '', 'result with "null" parameter is incorrect');
			});
		});

		describe('checking "reverse" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.str.reverse, 'function "reverse" is not added or is not a function');
			});

			it('call with parameters who can convert to string', () => {
				assert.strictEqual(helpLib.str.reverse(true), 'eurt', 'result with "(bool) true" parameter is incorrect');
				assert.strictEqual(helpLib.str.reverse(false), 'eslaf', 'result with "(bool) false" parameter is incorrect');

				assert.strictEqual(helpLib.str.reverse(0), '0', 'result with "(number) 0" parameter is incorrect');
				assert.strictEqual(helpLib.str.reverse(1), '1', 'result with "(number) 1" parameter is incorrect');
				assert.strictEqual(helpLib.str.reverse(9870), '0789', 'result with "(number) 9870" parameter is incorrect');

				assert.strictEqual(helpLib.str.reverse(''), '', 'result with "(string) \'\'" parameter is incorrect');
				assert.strictEqual(helpLib.str.reverse(' '), ' ', 'result with "(string) \'  \'" parameter is incorrect');
				assert.strictEqual(helpLib.str.reverse('test'), 'tset', 'result with "(string) \'test\'" parameter is incorrect');
				assert.strictEqual(helpLib.str.reverse('Test'), 'tseT', 'result with "(string) \'Test\'" parameter is incorrect');
				assert.strictEqual(helpLib.str.reverse(' Test'), 'tseT ', 'result with "(string) \' Test\'" parameter is incorrect');
				assert.strictEqual(helpLib.str.reverse('test Test '), ' tseT tset', 'result with "(string) \'test Test \'" parameter is incorrect');
				assert.strictEqual(helpLib.str.reverse("\ttest"), "tset\t", 'result with "(string) "\\ttest"" parameter is incorrect');
				assert.strictEqual(helpLib.str.reverse("Test\t"), "\ttseT", 'result with "(string) "Test\\t"" parameter is incorrect');
				assert.strictEqual(helpLib.str.reverse("\ntest"), "tset\n", 'result with "(string) "\\ntest"" parameter is incorrect');
				assert.strictEqual(helpLib.str.reverse("Test\n"), "\ntseT", 'result with "(string) "Test\\n"" parameter is incorrect');

				assert.strictEqual(helpLib.str.reverse([]), '',
					'result with "(array) []" parameter is incorrect');
				assert.strictEqual(helpLib.str.reverse(['test']), 'tset',
					'result with "(array) [\'test\']" parameter is incorrect');
				assert.strictEqual(helpLib.str.reverse(['Test', 'test']), 'tset,tseT',
					'result with "(array) [\'Test\', \'test\']" parameter is incorrect');

				assert.strictEqual(helpLib.str.reverse({}), ']tcejbO tcejbo[',
					'result with "(object) {}" parameter is incorrect');
				assert.strictEqual(helpLib.str.reverse({test: 'test'}), ']tcejbO tcejbo[',
					'result with "(object) {test: \'test\'}" parameter is incorrect');
				assert.strictEqual(helpLib.str.reverse({toString: () => 'test'}), 'tset',
					'result with "(object) {toString: () => \'test\'}" parameter is incorrect');

				assert.strictEqual(helpLib.str.reverse(() => {}), '}{ >= )(', 'result with "function" parameter is incorrect');

				assert.strictEqual(helpLib.str.reverse(NaN), 'NaN', 'result with "NaN" parameter is incorrect');
				assert.strictEqual(helpLib.str.reverse(Infinity), 'ytinifnI', 'result with "Infinity" parameter is incorrect');
			});

			it('call with parameters who can not convert to string', () => {
				assert.strictEqual(helpLib.str.reverse(undefined), '', 'result with "undefined" parameter is incorrect');
				assert.strictEqual(helpLib.str.reverse(null), '', 'result with "null" parameter is incorrect');
			});
		});
	});
};