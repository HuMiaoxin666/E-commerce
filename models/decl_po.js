const mongoose = require("mongoose")
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const poSchema = new Schema({
    ORDER_NO: String,
    E_COMMERCE_CODE: String,
    TRADE_TIME: String,
    LOGIS_COMPANY_CODE: String,
    ORDER_STATUS: Number,
    WAYBILL_NO: String,
    GROSS_WT: Number,
    EXTEND1: String,
    EXTEND5: String,
    CONSIGNEE_PROVINCE: String,
    CONSIGNEE_CITY: String,
    CONSIGNEE_COUNTRY: String,
    id: String,
    THEORY_WT: Number,  
    WAREHOUSE:String,
    PUSH_TIME: String
}, {
    collection: 'decl_po'
});

var poModel = mongoose.model('decl_po', poSchema);
module.exports = poModel;