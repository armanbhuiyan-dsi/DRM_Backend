/**
 * Created by Arman on 10/21/2016.
 */
'use strict';

var express = require('express')
    ,path = require('path')
    ,logger = require('morgan')
    ,bodyParser = require('body-parser')
    ,mysqlConnector = require('./helpers/mysqlConnector')
    ,responseModifier = require('./middlewares/responseModifier')
    ,config = require('./config');


var app = express();
var env = app.get('env') == 'development' ? 'local' : app.get('env');

config = config(env);
mysqlConnector.connect(config.mysql);

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};

require('./helpers/bootstrap').initApp(
    app
    .use(allowCrossDomain)
    .use(logger('combined'))
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())
    .use(responseModifier), express);

module.exports = app;