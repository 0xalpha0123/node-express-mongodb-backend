 const AuthRoutes = require('./auth.routes');
 const express = require('express');
 const router = express.Router();
 
 router.use('/auth', AuthRoutes);
 
 module.exports = router;