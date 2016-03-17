var gulp = require('gulp');
var concat = require('gulp-concat');
var version = require('gulp-version-injector');

gulp.task('default', function() {
  return gulp.src(['./src/Core/*.js',
    './src/Manager/*.js',
    './src/System/System.js',
    './src/System/EntitySystem.js',
    './src/System/VoidSystem.js',
    ])
    .pipe(concat('Complex.js'))
    .pipe(version('package.json'))
    .pipe(gulp.dest('./build/'));
});
