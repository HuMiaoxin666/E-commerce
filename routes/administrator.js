var express = require("express");
var router = express.Router();
var OIModel = require("../models/decl_po");
var TestModel = require("../models/test_co");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("administrstor", {
        title: "E-commerce"
    });
});


router.get("/data", function (req, res) {
    //都全选
    OIModel.find({}, function (err, data) {
        if (err) console.log(err);
        else {
            res.send(data);
        }
    });
});

module.exports = router;