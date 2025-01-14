//including 'http' module 
const http = require('http');

//array of routes
const routes = [{
	status_code: 404,
	callback: (req, res) => {
		res.writeHead(404, {'Content-Type': 'text/plain'});
		res.end('page not found');
	}
}];

//adds routes to 'routes' array
function routes_assigner(route, path, callback) {
	route.unshift({
		path,
		callback
	});
}

//returns 'route' object in 'handler' function
function route_object_returner(route, url) {
	for(const element of route) {
		if(element.path === url) return element;
	}
	return route[route.length -1];
}

//this is a pre-model function for get()
function get(url, callback) {
	routes_assigner(routes, url, callback);
}

//brings res obj to this scope
let response_obj;

function export_res(res) {
	response_obj = res;
}

//express send function
function send(data, res = response_obj) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end(data);
}

//express json function
function json(data, res = response_obj) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(JSON.stringify(data));
}

//res related express functions
const response_functions = {
	send,
	json
}

//returns response related express function
function resp(res) {
	for(let key in response_functions) {
		res[key] = response_functions[key];
	}
	return res;
}

//the handler function
let handler = (req, res) => {
	const route = route_object_returner(routes, req.url);
	const response = resp(res);
	export_res(res);

	route.callback(req, response);
}

//server object being instantiated
const server = http.createServer(handler);

//function which listens to the server
function listen(port, callback = () => {}) {
	server.listen(port, callback());
}

//object for express() instantiation function
const express_functions = {
	get,
	listen
}

//typical express app instantionator
function express() {
	return express_functions;
}

module.exports = {
	express
}
