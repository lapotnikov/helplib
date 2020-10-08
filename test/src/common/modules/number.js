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

	describe('Test "num" library', () => {
		describe('checking "is" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.num.is, 'function "is" is not added or is not a function');
			});

			it('call with a numeric parameters', () => {
				assert.isTrue(helpLib.num.is(0), 'result with "(number) 0" parameter is incorrect');
				assert.isTrue(helpLib.num.is(-0), 'result with "(number) -0" parameter is incorrect');
				assert.isTrue(helpLib.num.is(1), 'result with "(number) 1" parameter is incorrect');
				assert.isTrue(helpLib.num.is(-1), 'result with "(number) -1" parameter is incorrect');
				assert.isTrue(helpLib.num.is(0.55), 'result with "(number) 0.55" parameter is incorrect');

				assert.isTrue(helpLib.num.is(Number.MAX_SAFE_INTEGER), 'result with "(number) Number.MAX_SAFE_INTEGER" parameter is incorrect');
				assert.isTrue(helpLib.num.is(Number.MIN_SAFE_INTEGER), 'result with "(number) Number.MIN_SAFE_INTEGER" parameter is incorrect');

				assert.isTrue(helpLib.num.is(1e2), 'result with "(number) 1e2" parameter is incorrect');
				assert.isTrue(helpLib.num.is(0xff), 'result with "(number) 0xff" parameter is incorrect');

				assert.isTrue(helpLib.num.is('0'), 'result with "(string) \'0\'" parameter is incorrect');
				assert.isTrue(helpLib.num.is('1'), 'result with "(string) \'1\'" parameter is incorrect');
				assert.isTrue(helpLib.num.is(' 1'), 'result with "(string) \' 1\'" parameter is incorrect');
				assert.isTrue(helpLib.num.is('-1'), 'result with "(string) \'-1\'" parameter is incorrect');
				assert.isTrue(helpLib.num.is('0.55'), 'result with "(string) \'0.55\'" parameter is incorrect');
				assert.isTrue(helpLib.num.is('1e2'), 'result with "(string) \'1e2\'" parameter is incorrect');
				assert.isTrue(helpLib.num.is('0xff'), 'result with "(string) \'0xff\'" parameter is incorrect');
				assert.isTrue(helpLib.num.is("\n1"), 'result with "(string) "\n1"" parameter is incorrect');
				assert.isTrue(helpLib.num.is("\t1"), 'result with "(string) "\t1"" parameter is incorrect');
				assert.isTrue(helpLib.num.is("\n\t1"), 'result with "(string) "\n\t1"" parameter is incorrect');
				assert.isTrue(helpLib.num.is("\n\t-1"), 'result with "(string) "\n\t-1"" parameter is incorrect');
				assert.isTrue(helpLib.num.is("1\n\t"), 'result with "(string) "1\n\t"" parameter is incorrect');
				assert.isTrue(helpLib.num.is("-1\n\t"), 'result with "(string) "-1\n\t"" parameter is incorrect');

				assert.isTrue(helpLib.num.is(NaN), 'result with "NaN" parameter is incorrect');
				assert.isTrue(helpLib.num.is(Infinity), 'result with "Infinity" parameter is incorrect');
			});

			it('call with not a numeric parameters', () => {
				assert.isFalse(helpLib.num.is(true), 'result with "(bool) true" parameter is incorrect');
				assert.isFalse(helpLib.num.is(false), 'result with "(bool) false" parameter is incorrect');

				assert.isFalse(helpLib.num.is(''), 'result with "(string) \'\'" parameter is incorrect');
				assert.isFalse(helpLib.num.is(' '), 'result with "(string) \' \'" parameter is incorrect');
				assert.isFalse(helpLib.num.is("\n"), 'result with "(string) "\n"" parameter is incorrect');
				assert.isFalse(helpLib.num.is("\t"), 'result with "(string) "\t"" parameter is incorrect');
				assert.isFalse(helpLib.num.is('test'), 'result with "(string) \'test\'" parameter is incorrect');
				assert.isFalse(helpLib.num.is('- 123'), 'result with "(string) \'- 123\'" parameter is incorrect');
				assert.isFalse(helpLib.num.is('123 test'), 'result with "(string) \'123 test\'" parameter is incorrect');
				assert.isFalse(helpLib.num.is('test 123'), 'result with "(string) \'test 123\'" parameter is incorrect');
				assert.isFalse(helpLib.num.is('test-123'), 'result with "(string) \'test-123\'" parameter is incorrect');
				assert.isFalse(helpLib.num.is('1.2.3'), 'result with "(string) \'1.2.3\'" parameter is incorrect');
				assert.isFalse(helpLib.num.is('1,23'), 'result with "(string) \'1,23\'" parameter is incorrect');

				assert.isFalse(helpLib.num.is([]), 'result with "(array) []" parameter is incorrect');
				assert.isFalse(helpLib.num.is([1]), 'result with "(array) [1]" parameter is incorrect');

				assert.isFalse(helpLib.num.is({}), 'result with "(object) {}" parameter is incorrect');
				assert.isFalse(helpLib.num.is({test: 1}), 'result with "(object) {test: 1}" parameter is incorrect');

				assert.isFalse(helpLib.num.is(() => {}), 'result with "function" parameter is incorrect');

				assert.isFalse(helpLib.num.is(undefined), 'result with "undefined" parameter is incorrect');
				assert.isFalse(helpLib.num.is(null), 'result with "null" parameter is incorrect');
			});
		});

		describe('checking "isInt" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.num.isInt, 'function "is" is not added or is not a function');
			});

			it('call with a numeric integer parameters', () => {
				assert.isTrue(helpLib.num.isInt(0), 'result with "(number) 0" parameter is incorrect');
				assert.isTrue(helpLib.num.isInt(-0), 'result with "(number) -0" parameter is incorrect');
				assert.isTrue(helpLib.num.isInt(1), 'result with "(number) 1" parameter is incorrect');
				assert.isTrue(helpLib.num.isInt(-1), 'result with "(number) -1" parameter is incorrect');

				assert.isTrue(helpLib.num.isInt(Number.MAX_SAFE_INTEGER), 'result with "(number) Number.MAX_SAFE_INTEGER" parameter is incorrect');
				assert.isTrue(helpLib.num.isInt(Number.MIN_SAFE_INTEGER), 'result with "(number) Number.MIN_SAFE_INTEGER" parameter is incorrect');

				assert.isTrue(helpLib.num.isInt(1e2), 'result with "(number) 1e2" parameter is incorrect');
				assert.isTrue(helpLib.num.isInt(0xff), 'result with "(number) 0xff" parameter is incorrect');

				assert.isTrue(helpLib.num.isInt('0'), 'result with "(string) \'0\'" parameter is incorrect');
				assert.isTrue(helpLib.num.isInt('1'), 'result with "(string) \'1\'" parameter is incorrect');
				assert.isTrue(helpLib.num.isInt(' 1'), 'result with "(string) \' 1\'" parameter is incorrect');
				assert.isTrue(helpLib.num.isInt('-1'), 'result with "(string) \'-1\'" parameter is incorrect');
				assert.isTrue(helpLib.num.isInt('1e2'), 'result with "(string) \'1e2\'" parameter is incorrect');
				assert.isTrue(helpLib.num.isInt('0xff'), 'result with "(string) \'0xff\'" parameter is incorrect');
				assert.isTrue(helpLib.num.isInt("\n1"), 'result with "(string) "\n1"" parameter is incorrect');
				assert.isTrue(helpLib.num.isInt("\t1"), 'result with "(string) "\t1"" parameter is incorrect');
				assert.isTrue(helpLib.num.isInt("\n\t1"), 'result with "(string) "\n\t1"" parameter is incorrect');
				assert.isTrue(helpLib.num.isInt("\n\t-1"), 'result with "(string) "\n\t-1"" parameter is incorrect');
				assert.isTrue(helpLib.num.isInt("1\n\t"), 'result with "(string) "1\n\t"" parameter is incorrect');
				assert.isTrue(helpLib.num.isInt("-1\n\t"), 'result with "(string) "-1\n\t"" parameter is incorrect');
			});

			it('call with a numeric but not integer parameters', () => {
				assert.isFalse(helpLib.num.isInt(0.55), 'result with "(number) 0.55" parameter is incorrect');
				assert.isFalse(helpLib.num.isInt(-0.55), 'result with "(number) -0.55" parameter is incorrect');
				assert.isFalse(helpLib.num.isInt(1e-1), 'result with "(number) 1e-1" parameter is incorrect');
				assert.isFalse(helpLib.num.isInt(-1e-1), 'result with "(number) -1e-1" parameter is incorrect');

				assert.isFalse(helpLib.num.isInt('0.55'), 'result with "(string) \'0.55\'" parameter is incorrect');
				assert.isFalse(helpLib.num.isInt('-0.55'), 'result with "(string) \'-0.55\'" parameter is incorrect');
				assert.isFalse(helpLib.num.isInt('1e-1'), 'result with "(string) \'1e-1\'" parameter is incorrect');
				assert.isFalse(helpLib.num.isInt('-1e-1'), 'result with "(string) \'-1e-1\'" parameter is incorrect');
				assert.isFalse(helpLib.num.isInt("\n0.5"), 'result with "(string) "\n0.5"" parameter is incorrect');
				assert.isFalse(helpLib.num.isInt("\t0.5"), 'result with "(string) "\t0.5"" parameter is incorrect');
				assert.isFalse(helpLib.num.isInt("\n\t0.5"), 'result with "(string) "\n\t0.5"" parameter is incorrect');
				assert.isFalse(helpLib.num.isInt("\n\t-0.5"), 'result with "(string) "\n\t-0.5"" parameter is incorrect');
				assert.isFalse(helpLib.num.isInt("0.5\n\t"), 'result with "(string) "0.5\n\t"" parameter is incorrect');
				assert.isFalse(helpLib.num.isInt("-0.5\n\t"), 'result with "(string) "-0.5\n\t"" parameter is incorrect');

				assert.isFalse(helpLib.num.isInt(NaN), 'result with "NaN" parameter is incorrect');
				assert.isFalse(helpLib.num.isInt(Infinity), 'result with "Infinity" parameter is incorrect');
			});

			it('call with not a numeric parameters', () => {
				assert.isFalse(helpLib.num.isInt(true), 'result with "(bool) true" parameter is incorrect');
				assert.isFalse(helpLib.num.isInt(false), 'result with "(bool) false" parameter is incorrect');

				assert.isFalse(helpLib.num.isInt(''), 'result with "(string) \'\'" parameter is incorrect');
				assert.isFalse(helpLib.num.isInt(' '), 'result with "(string) \' \'" parameter is incorrect');
				assert.isFalse(helpLib.num.isInt("\n"), 'result with "(string) "\n"" parameter is incorrect');
				assert.isFalse(helpLib.num.isInt("\t"), 'result with "(string) "\t"" parameter is incorrect');
				assert.isFalse(helpLib.num.isInt('test'), 'result with "(string) \'test\'" parameter is incorrect');
				assert.isFalse(helpLib.num.isInt('- 123'), 'result with "(string) \'- 123\'" parameter is incorrect');
				assert.isFalse(helpLib.num.isInt('123 test'), 'result with "(string) \'123 test\'" parameter is incorrect');
				assert.isFalse(helpLib.num.isInt('test 123'), 'result with "(string) \'test 123\'" parameter is incorrect');
				assert.isFalse(helpLib.num.isInt('test-123'), 'result with "(string) \'test-123\'" parameter is incorrect');
				assert.isFalse(helpLib.num.isInt('1.2.3'), 'result with "(string) \'1.2.3\'" parameter is incorrect');
				assert.isFalse(helpLib.num.isInt('1,23'), 'result with "(string) \'1,23\'" parameter is incorrect');

				assert.isFalse(helpLib.num.isInt([]), 'result with "(array) []" parameter is incorrect');
				assert.isFalse(helpLib.num.isInt([1]), 'result with "(array) [1]" parameter is incorrect');

				assert.isFalse(helpLib.num.isInt({}), 'result with "(object) {}" parameter is incorrect');
				assert.isFalse(helpLib.num.isInt({test: 1}), 'result with "(object) {test: 1}" parameter is incorrect');

				assert.isFalse(helpLib.num.isInt(() => {}), 'result with "function" parameter is incorrect');

				assert.isFalse(helpLib.num.isInt(undefined), 'result with "undefined" parameter is incorrect');
				assert.isFalse(helpLib.num.isInt(null), 'result with "null" parameter is incorrect');
			});
		});

		describe('checking "check" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.num.check, 'function "check" is not added or is not a function');
			});

			it('call with a numeric as parameters', () => {
				assert.strictEqual(helpLib.num.check(0), 0, 'result with "(number) 0" parameter is incorrect');
				assert.strictEqual(helpLib.num.check(-0), 0, 'result with "(number) -0" parameter is incorrect');
				assert.strictEqual(helpLib.num.check(1), 1, 'result with "(number) 1" parameter is incorrect');
				assert.strictEqual(helpLib.num.check(-1), -1, 'result with "(number) -1" parameter is incorrect');
				assert.strictEqual(helpLib.num.check(0.55), 0.55, 'result with "(number) 0.55" parameter is incorrect');

				assert.strictEqual(helpLib.num.check(Number.MAX_SAFE_INTEGER), Number.MAX_SAFE_INTEGER,
					'result with "(number) Number.MAX_SAFE_INTEGER" parameter is incorrect');
				assert.strictEqual(helpLib.num.check(Number.MIN_SAFE_INTEGER), Number.MIN_SAFE_INTEGER,
					'result with "(number) Number.MIN_SAFE_INTEGER" parameter is incorrect');

				assert.strictEqual(helpLib.num.check(1e2), 100, 'result with "(number) 1e2" parameter is incorrect');
				assert.strictEqual(helpLib.num.check(0xff), 255, 'result with "(number) 0xff" parameter is incorrect');

				assert.strictEqual(helpLib.num.check('0'), 0, 'result with "(string) \'0\'" parameter is incorrect');
				assert.strictEqual(helpLib.num.check('1'), 1, 'result with "(string) \'1\'" parameter is incorrect');
				assert.strictEqual(helpLib.num.check(' 1'), 1, 'result with "(string) \' 1\'" parameter is incorrect');
				assert.strictEqual(helpLib.num.check('-1'), -1, 'result with "(string) \'-1\'" parameter is incorrect');
				assert.strictEqual(helpLib.num.check('0.55'), 0.55, 'result with "(string) \'0.55\'" parameter is incorrect');
				assert.strictEqual(helpLib.num.check('1e2'), 100, 'result with "(string) \'1e2\'" parameter is incorrect');
				assert.strictEqual(helpLib.num.check('0xff'), 255, 'result with "(string) \'0xff\'" parameter is incorrect');
				assert.strictEqual(helpLib.num.check("\n1"), 1, 'result with "(string) "\n1"" parameter is incorrect');
				assert.strictEqual(helpLib.num.check("\t1"), 1, 'result with "(string) "\t1"" parameter is incorrect');
				assert.strictEqual(helpLib.num.check("\n\t1"), 1, 'result with "(string) "\n\t1"" parameter is incorrect');
				assert.strictEqual(helpLib.num.check("\n\t-1"), -1, 'result with "(string) "\n\t-1"" parameter is incorrect');
				assert.strictEqual(helpLib.num.check("1\n\t"), 1, 'result with "(string) "1\n\t"" parameter is incorrect');
				assert.strictEqual(helpLib.num.check("-1\n\t"), -1, 'result with "(string) "-1\n\t"" parameter is incorrect');

				assert.isNaN(helpLib.num.check(NaN), 'result with "NaN" parameter is incorrect');
				assert.strictEqual(helpLib.num.check(Infinity), Infinity, 'result with "Infinity" parameter is incorrect');
			});

			it('call with a numeric as "num" parameter and some "defValue" parameter', () => {
				assert.strictEqual(helpLib.num.check(0, null), 0, 'result with "(number) 0, null" parameters is incorrect');
				assert.strictEqual(helpLib.num.check(-0, null), 0, 'result with "(number) -0, null" parameters is incorrect');
				assert.strictEqual(helpLib.num.check(1, null), 1, 'result with "(number) 1, null" parameters is incorrect');
				assert.strictEqual(helpLib.num.check(-1, null), -1, 'result with "(number) -1, null" parameters is incorrect');
				assert.strictEqual(helpLib.num.check(0.55, null), 0.55, 'result with "(number) 0.55, null" parameters is incorrect');

				assert.strictEqual(helpLib.num.check(Number.MAX_SAFE_INTEGER, null), Number.MAX_SAFE_INTEGER,
					'result with "(number) Number.MAX_SAFE_INTEGER, null" parameters is incorrect');
				assert.strictEqual(helpLib.num.check(Number.MIN_SAFE_INTEGER, null), Number.MIN_SAFE_INTEGER,
					'result with "(number) Number.MIN_SAFE_INTEGER, null" parameters is incorrect');

				assert.strictEqual(helpLib.num.check(1e2, null), 100, 'result with "(number) 1e2, null" parameters is incorrect');
				assert.strictEqual(helpLib.num.check(0xff, null), 255, 'result with "(number) 0xff, null" parameters is incorrect');

				assert.strictEqual(helpLib.num.check('0', null), 0, 'result with "(string) \'0\', null" parameters is incorrect');
				assert.strictEqual(helpLib.num.check('1', null), 1, 'result with "(string) \'1\', null" parameters is incorrect');
				assert.strictEqual(helpLib.num.check(' 1', null), 1, 'result with "(string) \' 1\', null" parameters is incorrect');
				assert.strictEqual(helpLib.num.check('-1', null), -1, 'result with "(string) \'-1\', null" parameters is incorrect');
				assert.strictEqual(helpLib.num.check('0.55', null), 0.55, 'result with "(string) \'0.55\', null" parameters is incorrect');
				assert.strictEqual(helpLib.num.check('1e2', null), 100, 'result with "(string) \'1e2\', null" parameters is incorrect');
				assert.strictEqual(helpLib.num.check('0xff', null), 255, 'result with "(string) \'0xff\', null" parameters is incorrect');
				assert.strictEqual(helpLib.num.check("\n1", null), 1, 'result with "(string) "\n1", null" parameters is incorrect');
				assert.strictEqual(helpLib.num.check("\t1", null), 1, 'result with "(string) "\t1", null" parameters is incorrect');
				assert.strictEqual(helpLib.num.check("\n\t1", null), 1, 'result with "(string) "\n\t1", null" parameters is incorrect');
				assert.strictEqual(helpLib.num.check("\n\t-1", null), -1, 'result with "(string) "\n\t-1", null" parameters is incorrect');
				assert.strictEqual(helpLib.num.check("1\n\t", null), 1, 'result with "(string) "1\n\t", null" parameters is incorrect');
				assert.strictEqual(helpLib.num.check("-1\n\t", null), -1, 'result with "(string) "-1\n\t", null" parameters is incorrect');

				assert.isNaN(helpLib.num.check(NaN, null), 'result with "NaN, null" parameters is incorrect');
				assert.strictEqual(helpLib.num.check(Infinity, null), Infinity, 'result with "Infinity, null" parameters is incorrect');
			});

			it('call without parameters or with null or undefined values', () => {
				assert.isNumber(helpLib.num.check(), 'result without parameter is incorrect');

				assert.isNumber(helpLib.num.check(undefined), 'result with "undefined" parameter is incorrect');
				assert.isNumber(helpLib.num.check(undefined, undefined), 'result with "undefined, undefined" parameters is incorrect');

				assert.isNumber(helpLib.num.check(null), 'result with "null" parameter is incorrect');
				assert.isNull(helpLib.num.check(null, null), 'result with "null, null" parameters is incorrect');
			});

			it('call with not a numeric as parameters', () => {
				assert.isNumber(helpLib.num.check(true), 'result with "(bool) true" parameter is incorrect');
				assert.isNumber(helpLib.num.check(false), 'result with "(bool) false" parameter is incorrect');

				assert.isNumber(helpLib.num.check(''), 'result with "(string) \'\'" parameter is incorrect');
				assert.isNumber(helpLib.num.check(' '), 'result with "(string) \' \'" parameter is incorrect');
				assert.isNumber(helpLib.num.check("\n"), 'result with "(string) "\n"" parameter is incorrect');
				assert.isNumber(helpLib.num.check("\t"), 'result with "(string) "\t"" parameter is incorrect');
				assert.isNumber(helpLib.num.check('test'), 'result with "(string) \'test\'" parameter is incorrect');
				assert.isNumber(helpLib.num.check('- 123'), 'result with "(string) \'- 123\'" parameter is incorrect');
				assert.isNumber(helpLib.num.check('123 test'), 'result with "(string) \'123 test\'" parameter is incorrect');
				assert.isNumber(helpLib.num.check('test 123'), 'result with "(string) \'test 123\'" parameter is incorrect');
				assert.isNumber(helpLib.num.check('test-123'), 'result with "(string) \'test-123\'" parameter is incorrect');
				assert.isNumber(helpLib.num.check('1.2.3'), 'result with "(string) \'1.2.3\'" parameter is incorrect');
				assert.isNumber(helpLib.num.check('1,23'), 'result with "(string) \'1,23\'" parameter is incorrect');

				assert.isNumber(helpLib.num.check([]), 'result with "(array) []" parameter is incorrect');
				assert.isNumber(helpLib.num.check([1]), 'result with "(array) [1]" parameter is incorrect');

				assert.isNumber(helpLib.num.check({}), 'result with "(object) {}" parameter is incorrect');
				assert.isNumber(helpLib.num.check({test: 1}), 'result with "(object) {test: 1}" parameter is incorrect');

				assert.isNumber(helpLib.num.check(() => {}), 'result with "function" parameter is incorrect');
			});

			it('call with not a numeric as "num" parameter and some "defValue" parameter', () => {
				assert.strictEqual(helpLib.num.check(true, 100), 100, 'result with "(bool) true, (number) 100" parameters is incorrect');
				assert.strictEqual(helpLib.num.check(false, 100), 100, 'result with "(bool) false, (number) 100" parameters is incorrect');

				assert.strictEqual(helpLib.num.check('', 100), 100,
					'result with "(string) \'\', (number) 100" parameters is incorrect');
				assert.strictEqual(helpLib.num.check(' ', 100), 100,
					'result with "(string) \' \', (number) 100" parameters is incorrect');
				assert.strictEqual(helpLib.num.check("\n", 100), 100,
					'result with "(string) "\n", (number) 100" parameters is incorrect');
				assert.strictEqual(helpLib.num.check("\t", 100), 100,
					'result with "(string) "\t", (number) 100" parameters is incorrect');
				assert.strictEqual(helpLib.num.check('test', 100), 100,
					'result with "(string) \'test\', (number) 100" parameters is incorrect');
				assert.strictEqual(helpLib.num.check('- 123', 100), 100,
					'result with "(string) \'- 123\', (number) 100" parameters is incorrect');
				assert.strictEqual(helpLib.num.check('123 test', 100), 100,
					'result with "(string) \'123 test\', (number) 100" parameters is incorrect');
				assert.strictEqual(helpLib.num.check('test 123', 100), 100,
					'result with "(string) \'test 123\', (number) 100" parameters is incorrect');
				assert.strictEqual(helpLib.num.check('test-123', 100), 100,
					'result with "(string) \'test-123\', (number) 100" parameters is incorrect');
				assert.strictEqual(helpLib.num.check('1.2.3', 100), 100,
					'result with "(string) \'1.2.3\', (number) 100" parameters is incorrect');
				assert.strictEqual(helpLib.num.check('1,23', 100), 100,
					'result with "(string) \'1,23\', (number) 100" parameters is incorrect');

				assert.strictEqual(helpLib.num.check([], 100), 100, 'result with "(array) [], (number) 100" parameters is incorrect');
				assert.strictEqual(helpLib.num.check([1], 100), 100, 'result with "(array) [1], (number) 100" parameters is incorrect');

				assert.strictEqual(helpLib.num.check({}, 100), 100,
					'result with "(object) {}, (number) 100" parameters is incorrect');
				assert.strictEqual(helpLib.num.check({test: 1}, 100), 100,
					'result with "(object) {test: 1}, (number) 100" parameters is incorrect');

				assert.strictEqual(helpLib.num.check(() => {}, 100), 100, 'result with "function, (number) 100" parameters is incorrect');

				assert.strictEqual(helpLib.num.check(undefined, 100), 100, 'result with "undefined, (number) 100" parameters is incorrect');
				assert.strictEqual(helpLib.num.check(null, 100), 100, 'result with "null, (number) 100" parameters is incorrect');
			});
		});
	});
};