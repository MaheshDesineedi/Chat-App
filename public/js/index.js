var socket = io();

socket.on('connect', function () {
	console.log('Connected to server');

	socket.emit('createMessage', {
		to: 'mike',
		text: 'Hey. Whats up!'
	});
});

socket.on('newMessage', function (msg) {
	console.log('New Message', msg);
});

socket.on('disconnect', function(){
	console.log('Disconnect from the server');
});

