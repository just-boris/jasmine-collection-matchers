'use strict';
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    Jasmine = require('jasmine');

gulp.task('lint', function() {
    return gulp.src(['(src|test)/**'])
        .pipe(jshint())
        .pipe(jshint.reporter())
        .pipe(jshint.reporter('fail'))
});

gulp.task('concat', function() {
    return gulp.src('src/**')
        .pipe(concat('pack.js'))
        .pipe(gulp.dest('lib/'));
});

function runJasmine(config, done) {
    var jasmine = new Jasmine(),
        defaultConfig = {
          spec_dir: 'test',
          spec_files: [
            '*[sS]pec.js'
          ]
        };    
    jasmine.loadConfig(defaultConfig);
    if(config) {
       jasmine.loadConfig(config);
    }
    jasmine.onComplete(function(passed) {
        if(passed) {
            done();
        } else {
            done(new Error('some tests has been failed'));
        }
    });
    jasmine.execute();
}

gulp.task('jasmine', ['lint'], function(done) {
    runJasmine(null, done);
});

gulp.task('revert-test', function(done) {
    runJasmine({
        spec_dir: 'util',
        helpers: ['jasmineRevertSpecs.js']
    }, done);
});

gulp.task('default', ['lint', 'concat', 'jasmine']);