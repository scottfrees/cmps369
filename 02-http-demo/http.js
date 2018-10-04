const http = require('http');

http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  const html = "<!doctype html>" +
    "\n<html>" +
    "\n	<head>" +
    "\n		<title>Demo HTTP Server</title>" +
    "\n	</head>" +
    "\n	<body>" +
    "\n		<p>This is an HTML document, and it is awesome....</p>" +
    "\n	</body>" +
    "\n</html>";

  res.end(html);

  // Note we often don't have access to port 80 - which requires 
  // escalated priviledges.  On AWS, public traffic to port 80
  // is forwarded to port 8080 - so that's where this app lives.
}).listen(8080, '127.0.0.1');


console.log('Server running at http://127.0.0.1:8080/');
