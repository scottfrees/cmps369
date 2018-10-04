/* 
-----------------------------------------------------------------------------------

	IMPORTANT
	===========
	Before running this program, you need to install the "connect"
	package into this directory.

	From the command line, while in the same directory as this file, 
	type "npm install".

	Then to run, just type "node server.js"

----------------------------------------------------------------------------------- 
*/



const connect = require("connect");
const logger = require("morgan");
const http = require("http");

const app = connect()
	.use(logger('dev'))
	.use((req, res) => {
		res.end("This is just plain text");
	})

http.createServer(app).listen(8080);
