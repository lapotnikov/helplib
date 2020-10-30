/**
 * Testing "date" library to work with dates
 * @author Artyom Lapotnikov <lapotnikov@gmail.com>
 * @copyright Artyom Lapotnikov
 * @license MIT
 */

/**
 * Create the export variable in the browser
 * If the testing happens in browser then the value of export variable is a window
 */
exports = typeof window !== 'undefined' ? window : exports;

exports.testDate = (describe, it, assert, helpLib) => {
	/**
	 * If "date" library is not exist in current version of helpLib, then we shouldn't test it
	 */
	if(helpLib.date === undefined) {
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

	describe('Test "date" library', () => {
		describe('checking "is" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.date.is, 'function "is" is not added or is not a function');
			});

			let params = getParams();
		});

		describe('checking "check" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.date.check, 'function "check" is not added or is not a function');
			});

			let params = getParams();
		});
	});
};