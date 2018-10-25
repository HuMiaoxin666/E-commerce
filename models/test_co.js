var mongoose = require("mongoose")
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const TestSchema = new Schema({
    order_no: String,
    start_date: String,
    start_hour: String,
    warehouse: String,
    type: String,
}, {
    collection: 'test'
});

var TestModel = mongoose.model('test', TestSchema);
module.exports = TestModel;