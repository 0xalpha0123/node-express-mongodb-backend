var auth = require('../controllers/auth.controller'),
    passport = require('passport');

module.exports = function(app) {
    app.route('/signup')
        .post(users.signup);
    
    app.route('/signin')
        .post(passport.authenticate('local'));
}