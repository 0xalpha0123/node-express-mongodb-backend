require('dotenv').config();

// const fs = require('fs');
const http = require('http');
// const https = require('https');
// var INIT_CWD = process.env.INIT_CWD;
// const privateKey  = fs.readFileSync(INIT_CWD + '/keys/SERVER/private.pem', 'utf8')
// const publicKey = fs.readFileSync(INIT_CWD + '/keys/SERVER/public.pem', 'utf8')

// const credentials = {key: privateKey, cert: publicKey};

const mongoose = require('./config/mongoose');
const express = require('./config/express');
const passport = require('./config/passport');

const db = mongoose();
const app = express();
const passprt = passport();


const httpServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);

httpServer.listen(process.env.HTTP_PORT || 3123);
// httpsServer.listen(process.env.HTTPS_PORT || 3333);

console.log(`HTTP Server running at http://localhost:/${process.env.HTTP_PORT || 3123}`);
// console.log(`HTTPS Server running at https://localhost:/${process.env.HTTPS_PORT || 3333}`);

module.exports = app;