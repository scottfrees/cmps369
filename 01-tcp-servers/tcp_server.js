const net = require('net');
console.log('Echo server is running\r\n');

// this function gets called each time a client
// socket connects to the server.
const on_socket_connect = function(socket) {
  // just echo the same data bas to the client.
  socket.on('data', function(data) {
    console.log("Node.js Server - Responding to client -> " + data);
    socket.write(data);
  });
}

// When creating a server, you give it a function to 
// call whenever a client connects...
const server = net.createServer(on_socket_connect);

server.listen(3000, 'localhost');
