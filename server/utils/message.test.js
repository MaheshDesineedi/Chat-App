var expect = require('expect');

var {generateMessage} = require('./message.js');

describe('generateMessage', () => {
	it('should generate correct Message object', () => {
		var res = generateMessage('Admin','Hey Whats up');

		// expect(res.from).toBe('Admin');
		// expect(res.text).toBe('Hey Whats up');
		expect(res).toMatchObject({
			from: 'Admin',
			text: 'Hey Whats up'
		});
		expect(typeof res.createdAt).toBe('number');
	});
});