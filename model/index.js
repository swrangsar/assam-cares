const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology : true,
    useCreateIndex: true
    }, function(err) {
    if (!err) {
        console.log("Success Connected");
    } else {
        console.log("Error connecting to database.");
    }
});

var Migrant = require("./migrant.model");
