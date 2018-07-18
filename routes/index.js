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
    //两种都全选时
    if (warehouse == '' && type == '') {
        OIModel.find({}, function (err, data) {
            if (err) console.log(err);
            else {
                res.json(data);
            }
        });
    }
    //只有仓库全选
    else if (warehouse == '' && type != '') {
        OIModel.find({
            type: type,
        }, function (err, data) {
            if (err) console.log(err);
            else {
                res.json(data);
            }
        });
    }
    //只有物品类别全选时
    else if (warehouse != '' && type == '') {
        OIModel.find({
            warehouse: warehouse,
        }, function (err, data) {
            if (err) console.log(err);
            else {
                res.json(data);
            }
        });
    } else {
        OIModel.find({
            warehouse: warehouse,
            type: type,
        }, function (err, data) {
            if (err) console.log(err);
            else {
                res.json(data);
            }
        });
    }

});
router.get("/(:orderNum)?/(:type)?/0/orderInfor", function (req, res) {
    console.log('req.query: ', req.query);
    let orderNum = req.query.orderNum;
    let type = req.query.type;

    console.log('warehouse: ', orderNum);
    if (type != '') {
        OIModel.find({
            order_no: orderNum,
            type: type
        }, function (err, data) {
            if (err) console.log(err);
            else {
                res.json(data);
            }
        });
    } else {
        OIModel.find({
            order_no: orderNum,
        }, function (err, data) {
            if (err) console.log(err);
            else {
                res.json(data);
            }
        });
    }

});
router.get("/(:day)?/(:hour)?/(:warehouse)?/(:type)?/rectClick", function (req, res) {
    console.log('req.query: ', req.query);
    let day = req.query.day;
    let hour = req.query.hour;
    let warehouse = req.query.warehouse;
    let type = req.query.type;

    console.log('warehouse: ', warehouse);
    console.log('type: ', type);
    console.log('hour: ', hour);
    console.log('day: ', day);
    OIModel.find({
        start_date: day,
        start_hour: hour,
        warehouse:warehouse,
        type:type,
    }, function (err, data) {
        if (err) console.log(err);
        else {
            res.json(data);
        }
    });

});

module.exports = router;