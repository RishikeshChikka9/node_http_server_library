const server = require('./express');

const app = server();

app.get('/', (req, res) => {
	res.send("hello world");
});

app.get('/data', (req, res) => {
	res.json({
		name: "Rishikesh",
		age: 20,
		major: true
	});
});

app.listen(80, () => console.log("The server is running"));
