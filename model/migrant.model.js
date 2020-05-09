var mongoose = require("mongoose");

var MigrantSchema = new mongoose.Schema({
    name : {
        type: String,
	required: "Required"
    },
    refNum : {
        type: Number,
	required: "Required"
    },
    state : {
        type: String,
	required: "Required"
    },
    circle : {
        type: String,
	required: "Required"
    }
});

mongoose.model("Migrant", MigrantSchema)
