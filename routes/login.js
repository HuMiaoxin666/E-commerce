var express = require("express");
var router = express.Router();
var OIModel = require("../models/decl_po");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("login", {
        title: "E-commerce"
    });
});



module.exports = router;