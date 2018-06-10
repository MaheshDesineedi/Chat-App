var expect = require('expect');

var {isRealString} = require('./validate.js');

describe('isRealString', () => {
	it('should not accept non-string values', () => {
		var test = 1233;
		var res = isRealString(test);
		expect(res).toBe(false);
	});

	it('should not accept empty values', () => {
		var test = '   ';
		var res = isRealString(test);
		expect(res).toBe(false);
	});

	it('should accept string values', () => {
		var test = '      234';
		var res = isRealString(test);
		expect(res).toBe(true);
	});
});