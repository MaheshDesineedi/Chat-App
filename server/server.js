const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validate.js');
const {Users} = require('./utils/users.js');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected');

	socket.on('join', (params, callback) => {
		if(!isRealString(params.name) || !isRealString(params.room)) {
			return callback('Error in Display name or Room name');
		} 

		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);
		io.to(params.room).emit('updateUserList', users.getUserList(params.room));

		socket.emit('newMessage', generateMessage('Admin', `Welcome ${params.name}. Happy chatting !`));
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} has joined`));

		callback();
	});

	socket.on('createMessage', (msg, callback) => {
		var user = users.getUser(socket.id);

		if(user && isRealString(msg.text)) {
			io.to(user.room).emit('newMessage', generateMessage(user.name,msg.text));
		}

		callback();	//Acknowledgement
	});

	socket.on('createLocationMessage', (coords) => {
		var user = users.getUser(socket.id);

		if(user) {
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude,coords.longitude));
		}

	});

	socket.on('disconnect', () => {
		var user = users.removeUser(socket.id);

		if(user) {
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
		}
		
	});
});

server.listen(port, () => {
	console.log(`Starting up on port ${port}`);
});

