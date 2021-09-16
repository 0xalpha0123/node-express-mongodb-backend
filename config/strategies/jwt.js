const fs = require('fs');
var INIT_CWD = process.env.INIT_CWD;
const PUBLIC_KEY = fs.readFileSync(INIT_CWD + '/keys/JWT/public.pem', 'utf-8');

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
    secretOrKey: PUBLIC_KEY,
    algorithms: ['RS256']
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