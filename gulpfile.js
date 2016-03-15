var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('build', function() {
  return gulp.src(['./src/**/*.js', './complex.js'])
    .pipe(concat('complex.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/'));
});
