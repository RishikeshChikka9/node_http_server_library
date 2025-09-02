const http = require('http');

class NewServerResponse extends http.ServerResponse {
	send(data) {
		if(typeof data === "object") {
			this.setHeader("Content-Type", "application/json");
			this.end(JSON.stringify(body));
		} else {
			this.setHeader("Content-Type", "text/plain");
			this.end(data);
		}
		//also set one for html too 
	}

	json(body) {
		this.setHeader("Content-Type", "application/json");
		this.end(JSON.stringify(body));
	}
}

class Server extends http.Server {
	constructor() {
		super({ ServerResponse: NewServerResponse });
		this.routes = new Map();
		this.on('request', (req, res) => this.handle(req, res));
	}

	get(path, handlerFunction) {
		this.routes.set('GET' + path, handlerFunction);
	}

	post(path, handlerFunction) {
		this.routes.set('POST' + path, handlerFunction);
	}

	handle(req, res) {
		const key = req.method + "" + req.url;
		const handlerFunction = this.routes.get(key);

		if (handlerFunction) {
			handlerFunction(req, res);
		} else {
			res.statusCode = 404;
			res.send('Not Found');
		}
	}
}

const server = () => new Server();

module.exports = server;