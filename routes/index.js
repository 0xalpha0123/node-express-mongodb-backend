/**
 * API Routes
 */
 
const v1Routes = require(`./${process.env.VERSION}`);
const express = require('express');
const router = express.Router();

router.get('/status', (req, res) => { res.send({status: 'OK'}) }) // api status

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/static/index.html');
// })

router.use(`/${process.env.VERSION}`, v1Routes);

module.exports = router;