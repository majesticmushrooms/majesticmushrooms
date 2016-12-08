var express = require('express');
var mongoose = require('mongoose');
var Pic = require('./picModel.js');

// exports functions for use in routes.js
module.exports = {

  // fetches all pics from db
  allPics: function(req, res) {  
    Pic.find({}, function(err, pics) {
      if (err) {
        console.log(err);
      }
      res.json(pics);
    });
  },

  // adds pic to db
  addPic: function(req, res) {  
    new Pic({  // todo: fill in values
      // url:  
      // longitude: 
      // latitude: 
      // searchTerm:  
    })
    .save()
    .then(function() {
      console.log('saved pic in db');
    });

  },

  // removes pic without waiting for a response from db
  removePic: function(req, res) {
    Pic.remove({ /* url: insert_value_here */ }).exec();  // todo: fill in condition
  }

};