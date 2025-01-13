const  { route } = require('./express');

route('/', 200, 'text/plain', 'hello world');
