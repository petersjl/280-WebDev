let abcTracker = 0;
let totalTracker = 0;

const http = require('http');

const mainHandler = function (request, response) {

	if(request.url == "/favicon.ico" ) {
		response.writeHead(200, {'Content-Type': 'image/x-con'} );
		response.end();
		return;
	}

	console.log( request.url );

	if(request.url == "/abc") abcTracker++;
	totalTracker++;

	response.statusCode = 200;
	response.setHeader('Content-Type', 'text/html');
	response.write('<!doctype html>\n');
	response.write('<html>\n<head>\n');
	response.write('<title> Dice Roller</title>\n');
	response.write('</head>\n<body>\n');
	response.write('<h1>Hello World!</h1>');
	response.write('<div>abcTracker ='+ abcTracker+'</div>');
	response.write('<div>titalTracker ='+ totalTracker+'</div>');
	response.write('\n</body>\n</html>');
    response.end();
}

const server = http.createServer(mainHandler)
server.listen(3000, (err) => {
	if(err) {
		console.log("Error ", err);
	}
	console.log("Listening on port 3000");
});
