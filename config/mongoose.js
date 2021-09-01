var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    // Remove the warning with Promise
    mongoose.Promise = global.Promise;
    
    // If debug run the mongoose debug options
    mongoose.set('debug', process.env.MONGOOSE_DEBUG);
    
    // Connect the db with the url provide
    try {
        var db = mongoose.connect(config.db);
    } catch (err) {
        var db = mongoose.createConnection(config.db);
    }
    
    mongoose.connection
      .once('open', () => console.log('MongoDB Running'))
      .on('error', e => {
        throw e;
      });

    require('../models/user.models');

    return db;
};