var expect = require('expect');

var {Users} = require('./users.js');

var users;

beforeEach(() => {
	users = new Users();
	users.users = [{
		id: '1',
		name: 'Mahesh',
		room: 'Node course'
	}, {
		id: '2',
		name: 'Andrew Ng',
		room: 'Machine learnig'
	}, {
		id: '3',
		name: 'Jen',
		room: 'Node course'
	}];
});

describe('addUser', () => {
	it('should add user ', () => {
		var users = new Users();
		var user = {
			id: '123dsde232',
			name: 'Mahesh',
			room: 'India'
		};
		var reUser = users.addUser(user.id,user.name,user.room);
		expect(users.users).toMatchObject([user]);
	});

	it('should return names in Node course', () => {
		var names = users.getUserList('Node course');
		expect(names).toEqual(['Mahesh', 'Jen']);
	});

	it('should return names in Machine learnig', () => {
		var names = users.getUserList('Machine learnig');
		expect(names).toEqual(['Andrew Ng']);
	});

	it('should remove user', () => {
		var name = users.removeUser('3');

		expect(name.name).toBe('Jen');
		expect(users.users.length).toBe(2);
	});

	it('should not remove user', () => {
		var name = users.removeUser('4');

		expect(name).toBe(undefined);
		expect(users.users.length).toBe(3);
	});

	it('should find user', () => {
		var user = users.getUser('3');

		expect(user.id).toBe('3');
	});

	it('should not find user', () => {
		var user = users.getUser('4');

		expect(user).toBe(undefined);
	});
});