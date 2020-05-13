const express = require("express");
const path = require("path");
const expressHandlebars = require("express-handlebars");
const bodyparser = require("body-parser");

const connection = require("./model");
const MigrantController = require("./controllers/migrants")


const app = express();

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/popper.js/dist')); // redirect JS jQuery

app.use('/data', express.static(__dirname + '/public/data')); // data folder

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


app.listen(3000, '0.0.0.0', function() {
    console.log("Server started");
});
