var express = require("express");
var app = express();
var indexRouter = require("./routes/indexRouter.js");
var bodyParser = require("body-parser");
var apiRouter = require("./routes/apiRouter.js");

app.use(bodyParser.json());
app.use("/", indexRouter);
app.use("/api", apiRouter);

app.use(express.static(__dirname + "/public"));

app.listen(3000, function(request, response){
  console.log("server is running")
})
