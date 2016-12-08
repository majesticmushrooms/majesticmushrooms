var mongoose = require('mongoose');

// open a connection to the pics database
mongoose.connect('mongodb://127.0.0.1:27017/pics');  // todo: change to heroku ip

// get notified if we connect successfully or if a connection error occurs
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'pics db connection error: '));
db.once('open', function() {
  console.log('connected to pics db');
});

// create PicSchema
var PicSchema = mongoose.Schema({
  url: String,
  longitude: String,
  latitude: String,
  searchTerm: String
});

// compile PicSchema into a model
var Pic = mongoose.model('Pic', PicSchema);

module.exports = mongoose.model('Pic', PicSchema);