var Pic = require('./picModel.js');

module.exports = {

  allPics: function(req, res) {  // fetches all pics from db
    Pic.find({}, function(err, pics) {
      if (err) {
        console.log(err);
      }
      res.json(pics);
    });
  },

  newPic: function(req, res) {},  // todo: add new pic to db

  removePic: function(req, res) {}  // todo: remove pic from db

};