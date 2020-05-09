var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/assam-cares", { useNewUrlParser: true, useUnifiedTopology : true }, function(err) {
    if (!err) {
        console.log("Success Connected");
    } else {
        console.log("Error connecting to database.");
    }
});

var Migrant = require("./migrant.model");
