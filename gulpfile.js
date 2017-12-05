var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');


gulp.task('sass', function () {
    return gulp.src('./app/scss/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./app/css'));
  });

  gulp.task('pug', function () {
    return gulp.src('./app/pug/*.pug')
      .pipe(pug({pretty: true}))
      .pipe(gulp.dest('./app'));
  });