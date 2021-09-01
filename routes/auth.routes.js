import { Router } from 'express';
import validate from 'express-validation';
import * as AuthController from '../controllers/auth.controller';
import { authLocal } from '../middlewares/auth';
 
const routes = new Router();

routes.post(
    '/signup',
    validate(AuthController.validation.create),
    AuthController.create,
);
routes.post(
    '/login',
    validate(AuthController.validation.login),
    authLocal,
    AuthController.login,
);

export default routes;