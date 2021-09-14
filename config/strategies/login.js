const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('User');

module.exports = function() {
    passport.use(
        'login',
        new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }, (username, password, done) => {
            User.findOne({
                email: username
            }, (err, user) => {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false, {
                        message: 'invalid username',
                    });
                }

                if (!user.authenticateUser(password)) {
                    return done(null, false, {
                        message: 'invalid password',
                    });
                }

                return done(null, user);
            });
    }));
};




