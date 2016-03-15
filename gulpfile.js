var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('build', function() {
  return gulp.src(['./src/**/*.js'])
    .pipe(concat('Complex.js'))
    .pipe(gulp.dest('./build/'));
});
