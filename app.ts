/// <reference path='./typings/tsd.d.ts' />

import http = require('http');
import url = require('url');
import express = require('express');
import bodyParser = require('body-parser');
import errorHandler = require('errorhandler');

var app = express();

// Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3000;

if (env === 'development') {
    app.use(errorHandler());
} else if (env === 'production') {
    // TODO have more senseful error handler
}

app.get('/', function (req:express.Request, res:express.Response) {
    res.json('Hallo6');
});

app.listen(port, function () {
    console.log('Demo Express server listening on port %d in %s mode', port, app.settings.env);
});