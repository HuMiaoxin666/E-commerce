const mongoose = require("mongoose")
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const poSchema = new Schema({
    order_no: String,
    e_com: String,
    start_date: String,
    start_hour: String,
    LgCompany_code: String,
    province: String,
    city: String,
    country: String,
    id: String,
    warehouse: String,
    end_date: String,
    end_hour: String,
    id: String,
    name: String,  
    qty:Number,
    type: String,
    lng:String,
    lat:String,
}, {
    collection: 'orderInfor'
});

var OIModel = mongoose.model('orderInfor', poSchema);
module.exports = OIModel;