//Import Express
const express = require('express');

//Initializing Server and Port
const server = express();
const PORT = 8080;

//Server Setup
server.set('views', './source/views');
server.set('view engine', 'ejs');

server.use(express.static('./source/public'));
server.use(express.urlencoded({ extended: true }));

//Route Imports
let homepage = require('./source/routes/index.js');

//Using Route Imports
server.use('/', homepage);

//Server Listening to Requests!!!
server.listen(PORT, () => {
	console.log(`*** Server is running on: localhost:${PORT} ***`);
});
