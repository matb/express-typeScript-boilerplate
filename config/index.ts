'use strict';

import nconf = require('nconf');

var configFile = __dirname + '/config.json';
console.log('Using base configuration file ' + configFile);
nconf.argv()
    .env()
    .file({file: configFile});

module.exports = nconf;