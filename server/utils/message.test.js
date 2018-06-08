var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message.js');

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

describe('generateLocationMessage', () => {
	it('should generate correct location object', () => {
		var lat = 1;
		var lng = 1;
		var res = generateLocationMessage('Admin',lat, lng);

		// expect(res.from).toBe('Admin');
		// expect(res.text).toBe('Hey Whats up');
		expect(res).toMatchObject({
			from: 'Admin',
			url: 'https://www.google.com/maps?q=1,1'
		});
		expect(typeof res.createdAt).toBe('number');
	});
});