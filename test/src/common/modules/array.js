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
		return {

		};
	}

	describe('Test "arr" library', () => {
		describe('checking "is" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.arr.is, 'function "is" is not added or is not a function');
			});

			let params = getParams();
		});

		describe('checking "check" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.arr.check, 'function "check" is not added or is not a function');
			});

			let params = getParams();
		});
	});
};