
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/DC');

exports.mongoose = mongoose;