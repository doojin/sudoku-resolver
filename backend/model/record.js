var mongo = require('../lib/mongo');
var helper = require('../lib/helper');
var config = require('../config');

var recordSchema = mongo.Schema({
    order: Number,
    date: {type: Date, default: Date.now},
    ip: String,
    time: String,
    matrix: [],
    marked: []
});

var record = mongo.model('Record', recordSchema);

// Saving with id
record.prototype.create = function() {
    var _self = this;
    record.count(null, function(err, count) {
        _self.order = count;
        _self.date = Date.now(),
        _self.save();
    });
};

// Getting last records from database
record.prototype.getLastRecords = function(count, callback) {
    record.find().sort('-order').limit(count).exec(function(err, records) {
        results = [];
        // Filtering record data
        records.forEach(function(record) {
            var date = record.date;
            var now = Date.now();
            var dateDiff = now - new Date(date);
            var r = {
                order: record.order,
                date: helper.getDate(dateDiff) + ' ago',
                ip: record.ip,
                time: helper.getDate(record.time)
            };
            results.push(r);
        });
        callback(results);
    });
};

module.exports = record;
