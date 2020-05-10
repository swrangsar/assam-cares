var express = require("express");
var mongoose = require("mongoose");
var constants = require("../constant");
var path = require("path");

var router = express.Router();
var MigrantModel = mongoose.model("Migrant");
const fs = require('fs');

// let districtData = require("../public/data/states.json");

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

router.get("/list/:circle", function(req, res) {
    var circle = req.params.circle;

    MigrantModel.find({"circle" : circle}).lean().exec(function(err, docs) {
        if (!err) {
	    res.render("circle-list", {
	        circle : circle,
		data : docs
	    })
	} else {
	    res.send("Error")
	}
    });
});


router.get("/", function(req, res) {
	res.render("migrant", {
	    circles : constants.CIRCLES 
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

router.get("/get-districts/:state", function(req, res) {
    var state = req.params.state;
    fs.readFile(path.join(__dirname, '../public/data/states-and-districts.json'),
        'utf-8', (err, data) => {
        if (err) throw err;

	var jsonData = JSON.parse(data);
	
	if (state in jsonData) {
	    var districtData = jsonData[state];
//	    console.log(JSON.stringify(districtData));
	    res.json(districtData);
	} else {
	    console.log("state " + state + " not in json data");
	}
    });
});

module.exports = router;
