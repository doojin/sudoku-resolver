var mongo = require('../lib/mongo');

var recordSchema = mongo.Schema({
    order: Number,
    date: {type: Date, default: Date.now},
    ip: String,
    time: String,
    matrix: [],
    marked: []
});

var record = mongo.model('Record', recordSchema);

// Saving with id and current date
record.prototype.create = function() {
    var _self = this;
    record.count(null, function(err, count) {
        if (err) {
            console.log(err);
        }
        _self.order = count;
        _self.date = Date.now(),
        _self.save();
    });
};

// Getting last records from database
record.prototype.getLastRecords = function(count, callback) {
    record.find().sort('-order').limit(count).exec(function(err, records) {
        if (err) {
            console.log(err);
        }
        callback(records);
    });
};

module.exports = record;
