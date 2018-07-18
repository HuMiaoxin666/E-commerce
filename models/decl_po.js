const mongoose = require("mongoose")
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const poSchema = new Schema({
    order_no: String,
    start_date: String,
    start_hour: String,
    warehouse: String,
    type: String,
    lng:String,
    lat:String,
}, {
    collection: 'orderInfor'
});

var OIModel = mongoose.model('orderInfor', poSchema);
module.exports = OIModel;