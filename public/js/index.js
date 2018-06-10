var socket = io();

socket.on('connect', function () {
	console.log('Connected to server');
});

socket.on('newMessage', function (msg) {
	
	var formattedTime = moment(msg.createdAt).format('h:mm a')

	var li = jQuery('<li></li>');
	li.text(`${msg.from} ${formattedTime}: ${msg.text}`);

	jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(msg) {

	var formattedTime = moment(msg.createdAt).format('h:mm a')

	var li = jQuery('<li></li>');
	var a = jQuery('<a target="_blank">My current Location</a>');

	li.text(`${msg.from} ${formattedTime}: `);
	a.attr('href', msg.url);
	li.append(a);

	jQuery('#messages').append(li);
});

socket.on('disconnect', function(){
	console.log('Disconnect from the server');
});

jQuery('#message-form').on('submit', function(e) {
	e.preventDefault();

	var messageTextBox = jQuery('[name=message]');

	socket.emit('createMessage',{
		from: 'User',
		text: messageTextBox.val()
	}, function () {
		messageTextBox.val('');
	});
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
	if(!navigator.geolocation){
		return alert('Geolocation not supported on your browser');
	}

	locationButton.attr('disabled','disabled').text('Sending location...');

	navigator.geolocation.getCurrentPosition( function(position) {
		locationButton.removeAttr('disabled').text('Send location');
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});

	}, function() {
		locationButton.removeAttr('disabled').text('Send location');
		return alert('Unable to fetch position');
	});
});
