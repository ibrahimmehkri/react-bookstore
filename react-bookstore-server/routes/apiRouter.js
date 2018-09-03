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

  /*

  */



  router.post("/createaccount", function(request,response){
    //find if email is already registerd.
    //if it doesnt exist add epost and pw to database
    let epost = request.body.epost;
    //Accepting numbers as strings
    let pw = request.body.pw.toString();

    if(epost !== undefined && pw !== undefined){

          db.collection("members").find({ epost: epost }).toArray((error,result)=>{
            if(error){
              return response.status(500).send(error);
            }

            if(result.length === 0){
              //not found, now add to database:
              db.collection("members").insertOne({
                "epost": epost,
                "pw": pw
              }, function(error, result){
                if(error){
                  response.status(500).send({"error": error});
                }
                response.send({"success": "Your account have been successfully created"});
              })
            } else {
              response.status(500).send({"error": "Account already exists"})
            }
             })
    } else {
      response.status(500).send({"error": "input required!"})
    }

  })

  router.post("/login", function(request,response){
    let epost = request.body.epost;
    let pw = request.body.pw;

    if(epost !== undefined && pw !== undefined){

          db.collection("members").find({ $and: [{ epost: { $regex: epost } }, { pw: { $regex: pw } }] }).toArray((error,result)=>{
            if(error){
              response.status(500).send(error);
            }

            if(result.length === 0){
              response.send({"error": "Username or password incorrect!"});
            } else {
              response.send({"success": "Log in successful"});
            }
             })
    } else {
      response.status(500).send({"error": "input required!"})
    }
  })

  router.get("/search", function(request,response){

    //instantiate RegExp(arg1, arg2); arg1 search parameter and arg2 gmi (matches patterns);
    //var name = Ibrahim, name.includes();  bson Mongodb.

    var searchRegex = new RegExp(request.query.q, "gmi");

    //or, and
    //find({$or: [{field1: {$regex}}, {field2}]})
    db.collection("books").find({$or: [{title: {$regex: searchRegex}}, {author: {$regex: searchRegex}}]}).toArray(function(error, result){
      if(error){
        response.status(500).send(error);
        return;
      }
      response.send(result);
    })
  })

  router.get("/books", function(request,response){
    db.collection("books").find({}).toArray(function(error,result){
      if(error){
        response.status(500).send(error);
        return;
      }
      response.send(result);
    })
  })

    router.get("/books/:isbn", function(request,response){
      console.log(request.params);
    db.collection("books").find({"ISBN": parseInt(request.params.isbn)}).toArray(function(error,result){
      if(error){
        response.status(500).send(error);
        return;
      }
      response.send(result);
    })
  })

  module.exports = router;
