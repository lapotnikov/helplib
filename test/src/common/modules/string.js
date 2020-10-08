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

	describe('Test "str" library', () => {
		describe('checking "is" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.str.is, 'function "is" is not added or is not a function');
			});

			it('call with a string parameters', () => {
				assert.isTrue(helpLib.str.is(''), 'result with "(string) \'\'" parameter is incorrect');
				assert.isTrue(helpLib.str.is(``), 'result with "(string) ``" parameter is incorrect');
				assert.isTrue(helpLib.str.is(""), 'result with "(string) """ parameter is incorrect');

				assert.isTrue(helpLib.str.is(`test`), 'result with "(string) ` `" parameter is incorrect');
				assert.isTrue(helpLib.str.is('test'), 'result with "(string) \'test\'" parameter is incorrect');
				assert.isTrue(helpLib.str.is("test"), 'result with "(string) "test"" parameter is incorrect');
				assert.isTrue(helpLib.str.is("\n\t"), 'result with "(string) "\n\t"" parameter is incorrect');
			});

			it('call with not a string parameters', () => {
				assert.isFalse(helpLib.str.is(true), 'result with "(bool) true" parameter is incorrect');
				assert.isFalse(helpLib.str.is(false), 'result with "(bool) false" parameter is incorrect');

				assert.isFalse(helpLib.str.is(0), 'result with "(number) 0" parameter is incorrect');
				assert.isFalse(helpLib.str.is(1), 'result with "(number) 1" parameter is incorrect');

				assert.isFalse(helpLib.str.is([]), 'result with "(array) []" parameter is incorrect');
				assert.isFalse(helpLib.str.is(['test']), 'result with "(array) [\'test\']" parameter is incorrect');

				assert.isFalse(helpLib.str.is({}), 'result with "(object) {}" parameter is incorrect');
				assert.isFalse(helpLib.str.is({test: 'test'}), 'result with "(object) {test: \'test\'}" parameter is incorrect');

				assert.isFalse(helpLib.str.is(() => {}), 'result with "function" parameter is incorrect');

				assert.isFalse(helpLib.str.is(NaN), 'result with "NaN" parameter is incorrect');
				assert.isFalse(helpLib.str.is(Infinity), 'result with "Infinity" parameter is incorrect');
				assert.isFalse(helpLib.str.is(undefined), 'result with "undefined" parameter is incorrect');
				assert.isFalse(helpLib.str.is(null), 'result with "null" parameter is incorrect');
			});
		});

		describe('checking "check" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.str.check, 'function "check" is not added or is not a function');
			});

			it('call with parameters who can convert to string', () => {
				assert.strictEqual(helpLib.str.check(true), 'true', 'result with "(bool) true" parameter is incorrect');
				assert.strictEqual(helpLib.str.check(false), 'false', 'result with "(bool) false" parameter is incorrect');

				assert.strictEqual(helpLib.str.check(0), '0', 'result with "(number) 0" parameter is incorrect');
				assert.strictEqual(helpLib.str.check(1), '1', 'result with "(number) 1" parameter is incorrect');

				assert.strictEqual(helpLib.str.check(''), '', 'result with "(string) \'\'" parameter is incorrect');
				assert.strictEqual(helpLib.str.check('test'), 'test', 'result with "(string) \'test\'" parameter is incorrect');

				assert.strictEqual(helpLib.str.check([]), '', 'result with "(array) []" parameter is incorrect');
				assert.strictEqual(helpLib.str.check(['test']), 'test', 'result with "(array) [\'test\']" parameter is incorrect');

				assert.strictEqual(helpLib.str.check({}), '[object Object]',
					'result with "(object) {}" parameter is incorrect');
				assert.strictEqual(helpLib.str.check({test: 'test'}), '[object Object]',
					'result with "(object) {test: \'test\'}" parameter is incorrect');
				assert.strictEqual(helpLib.str.check({toString: () => 'test'}), 'test',
					'result with "(object) {toString: () => \'test\'}" parameter is incorrect');

				assert.strictEqual(helpLib.str.check(() => {}), '() => {}', 'result with "function" parameter is incorrect');

				assert.strictEqual(helpLib.str.check(NaN), 'NaN', 'result with "NaN" parameter is incorrect');
				assert.strictEqual(helpLib.str.check(Infinity), 'Infinity', 'result with "Infinity" parameter is incorrect');
			});

			it('call with a values who can convert to string as "str" parameter and some "defValue" parameter', () => {
				assert.strictEqual(helpLib.str.check(true, null), 'true', 'result with "(bool) true, null" parameters is incorrect');
				assert.strictEqual(helpLib.str.check(false, null), 'false', 'result with "(bool) false, null" parameters is incorrect');

				assert.strictEqual(helpLib.str.check(0, null), '0', 'result with "(number) 0, null" parameters is incorrect');
				assert.strictEqual(helpLib.str.check(1, null), '1', 'result with "(number) 1, null" parameters is incorrect');

				assert.strictEqual(helpLib.str.check('', null), '', 'result with "(string) \'\', null" parameters is incorrect');
				assert.strictEqual(helpLib.str.check('test', null), 'test', 'result with "(string) \'test\', null" parameters is incorrect');

				assert.strictEqual(helpLib.str.check([], null), '',
					'result with "(array) [], null" parameters is incorrect');
				assert.strictEqual(helpLib.str.check(['test'], null), 'test',
					'result with "(array) [\'test\'], null" parameters is incorrect');

				assert.strictEqual(helpLib.str.check({}, null), '[object Object]',
					'result with "(object) {}, null" parameters is incorrect');
				assert.strictEqual(helpLib.str.check({test: 'test'}, null), '[object Object]',
					'result with "(object) {test: \'test\'}, null" parameters is incorrect');
				assert.strictEqual(helpLib.str.check({toString: () => 'test'}, null), 'test',
					'result with "(object) {toString: () => \'test\'}, null" parameters is incorrect');

				assert.strictEqual(helpLib.str.check(() => {}, null), '() => {}', 'result with "function, null" parameters is incorrect');

				assert.strictEqual(helpLib.str.check(NaN, null), 'NaN', 'result with "NaN, null" parameters is incorrect');
				assert.strictEqual(helpLib.str.check(Infinity, null), 'Infinity', 'result with "Infinity, null" parameters is incorrect');
			});

			it('call with parameters who can convert to string', () => {
				assert.isString(helpLib.str.check(), 'result without parameter is incorrect');

				assert.isString(helpLib.str.check(undefined), 'result with "undefined" parameter is incorrect');
				assert.isString(helpLib.str.check(undefined, undefined), 'result with "undefined, undefined" parameters is incorrect');

				assert.isString(helpLib.str.check(null), 'result with "null" parameter is incorrect');
				assert.isNull(helpLib.str.check(null, null), 'result with "null, null" parameters is incorrect');
			});

			it('call with values who can not convert to string as "str" parameter and some "defValue" parameter', () => {
				assert.strictEqual(helpLib.str.check(undefined, 'test'), 'test', 'result with "undefined, (string) \'test\'" parameters is incorrect');
				assert.strictEqual(helpLib.str.check(null, 'test'), 'test', 'result with "null, (string) \'test\'" parameters is incorrect');
			});
		});

		describe('checking "trim" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.str.trim, 'function "trim" is not added or is not a function');
			});

			it('call with parameters who can convert to string', () => {
				assert.strictEqual(helpLib.str.trim(true), 'true', 'result with "(bool) true" parameter is incorrect');
				assert.strictEqual(helpLib.str.trim(false), 'false', 'result with "(bool) false" parameter is incorrect');

				assert.strictEqual(helpLib.str.trim(0), '0', 'result with "(number) 0" parameter is incorrect');
				assert.strictEqual(helpLib.str.trim(1), '1', 'result with "(number) 1" parameter is incorrect');

				assert.strictEqual(helpLib.str.trim(''), '',
					'result with "(string) \'\'" parameter is incorrect');
				assert.strictEqual(helpLib.str.trim(' '), '',
					'result with "(string) \' \'" parameter is incorrect');
				assert.strictEqual(helpLib.str.trim('test'), 'test',
					'result with "(string) \' \'" parameter is incorrect');
				assert.strictEqual(helpLib.str.trim('   test   '), 'test',
					'result with "(string) \'   test   \'" parameter is incorrect');
				assert.strictEqual(helpLib.str.trim(' test   test '), 'test   test',
					'result with "(string) \' test   test \'" parameter is incorrect');
				assert.strictEqual(helpLib.str.trim("\t"), '',
					'result with "(string) "\t"" parameter is incorrect');
				assert.strictEqual(helpLib.str.trim("\n"), '',
					'result with "(string) "\n"" parameter is incorrect');
				assert.strictEqual(helpLib.str.trim("\t\n   \t   \r\n\t"), '',
					'result with "(string) "\t\n   \t   \r\n\t"" parameter is incorrect');
				assert.strictEqual(helpLib.str.trim("\t\t\ttest\t\t\t"), 'test',
					'result with "(string) "\t\t\ttest\t\t\t"" parameter is incorrect');
				assert.strictEqual(helpLib.str.trim("\ttest\t\t\t\r\n\t\t\ttest\t"), "test\t\t\t\r\n\t\t\ttest",
					'result with "(string) "\ttest\t\t\t\r\n\t\t\ttest\t"" parameter is incorrect');

				assert.strictEqual(helpLib.str.trim([]), '',
					'result with "(array) []" parameter is incorrect');
				assert.strictEqual(helpLib.str.trim(['test']), 'test',
					'result with "(array) [\'test\']" parameter is incorrect');
				assert.strictEqual(helpLib.str.trim(['   test   ']), 'test',
					'result with "(array) [\'   test   \']" parameter is incorrect');
				assert.strictEqual(helpLib.str.trim([' test   ', '   test ']), 'test   ,   test',
					'result with "(array) [\' test   \', \'   test \']" parameter is incorrect');

				assert.strictEqual(helpLib.str.trim({}), '[object Object]',
					'result with "(object) {}" parameter is incorrect');
				assert.strictEqual(helpLib.str.trim({test: 'test'}), '[object Object]',
					'result with "(object) {test: \'test\'}" parameter is incorrect');
				assert.strictEqual(helpLib.str.trim({toString: () => 'test'}), 'test',
					'result with "(object) {toString: () => \'test\'}" parameter is incorrect');
				assert.strictEqual(helpLib.str.trim({toString: () => '   test   '}), 'test',
					'result with "(object) {toString: () => \'   test   \'}" parameter is incorrect');
				assert.strictEqual(helpLib.str.trim({toString: () => ' test   test '}), 'test   test',
					'result with "(object) {toString: () => \' test   test \'}" parameter is incorrect');

				assert.strictEqual(helpLib.str.trim(() => {}), '() => {}', 'result with "function" parameter is incorrect');

				assert.strictEqual(helpLib.str.trim(NaN), 'NaN', 'result with "NaN" parameter is incorrect');
				assert.strictEqual(helpLib.str.trim(Infinity), 'Infinity', 'result with "Infinity" parameter is incorrect');
			});

			it('call with parameters who can not convert to string', () => {
				assert.strictEqual(helpLib.str.trim(undefined), '', 'result with "undefined" parameter is incorrect');
				assert.strictEqual(helpLib.str.trim(null), '', 'result with "null" parameter is incorrect');
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
					'result with "(string) "\t"" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearDoubleSpace("\t\t"), ' ',
					'result with "(string) "\t\t"" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearDoubleSpace(" \t \t \t "), ' ',
					'result with "(string) " \t \t \t "" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearDoubleSpace("\t \n \t \t   \t\r\n\t\t "), " \n \r\n ",
					'result with "(string) "\t \n \t \t   \t\r\n\t\t "" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearDoubleSpace("\ttest\t \t\t"), ' test ',
					'result with "(string) "\ttest\t \t\t"" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearDoubleSpace("test\t \n  \t\t"), "test \n ",
					'result with "(string) "test\t \n  \t\t"" parameter is incorrect');
				assert.strictEqual(helpLib.str.clearDoubleSpace(" test\r\n \r\n\t\n"), " test\r\n \r\n \n",
					'result with "(string) " test\r\n \r\n\t\n"" parameter is incorrect');

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
				assert.strictEqual(helpLib.str.ucFirst("\ttest"), "\ttest", 'result with "(string) "\ttest"" parameter is incorrect');
				assert.strictEqual(helpLib.str.ucFirst("test\t"), "Test\t", 'result with "(string) "test\t"" parameter is incorrect');
				assert.strictEqual(helpLib.str.ucFirst("\ntest"), "\ntest", 'result with "(string) "\ntest"" parameter is incorrect');
				assert.strictEqual(helpLib.str.ucFirst("test\n"), "Test\n", 'result with "(string) "test\n"" parameter is incorrect');

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
				assert.strictEqual(helpLib.str.lcFirst("\tTest"), "\tTest", 'result with "(string) "\tTest"" parameter is incorrect');
				assert.strictEqual(helpLib.str.lcFirst("Test\t"), "test\t", 'result with "(string) "Test\t"" parameter is incorrect');
				assert.strictEqual(helpLib.str.lcFirst("\nTest"), "\nTest", 'result with "(string) "\nTest"" parameter is incorrect');
				assert.strictEqual(helpLib.str.lcFirst("Test\n"), "test\n", 'result with "(string) "Test\n"" parameter is incorrect');

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
				assert.strictEqual(helpLib.str.reverse("\ttest"), "tset\t", 'result with "(string) "\ttest"" parameter is incorrect');
				assert.strictEqual(helpLib.str.reverse("Test\t"), "\ttseT", 'result with "(string) "Test\t"" parameter is incorrect');
				assert.strictEqual(helpLib.str.reverse("\ntest"), "tset\n", 'result with "(string) "\ntest"" parameter is incorrect');
				assert.strictEqual(helpLib.str.reverse("Test\n"), "\ntseT", 'result with "(string) "Test\n"" parameter is incorrect');

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