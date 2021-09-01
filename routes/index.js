/**
 * API Routes
 */

 import { Router } from 'express';
 
 import UserRoutes from './user.routes';
 import PostsRoutes from './posts.routes';
 
 const routes = new Router();
 
 routes.use('/users', UserRoutes);
 routes.use('/posts', PostsRoutes);
 
 export default routes;
 