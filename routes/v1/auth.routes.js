const router = require('express').Router();
const AuthController = require('../../controllers/auth.controller');
const auth = require('../../middlewares/auth');

router.post('/register',
    auth.authRegister,
    AuthController.register);

router.post('/login',
    auth.authLogin,
    AuthController.login);

router.post('/token',
    auth.authJWT,
    AuthController.tokenLogin);

module.exports = router;