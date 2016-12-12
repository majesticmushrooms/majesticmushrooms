var express = require('express');
var PicCtrl = require('./../pic/picController.js');


// route clients for get post and delete requests
module.exports = (function() {
  var router = express.Router();

  router.get('/', PicCtrl.allPics);

  router.post('/', PicCtrl.addPic);

  router.delete('/', PicCtrl.removePic);

  return router;
})();
