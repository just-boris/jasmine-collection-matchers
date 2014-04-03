var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    spawn = require('child_process').spawn;

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

gulp.task('jasmine', ['lint'], function(done) {
    var jasmine = spawn('./node_modules/.bin/jasmine-node', ['test'], {stdio: 'inherit'});
    jasmine.on('close', done);
});

gulp.task('default', ['lint', 'concat', 'jasmine']);