require('dotenv').config()

const mongoose = require('./config/mongoose');
const express = require('./config/express');
const passport = require('./config/passport');

const db = mongoose();
const app = express();
const passprt = passport();

app.listen(process.env.PORT || 3123);

console.log(`Server running at http://localhost:/${process.env.PORT || 3123}`);

module.exports = app;