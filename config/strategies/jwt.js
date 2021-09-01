var passport = require('passport'),
    User = require('mongoose').model('User');

import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';


/**
 * JWT Strategy Auth
 */
const jwtOpts = {
    // Telling Passport to check authorization headers for JWT
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    // Telling Passport where to find the secret
    secretOrKey: constants.JWT_SECRET,
};

module.exports = function() {
    passport.use(new JWTStrategy(jwtOpts, function(payload, done){
        User.findById(payload._id , function(err, user) {
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