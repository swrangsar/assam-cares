const express = require("express");
const mongoose = require("mongoose");
const constants = require("../constant");
const path = require("path");

const router = express.Router();
const MigrantModel = mongoose.model("Migrant");
const fs = require('fs');


const getPagination = function (pageNum, pageSize, totalDocs) {
    const numOfPages = Math.ceil(totalDocs / pageSize);
    const nextPage = pageNum < numOfPages ? pageNum + 1 : numOfPages;
    const prevPage = pageNum > 1 ? pageNum - 1 : 1;
    const hasNext = pageNum < numOfPages;
    const hasPrev = pageNum > 1;

    const pagination = {
        currPage: pageNum,
        totalDocs: totalDocs,
        pageSize: pageSize,
        numOfPages: numOfPages,
	nextPage: nextPage,
	prevPage: prevPage,
        hasNext: hasNext,
        hasPrev: hasPrev
    };

    return pagination;
};

router.get("/list", (req, res) => {
    res.redirect("/migrant/list/" + constants.DEFAULT_CIRCLE);
});

router.get("/list/:circle", (req, res) => {
    const circle = req.params.circle;
    const pageNum = req.query.pageNum ? parseInt(req.query.pageNum) : 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;

    var query = {};
    
    if (constants.DEFAULT_CIRCLE !== circle) {
        query.circle = circle;
    }

    MigrantModel.countDocuments(query, (err, totalDocs) => {
        if (err) {
	    res.send("Error: counting db");
	} else {
            MigrantModel.find(query)
	        .skip((pageSize * pageNum) - pageSize)
		.limit(pageSize)
	        .lean().exec((err, docs) => {
                if (!err) {
		    const pagination = getPagination(pageNum, pageSize, totalDocs);
		    const title = circle + " circle";

        	    res.render("list", {
        	        circle : circle,
        		data : docs,
			totalMigrants : totalDocs,
			pagination : pagination,
			title: title
        	    });
        	} else {
        	    res.send("Error: find circle db")
        	}
            });
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
