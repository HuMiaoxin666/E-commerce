var express = require("express");
var router = express.Router();
var podetailModel = require("../models/decl_po_dtl");
var poModel = require("../models/decl_po");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", {
        title: "E-commerce"
    });
});

router.get("/(:warehouse)?/(:type)?/po_infor", function (req, res) {
    console.log('req.query: ', req.query);
    let warehouse = req.query.warehouse;
    let type = req.query.type;
    console.log('warehouse: ', warehouse);
    poModel.find({
        WAREHOUSE: warehouse,
        CONSIGNEE_PROVINCE:type,
    }, function (err, data) {
        if (err) console.log(err);
        else {
            res.json(data);
        }
    });

});
router.get("/po_infor", function (req, res) {
    console.log('req.query: ', req.query);
    poModel.find({}, function (err, data) {
        if (err) console.log(err);
        else {
            res.json(data);
        }
    });

});
router.get("/po_detail", function (req, res) {
    podetailModel.find({}, function (err, data) {
        if (err) console.log(err);
        else {
            res.json(data);
        }
    });
});
module.exports = router;