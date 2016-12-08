var express = require('express');
var mongoose = require('mongoose');

//initialize the express server
var app = express();

//initialize the database
// mongoose.connect('mongodb://localhost/');

//configure our routing in seperate file.
require('./config/routes.js')(app, express);

//host the static files at client
app.use(express.static(__dirname + '/client'));

//start server
app.listen(8000);
console.log('App listening on port 8000');

module.exports = app;
