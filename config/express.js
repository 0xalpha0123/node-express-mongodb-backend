var config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override')
    passport = require('passport'),
    helmet = require('helmet'),
    cors = require('cors'),
    ApiRoutes = require('./routes');

module.exports = function () {
    var app = express();

    if (process.env.NODE_DEV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_DEV === 'production') {
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(helmet());
    app.use(cors());

    app.use('/api', ApiRoutes);

    // require('../app/routes/index.routes.js') (app);
    // require('../app/routes/users.routes.js') (app);

    app.use(express.static('./public'));

    return app;
}