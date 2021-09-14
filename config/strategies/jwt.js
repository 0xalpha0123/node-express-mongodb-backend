const passport = require('passport');
const User = require('mongoose').model('User');

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

/**
 * JWT Strategy Auth
 */
const jwtOpts = {
    // Telling Passport to check authorization headers for JWT
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // Telling Passport where to find the secret
    secretOrKey: process.env.JWT_SECRET,
};

module.exports = function() {
    passport.use(
        'jwt',
        new JWTStrategy(jwtOpts, function(payload, done){
        User.findById(payload._id).then((user, err) => {
            if (err) {
                return done(err, false);
            }

            if (!user) {
              return done(null, false);
            }

            return done(null, user);
        });
    }));
};