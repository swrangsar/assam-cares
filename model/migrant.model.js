var mongoose = require("mongoose");

var MigrantSchema = new mongoose.Schema({
    name : {
        type: String,
	required: true,
	trim: true
    },
    refNum : {
        type: Number,
	required: true,
	unique: true,
	dropDups: true
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
    },
    phoneNum : {
        type: Number,
	required: true
    },
    district : {
        type: String,
        required: true,
	trim: true
    },
    address : {
        type: String,
	trim: true,
        required: true
    },
    gender : {
        type: String,
	trim: true,
	required: true
    },
    verification : {
        type: String,
        required: true,
	trim: true
    }
});

mongoose.model("Migrant", MigrantSchema)
