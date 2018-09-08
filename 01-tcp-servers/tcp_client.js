var net = require('net');
var host = 'localhost';
var port = 3000;

/*  This just sets up node to read some lines from the console */
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Please type messages:  ");
rl.on('line', function (text) {
	/* On each line entered, send the text to the server via
	   a new socket and print out the response.

	   Alternatively, we could keep one socket the entire time...
	*/
  	var client = new net.Socket();
	client.connect(port, host, function() {
    	client.write(text);
	});

	client.on('data', function(data) {
	    console.log('Server Response: ' + data);
	    client.destroy();
	});
});




