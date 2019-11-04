/**
 * Set the export value to a window object in the browser
 */
exports = typeof window !== 'undefined' ? window : exports;

/**
 * Function that starts testing
 */
exports.testCore = (describe, it, assert, helpLib) => {
	describe('Test helpLib core', () => {
		it('check instance of helpLib variable', () => {
			assert.exists(helpLib, 'variable is not exist');
			assert.typeOf(helpLib, 'object', 'type of variable is not Object');
			assert.equal(helpLib.constructor.name, 'HelpLib', 'variable is not instance of HelpLib class');
		});
	});
};