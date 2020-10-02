/**
 * Testing core of helpLib
 * @author Artyom Lapotnikov <lapotnikov@gmail.com>
 * @copyright Artyom Lapotnikov
 * @license MIT
 */

/**
 * Create the export variable in the browser
 * If the testing happens in browser then the value of export variable is a window
 */
exports = typeof window !== 'undefined' ? window : exports;

exports.test = (describe, it, assert, helpLib) => {
	describe('Test helpLib core', () => {
		it('checking instance of helpLib variable', () => {
			assert.exists(helpLib, 'variable is not exist');
			assert.typeOf(helpLib, 'object', 'type of variable is not Object');
			assert.strictEqual(helpLib.constructor.name, 'HelpLib', 'variable is not instance of HelpLib class');
		});

		it('checking initialize', () => {
			assert.isFunction(helpLib.isInit, 'function "isInit" is not added or is not a function');
			assert.isTrue(helpLib.isInit(), 'library is not initialized');
		});

		it('checking registration of helper function', () => {
			assert.isFunction(helpLib.regHelper, 'function "regHelper" is not added or is not a function');

			let error = null;
			try {
				helpLib.regHelper('.', 'test1', null, () => 'test1');
				helpLib.regHelper('.', 'test2', {'.': ''}, () => 'test2');
				helpLib.regHelper('.', 'test3', {'.': 'test1,test2'}, () => 'test3');
				helpLib.regHelper('test', 'test4', {'.': 'test1,test2, '}, () => 'test4');
				helpLib.regHelper('test', 'test5', {'.': ['test1', 'test2'], 'test': ''}, () => 'test5');
				helpLib.regHelper('test', 'test6', {'.': ['test1,test2', ''], 'test': ['test4, test5,']}, () => 'test6');
				helpLib.regHelper('test', 'test7', {'test': 'test4, test5,,,'}, () => 'test7');
				helpLib.regHelper('test', 'test8', {'.': ['test1'], 'test': ['test4, ,test5, ']}, () => 'test8');
			} catch(excep) {
				error = excep;
			}

			assert.ifError(error);

			assert.throws(helpLib.regHelper.bind(helpLib), TypeError, null, 'call without parameters');
			assert.throws(helpLib.regHelper.bind(helpLib, undefined, undefined, undefined, undefined), TypeError, null,
				'call with "undefined" value in all parameters');
			assert.throws(helpLib.regHelper.bind(helpLib, null, null, null, null), TypeError, null,
				'call with "null" value in all parameters');

			assert.throws(helpLib.regHelper.bind(helpLib, true, 'test', null, () => 1), TypeError, null,
				'call with "(bool) true" value in the lib parameter');
			assert.throws(helpLib.regHelper.bind(helpLib, 1, 'test', null, () => 1), TypeError, null,
				'call with "(int) 1" value in the lib parameter');
			assert.throws(helpLib.regHelper.bind(helpLib, {}, 'test', null, () => 1), TypeError, null,
				'call with "(object) {}" value in the lib parameter');
			assert.throws(helpLib.regHelper.bind(helpLib, [], 'test', null, () => 1), TypeError, null,
				'call with "(array) []" value in the lib parameter');

			assert.throws(helpLib.regHelper.bind(helpLib, '.', undefined, null, () => 1), TypeError, null,
				'call with "undefined" value in the func parameter');
			assert.throws(helpLib.regHelper.bind(helpLib, '.', null, null, () => 1), TypeError, null,
				'call with "null" value in the func parameter');
			assert.throws(helpLib.regHelper.bind(helpLib, '.', true, null, () => 1), TypeError, null,
				'call with "(bool) true" value in the func parameter');
			assert.throws(helpLib.regHelper.bind(helpLib, '.', 1, null, () => 1), TypeError, null,
				'call with "(int) 1" value in the func parameter');
			assert.throws(helpLib.regHelper.bind(helpLib, '.', '', null, () => 1), TypeError, null,
				'call with "(string) \'\'" value in the func parameter');
			assert.throws(helpLib.regHelper.bind(helpLib, '.', {}, null, () => 1), TypeError, null,
				'call with "(object) {}" value in the func parameter');
			assert.throws(helpLib.regHelper.bind(helpLib, '.', [], null, () => 1), TypeError, null,
				'call with "(array) []" value in the func parameter');

			assert.throws(helpLib.regHelper.bind(helpLib, '.', 'test', true, () => 1), TypeError, null,
				'call with "(bool) true" value in the dependence parameter');
			assert.throws(helpLib.regHelper.bind(helpLib, '.', 'test', 1, () => 1), TypeError, null,
				'call with "(int) 1" value in the dependence parameter');
			assert.throws(helpLib.regHelper.bind(helpLib, '.', 'test', '', () => 1), TypeError, null,
				'call with "(string) \'\'" value in the dependence parameter');

			assert.throws(helpLib.regHelper.bind(helpLib, '.', 'test', {}, undefined), TypeError, null,
				'call with "undefined" value in the callback parameter');
			assert.throws(helpLib.regHelper.bind(helpLib, '.', 'test', {}, null), TypeError, null,
				'call with "null" value in the callback parameter');
			assert.throws(helpLib.regHelper.bind(helpLib, '.', 'test', {}, true), TypeError, null,
				'call with "(bool) true" value in the callback parameter');
			assert.throws(helpLib.regHelper.bind(helpLib, '.', 'test', {}, 1), TypeError, null,
				'call with "(int) 1" value in the callback parameter');
			assert.throws(helpLib.regHelper.bind(helpLib, '.', 'test', {}, ''), TypeError, null,
				'call with "(string) \'\'" value in the callback parameter');
			assert.throws(helpLib.regHelper.bind(helpLib, '.', 'test', {}, {}), TypeError, null,
				'call with "(object) {}" value in the callback parameter');
			assert.throws(helpLib.regHelper.bind(helpLib, '.', 'test', {}, []), TypeError, null,
				'call with "(array) []" value in the callback parameter');

			assert.throws(helpLib.regHelper.bind(helpLib, '.', '__proto__', {}, () => 1), TypeError, null,
				'call with the function name which is reserved by parent class');
			assert.throws(helpLib.regHelper.bind(helpLib, '.', 'toString', {}, () => 1), TypeError, null,
				'call with the function name which is reserved by parent class');
			assert.throws(helpLib.regHelper.bind(helpLib, '.', 'constructor', {}, () => 1), TypeError, null,
				'call with the function name which is reserved');
			assert.throws(helpLib.regHelper.bind(helpLib, '.', 'regHelper', {}, () => 1), TypeError, null,
				'call with the function name which is reserved');
			assert.throws(helpLib.regHelper.bind(helpLib, '.', 'test1', {}, () => 1), TypeError, null,
				'call with the function name which exist in common library');
			assert.throws(helpLib.regHelper.bind(helpLib, 'test', 'test4', {}, () => 1), TypeError, null,
				'call with the function name which exist in not common library');

			assert.throws(helpLib.regHelper.bind(helpLib, '.', 'test', {'.': 'not_exist'}, () => 1), ReferenceError, null,
				'call with dependence to not existing function in common library');
			assert.throws(helpLib.regHelper.bind(helpLib, '.', 'test', {'.': 'test1, test2, not_exist'}, () => 1), ReferenceError, null,
				'call with dependence to existing functions and not existing function in common library');
			assert.throws(helpLib.regHelper.bind(helpLib, '.', 'test', {'.': 'test1, test2, , not_exist'}, () => 1), ReferenceError, null,
				'call with dependence to existing functions and not existing function in common library');
			assert.throws(helpLib.regHelper.bind(helpLib, '.', 'test', {'test': 'not_exist'}, () => 1), ReferenceError, null,
				'call with dependence to not existing function in existing library');
			assert.throws(helpLib.regHelper.bind(helpLib, '.', 'test', {'test': ' , not_exist'}, () => 1), ReferenceError, null,
				'call with dependence to not existing function in existing library');
			assert.throws(helpLib.regHelper.bind(helpLib, '.', 'test', {'test': ['test4', 'not_exist']}, () => 1), ReferenceError, null,
				'call with dependence to existing function and not existing function in existing library');
			assert.throws(helpLib.regHelper.bind(helpLib, '.', 'test', {'test': ['test4', '', 'not_exist']}, () => 1), ReferenceError, null,
				'call with dependence to existing function and not existing function in existing library');
			assert.throws(helpLib.regHelper.bind(helpLib, '.', 'test', {'test': ['test4', ' , not_exist']}, () => 1), ReferenceError, null,
				'call with dependence to existing function and not existing function in existing library');
			assert.throws(helpLib.regHelper.bind(helpLib, '.', 'test', {'not_exist': 'not_exist'}, () => 1), ReferenceError, null,
				'call with dependence to not existing library');
			assert.throws(helpLib.regHelper.bind(helpLib, '.', 'test', {'.': true}, () => 1), ReferenceError, null,
				'call with incorrect dependence "(object) {\'.\': true}"');
			assert.throws(helpLib.regHelper.bind(helpLib, '.', 'test', {'.': 1}, () => 1), ReferenceError, null,
				'call with incorrect dependence "(object) {\'.\': 1}"');
			assert.throws(helpLib.regHelper.bind(helpLib, '.', 'test', {'.': {}}, () => 1), ReferenceError, null,
				'call with incorrect dependence "(object) {\'.\': {}}"');
			assert.throws(helpLib.regHelper.bind(helpLib, '.', 'test', {'.': () => {}}, () => 1), ReferenceError, null,
				'call with incorrect dependence "(object) {\'.\': () => {}}"');
			assert.throws(helpLib.regHelper.bind(helpLib, '.', 'test', {'.': undefined}, () => 1), ReferenceError, null,
				'call with incorrect dependence "(object) {\'.\': undefined}"');
			assert.throws(helpLib.regHelper.bind(helpLib, '.', 'test', {'.': null}, () => 1), ReferenceError, null,
				'call with incorrect dependence "(object) {\'.\': null}"');

			assert.isFunction(helpLib.test1, 'function "test1" is not added or is not a function');
			assert.isFunction(helpLib.test2, 'function "test2" is not added or is not a function');
			assert.isFunction(helpLib.test3, 'function "test3" is not added or is not a function');
			assert.isObject(helpLib.test, 'library "test" is not added');
			assert.isFunction(helpLib.test.test4, 'function "test.test4" is not added or is not a function');
			assert.isFunction(helpLib.test.test5, 'function "test.test5" is not added or is not a function');
			assert.isFunction(helpLib.test.test6, 'function "test.test6" is not added or is not a function');
			assert.isFunction(helpLib.test.test7, 'function "test.test7" is not added or is not a function');
			assert.isFunction(helpLib.test.test8, 'function "test.test8" is not added or is not a function');

			assert.strictEqual(helpLib.test1(), 'test1', 'function "test1" does not work correctly');
			assert.strictEqual(helpLib.test2(), 'test2', 'function "test2" does not work correctly');
			assert.strictEqual(helpLib.test3(), 'test3', 'function "test3" does not work correctly');
			assert.strictEqual(helpLib.test.test4(), 'test4', 'function "test.test4" does not work correctly');
			assert.strictEqual(helpLib.test.test5(), 'test5', 'function "test.test5" does not work correctly');
			assert.strictEqual(helpLib.test.test6(), 'test6', 'function "test.test6" does not work correctly');
			assert.strictEqual(helpLib.test.test7(), 'test7', 'function "test.test7" does not work correctly');
			assert.strictEqual(helpLib.test.test8(), 'test8', 'function "test.test8" does not work correctly');
		});
	});
};