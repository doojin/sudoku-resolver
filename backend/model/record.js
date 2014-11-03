var mongo = require('../lib/mongo');

var recordSchema = mongo.Schema({
    order: Number,
    date: {type: Date, default: Date.now},
    matrix: [],
    marked: []
});

var record = mongo.model('Record', recordSchema);

// Saving with id
record.prototype.create = function() {
    var _self = this;
    record.count(null, function(err, count) {
        _self.order = count;
        _self.save();
    });
};

module.exports = record;
