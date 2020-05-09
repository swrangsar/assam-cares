var express = require("express");
var mongoose = require("mongoose");
var constants = require("../constant");

var router = express.Router();
var MigrantModel = mongoose.model("Migrant");


router.get("/list", function(req, res) {
//    var migrant = new MigrantModel();
//    migrant.name = "Anil Orang";
//    migrant.refNum = 1;
//    migrant.state = "Kerala";
//    migrant.circle = "Mazbat";
//    migrant.save();

//    MigrantModel.find(function(err, docs) {
//        if (!err) {
//	    res.render("list", { data : docs })
//	} else {
//	    res.send("Error")
//	}
//    });

    MigrantModel.find({}).lean().exec(function(err, docs) {
        if (!err) {
	    res.render("list", { data : docs })
	} else {
	    res.send("Error")
	}
    });
});

router.get("/add", function(req, res) {
    res.render("add-migrant", {
        circles : constants.CIRCLES,
	states : constants.STATES
	});
});

router.post("/add", function(req, res) {
    var migrant = new MigrantModel();
    migrant.name = req.body.name;
    migrant.refNum = req.body.refNum;
    migrant.state = req.body.state;
    migrant.circle = req.body.circle;

    migrant.save(function(err, doc) {
        if (!err) {
	    res.redirect("/migrant/list")
	} else {
	    res.send("Error Occured");
	}
    });
});

module.exports = router;
