var mongoose = require("mongoose");

var MigrantSchema = new mongoose.Schema({
    name : {
        type: String,
	required: true,
	trim: true
    },
    refNum : {
        type: Number,
	required: true
    },
    state : {
        type: String,
	required: true,
	trim: true
    },
    circle : {
        type: String,
	required: true,
	trim: true
    }
});

mongoose.model("Migrant", MigrantSchema)
