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

function runJasmine(config) {
    return new Promise(function(resolve, reject) {
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
        var jasmineAllureReporter = require('jasmine-allure-reporter').Jasmine2AllureReporter.singleton;
        jasmineAllureReporter.configure({
          allureReport: {
            resultsDir: 'allure-results'
          }
        });
        jasmine.addReporter(jasmineAllureReporter);
        jasmine.configureDefaultReporter({ showColors: true });
        jasmine.onComplete(function(passed) {
            if(passed) {
                resolve();
            } else {
                reject('some tests has been failed');
            }
        });
        jasmine.execute();
    });
}

gulp.task('jasmine', ['lint'], function() {
    return runJasmine();
});

gulp.task('revert-test', function() {
    return runJasmine({
        spec_dir: 'util',
        helpers: ['jasmineRevertSpecs.js']
    });
});

gulp.task('default', ['lint', 'concat', 'jasmine']);