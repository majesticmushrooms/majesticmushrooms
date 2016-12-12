var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var routes = require('./config/routes.js');


//initialize the express server
var app = express();

//initialize the database
// mongoose.connect('mongodb://localhost');

//configure our routing in seperate file.

//parse body upon req
app.use(bodyParser.json());

//host the static files at client
app.use(express.static(__dirname + '/../client'));

// require('./config/routes.js')(app, express);
app.use('/', routes);


//start server
app.listen(8000);
console.log('App listening on port 8000');

module.exports = app;
