const gulp          = require('gulp');

const sass          = require('gulp-sass');
const pug           = require('gulp-pug');

const notify        = require('gulp-notify');
const rename        = require('gulp-rename');
const autoprefixer  = require('gulp-autoprefixer');
const sourcemaps    = require('gulp-sourcemaps');

const del           = require('del');

const browserSync   = require('browser-sync').create();
const reload        = browserSync.reload;

const gulpWebpack   = require('gulp-webpack');
const webpack       = require('webpack');
const webpackConfig = require('./webpack.config.js');


// ////////////////////////////////////////////////
//
// Задаём paths
//
// // /////////////////////////////////////////////
const paths = {
    root: './build',
    templates: { 
        pages: 'src/templates/pages/*.pug',
        src: 'src/templates/**/*.pug'
    },
    styles: {
        src: 'src/styles/**/*.scss',
        dest: 'build/assets/styles/'
    },
    images: {
        src: 'src/images/**/*.*',
        dest: 'build/assets/images/'
    },
    fonts: {
        src: 'src/fonts/**/*.*',
        dest: 'build/assets/fonts/'
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
  //browserSync.watch(paths.templates.pages + '**/*.*', browserSync.reload )
  //browserSync.watch('src/styles/common/*.scss', browserSync.reload )
});

// ////////////////////////////////////////////////
//
// Pug -> HTML
//
// // /////////////////////////////////////////////

gulp.task('templates', function(){
    return gulp.src(paths.templates.pages)
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(paths.root));
    //.pipe(notify("pug compile"));
 });

// ////////////////////////////////////////////////
//
// SCSS -> CSS
//
// // /////////////////////////////////////////////

gulp.task('styles', function() {
    return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed',
                includePaths: require('node-normalize-scss').includePaths}))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({
        browsers: ['last 5 versions'],
        cascade: false
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.styles.dest));
    //.pipe(notify("scss compile"));
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
    .pipe(gulp.dest(paths.scripts.dest));
    //.pipe(notify("webpack is done"));
 });

 // ////////////////////////////////////////////////
//
// копируем картинки и шрифты в build 
//
// // /////////////////////////////////////////////

gulp.task('images', function(){
    return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest));
    //.pipe(notify("images is copy"));
 });

 gulp.task('fonts', function(){
    return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest));
    //.pipe(notify("images is copy"));
 });

// ////////////////////////////////////////////////
//
// Задача watch
// Отслеживает любые изменения в папке src
//
// // /////////////////////////////////////////////

gulp.task('watch',function(){
    gulp.watch(paths.styles.src, gulp.series('styles')).on("change", reload);
    gulp.watch(paths.templates.src, gulp.series('templates'));
    gulp.watch(paths.images.src, gulp.series('images'));
    gulp.watch(paths.scripts.src, gulp.series('scripts'));
});



gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('styles', 'templates', 'images', 'scripts'),
    gulp.parallel('watch', 'server')
));