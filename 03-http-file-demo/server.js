/***************************************************
Node.js has a number of excellent modules built in.  
Here we build on the http module by including:
 - url - helps us parse URLS
 - path - for building an working with file paths
 - fs - for working with the file system
****************************************************/
var http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');

/***************************************************
Based on the file extension, we'll serve the 
appropriate mime type.  This isn't a perfect way
of doing things - but its good enough for now
****************************************************/
var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css", 
    "mp4": "video/mp4", 
    "ogv": "video/ogv"
  };

// As before, we create an http server
http.createServer(function(req, res) {
  // we get just the path part of the URL
  var uri = url.parse(req.url).pathname;
  console.log("Requested path = " + uri);
  // join the path with the current working directory
  // note - if you've taken the unix course, you will start
  // to realize node is very "unixy".
  var filename = path.join(process.cwd(), unescape(uri));
  var stats;

  try {
    stats = fs.lstatSync(filename); // throws if path doesn't exist
  } catch (e) {
    console.log("\tResponse is 404, not found");
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('404 Not Found\n');
    res.end();
    return;
  }


  if (stats.isFile()) {
    // path exists, is a file
    var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
    console.log("\tResponse is 200, serving file");
    res.writeHead(200, {'Content-Type': mimeType} );

    var fileStream = fs.createReadStream(filename);
    // the pipe function is quite powerful - it
    // reads from the file stream and writes to the response
    // until the source stream is emptied.
    fileStream.pipe(res);
  } else if (stats.isDirectory()) {
    // path exists, is a directory
    // we could see if there is an index.html at this location
    // (try this as an exercise).  For now, do nothing... return
    // not found.
    console.log("\tResponse is 404, not found (directory)");
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('404 Not Found\n');
    res.end();
  } 

}).listen(3000);