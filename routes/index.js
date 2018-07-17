var express = require("express");
var router = express.Router();
var OIModel = require("../models/decl_po");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", {
        title: "E-commerce"
    });
});

router.get("/(:warehouse)?/(:type)?/orderInfor", function (req, res) { 
    console.log('req.query: ', req.query);
    let warehouse = req.query.warehouse;
    let type = req.query.type;
    console.log('warehouse: ', warehouse);
    OIModel.find({
        warehouse:warehouse,
        type:type
    }, function (err, data) {
        if (err) console.log(err);
        else {
            res.json(data);
        }
    });

});
router.get("/orderInfor", function (req, res) {
    console.log('req.query: ', req.query);
    OIModel.find({}, function (err, data) {
        if (err) console.log(err);
        else {
            res.json(data);
        }
    });
});

module.exports = router;