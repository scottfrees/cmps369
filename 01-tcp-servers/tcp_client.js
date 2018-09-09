const net = require('net');
const host = 'localhost';
const port = 3000;

/*  This just sets up node to read some lines from the console */
const readline = require('readline');
const ui = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const socket = new net.Socket();

socket.connect(port, host, function() {
	console.log("Please type messages:  ");

	// When user enters line, write it to socket (server)
	ui.on('line', function(text) {
		socket.write(text);
	});

	// When data arrives from server, print it...
	socket.on('data', function(data) {
		console.log('Server Response: ' + data);
	});
});
