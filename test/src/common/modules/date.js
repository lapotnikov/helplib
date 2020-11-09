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
		let time1 = (new Date(1970, 0, 1)).getTime();
		let time2 = (new Date(2020, 0, 20)).getTime();
		let time3 = (new Date(2020, 0, 20, 15, 15, 15)).getTime();
		return {
			date: [
				[new Date(), `(object) new Date()`, (new Date()).getTime() - 1000, (new Date()).getTime()],
				[new Date(null), `(object) new Date(null)`, 0, 0],

				[new Date(0), `(object) new Date(0)`, 0, 0],
				[new Date(500), `(object) new Date(500)`, 500, 500], [new Date(-500), `(object) new Date(-500)`, -500, -500],
				[new Date(3600000), `(object) new Date(3600000)`, 3600000, 3600000],
				[new Date(-3600000), `(object) new Date(-3600000)`, -3600000, -3600000],
				[new Date(1579522515000), `(object) new Date(1579522515000)`, 1579522515000, 1579522515000],
				[new Date(-1579522515000), `(object) new Date(-1579522515000)`, -1579522515000, -1579522515000],

				[new Date('1970-01-01'), `(object) new Date('1970-01-01')`, 0, 0],
				[new Date('2020-01-20'), `(object) new Date('2020-01-20')`, 1579478400000, 1579478400000],
				[new Date('1970-01-01T00:00:00'), `(object) new Date('1970-01-01T00:00:00')`, time1, time1],
				[new Date('2020-01-20T15:15:15'), `(object) new Date('2020-01-20T15:15:15')`, time3, time3],
				[new Date('Jan 01 1970 03:00:00 GMT+0300'), `(object) new Date('Jan 01 1970 03:00:00 GMT+0300')`, 0, 0],
				[new Date('Jan 01 1970 00:00:00 GMT+0000'), `(object) new Date('Jan 01 1970 00:00:00 GMT+0000')`, 0, 0],
				[new Date('Jan 01 1970 00:00:00 GMT+0300'), `(object) new Date('Jan 01 1970 00:00:00 GMT+0300')`, -10800000, -10800000],
				[new Date('Jan 20 2020 15:15:15 GMT+0300'), `(object) new Date('Jan 20 2020 15:15:15 GMT+0300')`, 1579522515000, 1579522515000],
				[new Date('Jan 20 2020 12:15:15 GMT+0000'), `(object) new Date('Jan 20 2020 12:15:15 GMT+0000')`, 1579522515000, 1579522515000],
				[new Date('Jan 20 2020 15:15:15 GMT+0000'), `(object) new Date('Jan 20 2020 15:15:15 GMT+0000')`, 1579533315000, 1579533315000],

				[new Date(1970, 0, 1), `(object) new Date(2020, 01, 20, 15, 15, 15)`, time1, time1],
				[new Date(2020, 0, 20, 15, 15, 15), `(object) new Date(2020, 01, 20, 15, 15, 15)`, time3, time3]
			],

			strDate: [
				['1970-01-01', `(string) '1970-01-01'`, 0, 0],
				['2020-01-20', `(string) '2020-01-20'`, 1579478400000, 1579478400000],
				['1970-01-01T00:00:00', `(string) '1970-01-01T00:00:00'`, time1, time1],
				['2020-01-20T15:15:15', `(string) '2020-01-20T15:15:15'`, time3, time3],

				[' 1970-01-01', `(string) ' 1970-01-01'`, time1, time1], ['2020-01-20 ', `(string) '2020-01-20 '`, time2, time2],
				['\t1970-01-01', `(string) '\\t1970-01-01'`, time1, time1], ['2020-01-20\t', `(string) '2020-01-20\\t'`, time2, time2],
				['\n1970-01-01', `(string) '\\n1970-01-01'`, time1, time1], ['2020-01-20\n', `(string) '2020-01-20\\n'`, time2, time2],

				['Jan 1970', `(string) 'Jan 1970'`, time1, time1], ['Jan 01 1970', `(string) 'Jan 01 1970'`, time1, time1],

				['Jan 01 1970 03:00:00 GMT+0300', `(string) 'Jan 01 1970 03:00:00 GMT+0300'`, 0, 0],
				['Jan 01 1970 00:00:00 GMT+0000', `(string) 'Jan 01 1970 00:00:00 GMT+0000'`, 0, 0],
				['Jan 01 1970 00:00:00 GMT+0300', `(string) 'Jan 01 1970 00:00:00 GMT+0300'`, -10800000, -10800000],
				['Jan 20 2020 15:15:15 GMT+0300', `(string) 'Jan 20 2020 15:15:15 GMT+0300'`, 1579522515000, 1579522515000],
				['Jan 20 2020 12:15:15 GMT+0000', `(string) 'Jan 20 2020 12:15:15 GMT+0000'`, 1579522515000, 1579522515000],
				['Jan 20 2020 15:15:15 GMT+0000', `(string) 'Jan 20 2020 15:15:15 GMT+0000'`, 1579533315000, 1579533315000],

				['Mon Jan 20 2020 15:15:15 GMT+3', `(string) 'Mon Jan 20 2020 15:15:15 GMT+3'`, 1579522515000, 1579522515000],
				['Mon, 20 Jan 2020 15:15:15 GMT', `(string) 'Mon Jan 20 2020 15:15:15 GMT'`, 1579533315000, 1579533315000]
			],

			numDate: [
				[0, `(number) 0`, 0, 0], [0.0001, `(number) 0.0001`, 0, 0], [0.9999, `(number) 0.9999`, 0, 0],
				[0x0, `(number) 0x0`, 0, 0], [0e0, `(number) 0e0`, 0, 0], [1e-1, `(number) 1e-1`, 0, 0],
				[500, `(number) 500`, 500, 500], [500.9999, `(number) 500.9999`, 500, 500],
				[-500, `(number) -500`, -500, -500], [-500.9999, `(number) -500.9999`, -500, -500],
				[3600000, `(number) 3600000`, 3600000, 3600000], [-3600000, `(number) -3600000`, -3600000, -3600000],
				[1579522515000, `(number) 1579522515000`, 1579522515000, 1579522515000],
				[-1579522515000, `(number) -1579522515000`, -1579522515000, -1579522515000],

				['0', `(string) '0'`, 0, 0], ['0.0001', `(string) '0.0001'`, 0, 0], ['0.9999', `(string) '0.9999'`, 0, 0],
				['0x0', `(string) '0x0'`, 0, 0], ['0e0', `(string) '0e0'`, 0, 0], ['1e-1', `(string) '1e-1'`, 0, 0],
				['500', `(string) '500'`, 500, 500], ['500.9999', `(string) '500.9999'`, 500, 500],
				['-500', `(string) '-500'`, -500, -500], ['-500.9999', `(string) '-500.9999'`, -500, -500]
			],

			invDate: [
				[new Date(undefined), `(object) new Date(undefined)`], [new Date(NaN), `(object) new Date(NaN)`],
				[new Date(Infinity), `(object) new Date(Infinity)`], [new Date(-Infinity), `(object) new Date(-Infinity)`],

				[new Date(Number.MAX_SAFE_INTEGER), `(object) new Date(${Number.MAX_SAFE_INTEGER})`],
				[new Date(Number.MIN_SAFE_INTEGER), `(object) new Date(${Number.MIN_SAFE_INTEGER})`],

				[new Date(''), `(object) new Date('')`], [new Date('test'), `(object) new Date('test')`],
				[new Date('1970-01-01T'), `(object) new Date('1970-01-01T')`],
				[new Date('1970-01-01T0:0'), `(object) new Date('1970-01-01T0:0')`],
				[new Date('1970-01-01T1:00'), `(object) new Date('1970-01-01T1:00')`],
				[new Date('1970-01-01T01:00:'), `(object) new Date('1970-01-01T01:00:')`],
				[new Date('1970-01-01T01:00:0'), `(object) new Date('1970-01-01T01:00:0')`],
				[new Date('1970-01-01T01:00:00:'), `(object) new Date('1970-01-01T01:00:00:')`]
			],

			noDate: [
				['', `(string) ''`], ['test', `(string) 'test'`], ['test1970-01-01', `(string) 'test1970-01-01'`],
				['1970-01-01T', `(string) '1970-01-01T'`], ['1970-01-01T0:0', `(string) '1970-01-01T0:0'`],
				['1970-01-01T1:00', `(string) '1970-01-01T1:00'`], ['1970-01-01T01:00:', `(string) '1970-01-01T01:00:'`],
				['1970-01-01T01:00:0', `(string) '1970-01-01T01:00:0'`], ['1970-01-01T01:00:00:', `(string) '1970-01-01T01:00:00:'`],

				[NaN, `NaN`], [Infinity, `Infinity`], [-Infinity, `-Infinity`],
				[Number.MAX_SAFE_INTEGER, `(number) ${Number.MAX_SAFE_INTEGER}`],
				[Number.MIN_SAFE_INTEGER, `(number) ${Number.MIN_SAFE_INTEGER}`],

				[{}, `(object) {}`], [{toString: () => (new Date()).toISOString()}, `(object) {toString: () => (new Date()).toISOString()}`],
				[[], `(array) []`], [[0], `(array) [0]`], [[(new Date()).toISOString()], `(array) [(new Date()).toISOString()]`],
				[() => {}, `(function) () => {}`], [() => (new Date()).toISOString(), `(function) () => (new Date()).toISOString()`],

				[false, `(bool) false`], [true, `(bool) true`],
				[undefined, `undefined`], [null, `null`]
			]
		};
	}

	describe('Test "date" library', () => {
		describe('checking "is" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.date.is, 'function "is" is not added or is not a function');
			});

			let params = getParams();

			it('call with a date parameters', () => {
				for(let p in params.date) {
					assert.isTrue(helpLib.date.is(params.date[p][0]), `result with "${params.date[p][1]}" parameter is incorrect`);
				}
			});

			it('call with not a date parameters', () => {
				let notDateParams = params.strDate.concat(params.numDate, params.invDate, params.noDate);
				for(let p in notDateParams) {
					assert.isFalse(helpLib.date.is(notDateParams[p][0]), `result with "${notDateParams[p][1]}" parameter is incorrect`);
				}
			});
		});

		describe('checking "check" function', () => {
			it('function instance', () => {
				assert.isFunction(helpLib.date.check, 'function "check" is not added or is not a function');
			});

			let params = getParams();

			it('call with a values who can convert to correct date as "date" parameter', () => {
				for(let p in params.date) {
					assert.strictEqual(helpLib.date.check(params.date[p][0]), params.date[p][0],
						`result with "${params.date[p][1]}" parameter is incorrect`);
				}

				let toDateParams = params.strDate.concat(params.numDate);
				for(let p in toDateParams) {
					let res = helpLib.date.check(toDateParams[p][0]);

					assert.instanceOf(res, Date, `result with "${toDateParams[p][1]}" parameter is not a object of Date class`);
					assert.isAtLeast(res.getTime(), toDateParams[p][2],
						`the timestamp of result with "${toDateParams[p][1]}" parameter is incorrect`);
					assert.isAtMost(res.getTime(), toDateParams[p][3],
						`the timestamp of result with "${toDateParams[p][1]}" parameter is incorrect`);
				}
			});

			it('call with a values who can convert to correct date as "date" parameter and some "defValue" parameter', () => {
				for(let p in params.date) {
					assert.strictEqual(helpLib.date.check(params.date[p][0], null), params.date[p][0],
						`result with "${params.date[p][1]}" parameter is incorrect`);
				}

				let toDateParams = params.strDate.concat(params.numDate);
				for(let p in toDateParams) {
					let res = helpLib.date.check(toDateParams[p][0], null);

					assert.instanceOf(res, Date, `result with "${toDateParams[p][1]}" parameter is not a object of Date class`);
					assert.isAtLeast(res.getTime(), toDateParams[p][2],
						`the timestamp of result with "${toDateParams[p][1]}" parameter is incorrect`);
					assert.isAtMost(res.getTime(), toDateParams[p][3],
						`the timestamp of result with "${toDateParams[p][1]}" parameter is incorrect`);
				}
			});

			it('call without parameters or with null or undefined values', () => {
				assert.instanceOf(helpLib.date.check(), Date, 'result without parameter is incorrect');

				assert.instanceOf(helpLib.date.check(undefined), Date, 'result with "undefined" parameter is incorrect');
				assert.instanceOf(helpLib.date.check(undefined, undefined), Date,
					'result with "undefined, undefined" parameters is incorrect');

				assert.instanceOf(helpLib.date.check(null), Date, 'result with "null" parameter is incorrect');
				assert.isNull(helpLib.date.check(null, null), 'result with "null, null" parameters is incorrect');
			});

			it('call with a values who can not convert to correct date as "date" parameter', () => {
				for(let p in params.noDate) {
					let time1 = (new Date()).getTime();
					let res = helpLib.date.check(params.noDate[p][0]);
					let time2 = (new Date()).getTime();

					assert.instanceOf(res, Date, `result with "${params.noDate[p][1]}" parameter is not a object of Date class`);
					assert.isAtLeast(res.getTime(), time1, `the timestamp of result with "${params.noDate[p][1]}" parameter is incorrect`);
					assert.isAtMost(res.getTime(), time2, `the timestamp of result with "${params.noDate[p][1]}" parameter is incorrect`);
				}
			});

			it('call with a values who can not convert to correct date as "date" parameter and some "defValue" parameter', () => {
				for(let p in params.noDate) {
					assert.isNull(helpLib.date.check(params.noDate[p][0], null),
						`result with "${params.noDate[p][1]}" parameter is incorrect`);
				}
			});
		});
	});
};