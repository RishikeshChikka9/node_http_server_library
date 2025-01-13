const http = require('http');

let handler = (req, res) => {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end("hello world");
}

const server = http.createServer(handler);

server.listen(80, () => console.log('server runnig'));
