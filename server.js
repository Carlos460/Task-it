//Import Express
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

dotenv.config();
//Initializing Server and Port
const server = express();
const PORT = 8082;

//Connect to DataBase
mongoose.connect(
	process.env.YOUR_DB_KEY,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => console.log('*** Connected with DataBase!!! ***')
);

//Server Setup
server.set('views', './source/views');
server.set('view engine', 'ejs');

server.use(cookieParser());
server.use(express.json());
server.use(express.static('./source/public'));
server.use(express.urlencoded({ extended: true }));

//Route Imports
let homeRoute = require('./source/routes/index.js');
let authRoute = require('./source/routes/api/user.js');
let profileRoute = require('./source/routes/profile');

//Using Route Imports
server.use('/', homeRoute);
server.use('/profile', profileRoute);
server.use('/api/user', authRoute);

//Server Listening to Requests!!!
server.listen(PORT, () => {
	console.log(`*** Server is running on: localhost:${PORT} ***`);
});
