var net = require('net');
console.log('Echo server is running\r\n');
var server = net.createServer(function (socket) {
  socket.on('data', function(data) {
    outData = data.toString('utf8').toLowerCase();
    console.log("Responding to client -> " + outData);
    socket.write(outData);
    socket.destroy();
  });
  
});

server.listen(3000, 'localhost');