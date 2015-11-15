# express-typeScript-boilerplate
Bored of writing boilerplate code to setup your express app with TypeScript? Me too! This template provides you everything you need to start developing your app. 

Additionally the template includes WebStorm configuration and gulp build tasks

## Quickstart

- Download the template
- Make sure gulp is installed as global npm dependency. If not, execute `npm install gulp -g` to install it
- Execute `npm install`, this will download all dependencies and compile TypeScript to JavaScript so that the app can be started.
- Run `gulp serve` and open the url localhost:3000 to see your app running

## WebStorm Integration
The template is supposed to be used in conjunction with WebStorm. Automatic compilation of TypeScript into JavaScript and highlighting of TsLint errors is already configured.

It includes two WebStorm run configurations

1. Server - without watch: Starts the app directly from the release folder
2. Server - with watch: Starts the gulp task `gulp serve` to serve the app from the release folder and automatically restart the app after a file has been changed

## Directory Structure

* config - directory to store configuration files. Npm module nconf is used to allow overwriting default values with commandline and environment arguments
* release - directory contains compiled TypeScript files and everything else that is necessary to run the app. The content of this directory should be deployed to the server later on. Directory is ignored in .gitignore.
* typings - *.d.ts files required to get TypeScript support of several node modules. New files can be added using [tsd commandline utility](https://github.com/DefinitelyTyped/tsd). I recommend adding those files to source control.
* app.ts - Start file of the express app
* gulpfile.js - gulp file containing all tasks necessary to start the app
* package.json - normal package.json file
* README.md - readme file
* tsconfig.json - configuration for TypeScript compiler
* tsd.json - configuration file for tsd commandline utility
* tslint.json - TsLint config, used for highlighting in WebStorm as well as checking in gulp task ts:lint