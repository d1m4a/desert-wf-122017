const gulp         = require('gulp');

const sass         = require('gulp-sass');
const pug          = require('gulp-pug');

const notify       = require('gulp-notify');
const rename       = require('gulp-rename');
const sourcemaps   = require('gulp-sourcemaps');

const del          = require('del');

const browserSync  = require('browser-sync').create();

const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');


// ////////////////////////////////////////////////
//
// Задаём paths
//
// // /////////////////////////////////////////////
const paths = {
    root: './build',
    templates: { 
        pages: 'app/templates/pages/*.pug',
        src: 'app/templates/**/*.pug'
    },
    styles: {
        src: 'src/styles/**/*.scss',
        dest: 'build/assets/styles/'
    },
    images: {
        src: 'src/images/**/*.*',
        dest: 'build/assets/images/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'build/assets/scripts/'
    }
};


// ////////////////////////////////////////////////
//
// Настройка локального сервера Browser-sync с "живой" перезагрузкой
//
// // /////////////////////////////////////////////

gulp.task('server', function() {
  browserSync.init({
    server: paths.root
  });
  browserSync.watch(paths.root + '**/*.*', browserSync.reload )
});

// ////////////////////////////////////////////////
//
// Pug -> HTML
//
// // /////////////////////////////////////////////

gulp.task('templates', function(){
    return gulp.src(paths.templates.pages)
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(paths.root))
    .pipe(notify("pug compile"));
 });

// ////////////////////////////////////////////////
//
// SCSS -> CSS
//
// // /////////////////////////////////////////////

gulp.task('styles', function() {
    return gulp.src('./src/styles/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(sourcemaps.write())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(notify("scss compile"));
});

// ////////////////////////////////////////////////
//
// Очистка 
//
// // /////////////////////////////////////////////

gulp.task('clean', function(){
    return del(paths.root);
 });

 // ////////////////////////////////////////////////
//
// Мутим bandle.js 
//
// // /////////////////////////////////////////////

gulp.task('scripts', function(){
    return gulp.src('src/scripts/app.js')
    .pipe(gulpWebpack(webpackConfig, webpack)) 
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(notify("webpack is done"));
 });

 // ////////////////////////////////////////////////
//
// копируем картинки в build 
//
// // /////////////////////////////////////////////

gulp.task('images', function(){
    return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest))
    .pipe(notify("images is copy"));
 });

// ////////////////////////////////////////////////
//
// Задача watch
// Отслеживает любые изменения в папке src
//
// // /////////////////////////////////////////////

gulp.task('watch',function(){
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.templates.src, templates);
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.scripts.src, scripts);
});



gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('styles', 'templates', 'images', 'scripts'),
    gulp.parallel('watch', 'server')
));