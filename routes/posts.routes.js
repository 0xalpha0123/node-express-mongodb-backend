/**
 * Post Routes
 */

 import { Router } from 'express';
 import validate from 'express-validation';
 
 import * as PostsController from '../controllers/posts.controller';
 import { authJwt } from '../middlewares/auth';
 
 const routes = new Router();
 
 /**
  * CRUD
  */
 routes.get('/', authJwt, PostsController.getList);
 routes.get('/:id', authJwt, PostsController.getById);
 routes.post(
   '/',
   authJwt,
   validate(PostsController.validation.create),
   PostsController.create,
 );
 routes.patch(
   '/:id',
   authJwt,
   validate(PostsController.validation.update),
   PostsController.updatePost,
 );
 
 routes.delete('/:id', authJwt, PostsController.deletePost);
 
 /**
  * Favorites
  */
 routes.post('/:id/favorite', authJwt, PostsController.favoritePost);
 
 export default routes;
 