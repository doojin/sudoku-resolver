var mongoose = require('mongoose');
var credentials = require('../credentials');

mongoose.connect(credentials.MONGO_URL);

module.exports = mongoose;
