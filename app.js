// var mongoose = require("mongoose");
var express = require("express");

var path = require("path");
var expressHandlebars = require("express-handlebars");
var bodyparser = require("body-parser");

var app = express();
var connection = require("./model");
var MigrantController = require("./controllers/migrants")

app.use(bodyparser.urlencoded({
    extended : true
}));

app.set('views', path.join(__dirname, "/views/"));

app.engine("hbs", expressHandlebars({
    extname: "hbs",
    defaultLayout : "mainlayout",
    layoutDir : __dirname + "views/layouts"
}));

app.set("view engine", "hbs")

app.get("/", function (req, res) {
    // res.send("<h1>Hello World</h1>")
    res.render("index", {});
});

app.use("/migrant", MigrantController)


app.listen("3000", '0.0.0.0', function() {
    console.log("Server started");
});
