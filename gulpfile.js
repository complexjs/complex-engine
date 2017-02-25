'use strict';

let gulp = require('gulp');
let babel = require("gulp-babel");


gulp.task('build', function () {
    return gulp.src(["src/**/*.js"])
        .pipe(babel())
        .pipe(gulp.dest("bin"));
});

gulp.task('watch', ['build'], function () {
    gulp.watch('src/**/*.js', ['build']);
});

gulp.task('default', ['watch']);

