const mongoose = require("mongoose")
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const podetailSchema = new Schema({
    ORDER_NO: String,
    SEQNO:Number,
    DN:String,
    G_NAME:String,
    G_MODEL:String,
    G_QTY:Number,
    PN:String,
    G_QTY_QR:Number,
    ORDER_TIME:String,
    WAREHOUSE:Number
},{ collection: 'decl_po_dtl'});

var podetailModel = mongoose.model('decl_po_dtl', podetailSchema);
module.exports = podetailModel;