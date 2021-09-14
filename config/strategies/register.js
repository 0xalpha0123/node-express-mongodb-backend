const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('User');

module.exports = function() {
    passport.use(
        'register',
        new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }, (username, password, done) => {
            User.findOne({
                username: username
            }, (err, user) => {
                if (err) {
                    return done(err);
                }

                if (user) {
                    return done(null, false, {
                        message: 'username already taken',
                    });
                }

                User.create({email: username, password})
                .then(user => {
                    return done(null, user);
                });
            });
    }));
};