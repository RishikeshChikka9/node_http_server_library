const http = require('http');

const routes = [{
	status_code: 404,
	content_type: 'text/plain',
	data: "page not found"
}];

function routes_assigner(url, status_code, content_type, data) {
	routes.unshift({
		path: url,
		status_code: status_code,
		content_type: content_type,
		data: data
	});
}

function route_object_returner(route, url) {
	for(const element of route) {
		if(element.path === url) return element;
	}
	return route[route.length -1];
}

routes_assigner('/', 200, 'text/plain', 'hello world');

let handler = (req, res) => {
	const route = route_object_returner(routes, req.url);

	res.writeHead(route.status_code, {'Content-Type': route.content_type});
	res.end(route.data);
}

const server = http.createServer(handler);

server.listen(80, () => console.log('server runnig'));
