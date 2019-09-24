const express = require("express"); //imported the package
const mongoose = require("mongoose"); // thats how you import things
const app = express(); //executed the package
const bodyParser = require("body-parser");
const cors = require("cors");
// import ROUTES
const templatesRoute = require("./routes/templates");
const mapRoute = require("./routes/mail");
//Middlewares - function that executes when we hit a route
// whenever we go to the route this middleware goona run
//app.use --> middlawares

app.use(cors()); //
app.use(bodyParser.json()); // whenever we hit any request we goona run the bodyParser

// crud on templates
app.use("/templates", templatesRoute);
// send mail
app.use("/mail", mapRoute);
// gathering default templates

//ROUTES
app.get("/", (req, res) => {
  res.send("nice and running ..");
});

// connection to mangoDB

mongoose.connect(
  //"mongodb+srv://Slayzen:biohazard@cluster-mq9jx.mongodb.net/test?retryWrites=true&w=majority", //mangodan gelend id icinde acc ve pass var
  "mongodb://mongo:27017/docker-node-mongo",
  { useNewUrlParser: true, useUnifiedTopology: true }, // mangonun istedigigi bir prop
  () => {
    console.log("connected to new db");
    console.log("ready.."); // callback function baglandıgımızı görnek icin
  }
);
//listen port - 300X
app.listen(3003);
