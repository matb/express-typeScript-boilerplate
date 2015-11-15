'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('copy:config', ['clear:config'], function () {
    return gulp.src(['config/config.json'])
        .pipe(gulp.dest('./release/config'));
});

gulp.task('clear:config', function () {
    return gulp.src(['release/config/config.json'], {read: false}) // much faster
        .pipe(plugins.rimraf());
});

gulp.task('copy:package', ['clear:config'], function () {
    return gulp.src(['package.json'])
        .pipe(gulp.dest('./release'));
});

gulp.task('clear:package', function () {
    return gulp.src(['release/package.json'], {read: false}) // much faster
        .pipe(plugins.rimraf());
});

gulp.task('copy:node_modules', ['clear:node_modules'], function () {
    return gulp.src(['node_modules/**/*.*'])
        .pipe(gulp.dest('./release/node_modules'));
});

gulp.task('clear:node_modules', function () {
    return gulp.src(['release/node_modules'], {read: false}) // much faster
        .pipe(plugins.rimraf());
});

gulp.task('copy', ['copy:config', 'copy:node_modules', 'copy:package']);

gulp.task('ts:clear', function () {
    // ignore release/node_modules because it is clears be clear:node_modules
    return gulp.src(['release/**/*.js', 'release/**/*.js.map', '!release/node_modules/**/*.*'], {read: false}) // much faster
        .pipe(plugins.rimraf());
});

var tsProject = plugins.typescript.createProject('tsconfig.json');

gulp.task('ts:lint', function () {
    return tsProject.src().pipe(plugins.tslint()).pipe(plugins.tslint.report('prose', {
        emitError: false
    }));
});

gulp.task('ts:compile', ['ts:lint', 'ts:clear'], function () {
    var tsResult = tsProject.src() // instead of gulp.src(...)
        .pipe(plugins.typescript(tsProject));

    return tsResult.js.pipe(gulp.dest('release'));
});

gulp.task('release', ['ts:compile', 'copy']);

gulp.task('serve', ['ts:compile', 'copy:config'], function () {
    plugins.nodemon({
        script: 'release/app.js', ext: 'ts', ignore: [], tasks: ['copy:config']
    });
});