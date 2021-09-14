const User = require('../models/user.model');
const authCtrl = {};

authCtrl.register = (req, res, next) => {
    const data = {
        name: req.body.name,
        username: req.body.username,
        email: req.user.email,
    };
    User.findOne({
        email: data.email
    })
    .then(user => {
        user.updateOne(data)
        .then(user => {
            res.status(200).send(user.toAuthJSON());
        })
    })
}

authCtrl.login = (req, res, next) => {
    User.findOne({
        username: req.user.username
    })
    .then(user => {
        res.status(200).send(user.toAuthJSON());
    })
}

authCtrl.tokenLogin = async (user, req, res, next) => {
    User.findOne({
        username: user.username
    })
    .then(user => {
        res.status(200).send(user.toAuthJSON());
    })
};

module.exports = authCtrl;