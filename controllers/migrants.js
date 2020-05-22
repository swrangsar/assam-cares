const express = require("express");
const mongoose = require("mongoose");
const constants = require("../constant");
const path = require("path");

const router = express.Router();
const MigrantModel = mongoose.model("Migrant");
const fs = require('fs');


router.get("/list", (req, res) => {
//    var migrant = new MigrantModel();
//    migrant.name = "Anil Orang";
//    migrant.refNum = 1;
//    migrant.state = "Kerala";
//    migrant.circle = "Mazbat";
//    migrant.save();

    const pageNum = req.query.pageNum ? parseInt(req.query.pageNum) : 1;
    const docPerPage = req.query.size ? parseInt(req.query.size) : 10;

    MigrantModel.estimatedDocumentCount({}, (err, totalDocs) => {
        if (err) {
	    res.send("Error: counting db");
	} else {
            MigrantModel.find({})
	        .skip((docPerPage * pageNum) - docPerPage)
		.limit(docPerPage)
		.lean().exec((err, docs) => {
                if (!err) {
        	    res.render("list", {
		        data : docs,
			totalMigrants : totalDocs,
			currentPage : pageNum,
			pages : Math.ceil(totalDocs / docPerPage)
			});
        	} else {
        	    res.send("Error: find db")
        	}
            });
	}
    });

});

router.get("/list/:circle", (req, res) => {
    var circle = req.params.circle;

    MigrantModel.find({"circle" : circle}).lean().exec((err, docs) => {
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


router.get("/", (req, res) => {
	res.render("migrant", {
	    circles : constants.CIRCLES 
	});
});

router.get("/add", (req, res) => {
    res.render("add-migrant", {
        circles : constants.CIRCLES,
	states : constants.STATES
	});
});

router.post("/add", (req, res) => {
    var migrant = new MigrantModel();
    migrant.refNum = req.body.refNum;
    migrant.name = req.body.name;
    migrant.address = req.body.address;
    migrant.state = req.body.state;
    migrant.district = req.body.district;
    migrant.phoneNum = req.body.phoneNum;
    migrant.gender = req.body.gender;
    migrant.verification = req.body.verification;
    migrant.circle = req.body.circle;

    migrant.save((err, doc) => {
        if (!err) {
	    res.redirect("/migrant/list")
	} else {
	    console.log(err);
	    res.send("Error Occured");
	}
    });
});

router.get("/get-districts/:state", (req, res) => {
    const state = req.params.state;
    fs.readFile(path.join(__dirname, '../public/data/states-and-districts.json'),
        'utf-8', (err, data) => {
        if (err) throw err;

	var jsonData = JSON.parse(data);
	
	if (state in jsonData) {
	    const districtData = jsonData[state];
//	    console.log(JSON.stringify(districtData));
	    res.json(districtData);
	} else {
	    console.log("state ", state, " not in json data");
	}
    });
});

module.exports = router;
