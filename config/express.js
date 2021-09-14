const express = require('express');
const morgan = require('morgan');
const compress = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const helmet = require('helmet');
const cors = require('cors');
const ApiRoutes = require('../routes');
const path = require('path');

module.exports = function () {
    var app = express();

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(helmet());
    app.use(cors());

    app.use(`/${process.env.API}`, ApiRoutes);

    // require('../app/routes/index.routes.js') (app);
    // require('../app/routes/users.routes.js') (app);

    app.use(express.static(path.join(__dirname, "public")));

    return app;
}