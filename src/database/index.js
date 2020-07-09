const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/servererror2', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

mongoose.Promise = global.Promise;

module.exports = mongoose;