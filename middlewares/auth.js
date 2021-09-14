const passport = require('passport');


exports.authRegister = (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
        if (err) {
            console.log('err:', err);
            res.status(500).send({message: 'server error'});
        }
        if (info) {
            res.status(401).send({message: info.message});
        } else {
            req.login(user, err => {
                next();
            })
        }
    })(req, res, next);
};

exports.authLogin = (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        if (err) {
            console.log('err:', err);
            res.status(500).send({message: 'server error'});
        }
        if (info) {
            res.status(401).send({message: info.message});
        } else {
            req.login(user, err => {
                next();
            })
        }
    })(req, res, next);
};

exports.authJWT = (req, res, next) => {
    passport.authenticate('jwt', {session: false},  (err, user, info) => {
        if (err) {
            console.log('err:', err);
            res.status(500).send({message: 'server error'});
        }
        if (info) {
            res.status(401).send({message: info.message});
        } else {
            next(user);
        }
    })(req, res, next);
};