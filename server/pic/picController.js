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
    new Pic({
      url: req.body.url,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      searchTerm: req.body.searchTerm,
      id: req.body.id 
    })
    .save()
    .then(function() {
      console.log('saved pic in db');
    });

  },

  // removes pic without waiting for a response from db
  removePic: function(req, res) {
    Pic.remove({ id: res.body.id }).exec()
    .then(function() {
      console.log('removed pic from db');
    });
  }

};