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

app.use(cors());
app.use(bodyParser.json()); // whenever we hit any request we goona run the bodyParser
// ne zaman "/posts" route una gidersen postsRoute u invoke la
app.use("/templates", templatesRoute);
app.use("/mail", mapRoute);

//ROUTES
app.get("/", (req, res) => {
  res.send("WELCOME TO DB - GL NECATİ ");
});

// conect to db
mongoose.connect(
  "mongodb+srv://Slayzen:biohazard@cluster-mq9jx.mongodb.net/test?retryWrites=true&w=majority", //mangodan gelend id icinde acc ve pass var
  { useNewUrlParser: true, useUnifiedTopology: true }, // mangonun istedigigi bir prop
  () => {
    console.log("connected to db");
    console.log("ready.."); // callback function baglandıgımızı görnek icin
  }
);
//this is how we listen the server
app.listen(3003);
