const mongoose = require('mongoose');

module.exports = function() {
    // Remove the warning with Promise
    mongoose.Promise = global.Promise;
    
    // If debug run the mongoose debug options
    mongoose.set('debug', process.env.MONGOOSE_DEBUG);
    
    // Connect the db with the url provide
    try {
        var db = mongoose.connect(process.env.DB_URL);
    } catch (err) {
        var db = mongoose.createConnection(process.env.DB_URL);
    }
    
    mongoose.connection
      .once('open', () => console.log('MongoDB Running'))
      .on('error', e => {
        throw e;
      });

    require('../models/user.model');

    return db;
};