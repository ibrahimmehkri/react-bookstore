var express = require("express");
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;


var db;

MongoClient.connect('mongodb://localhost:27017', function(error, client) {
    if (error) {
      console.error('Failed to connect to the database!');
      console.log(error);
    } else {

      console.log('Successfully connected to the database!');
      db = client.db('books');
    }
  });

module.exports = router;
