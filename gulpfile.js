const gulp          = require('gulp');

const sass          = require('gulp-sass');
const pug           = require('gulp-pug');

//const notify        = require('gulp-notify');
const rename        = require('gulp-rename');
const autoprefixer  = require('gulp-autoprefixer');
const sourcemaps    = require('gulp-sourcemaps');
//const imagemin      = require('gulp-imagemin');
const svgSprite     = require('gulp-svg-sprites');
const ghpages       = require('gh-pages');

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
    root: './docs/build',
    templates: { 
        pages: 'src/templates/pages/*.pug',
        src: 'src/templates/**/*.pug'
    },
    styles: {
        src: 'src/styles/**/*.scss',
        dest: 'docs/build/assets/styles/'
    },
    images: {
        src: 'src/images/*.*',
        dest: 'docs/build/assets/images/',
        sprites: 'src/images/icons/*.svg'
    },
    fonts: {
        src: 'src/fonts/*.*',
        dest: 'docs/build/assets/fonts/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'docs/build/assets/scripts/'
    }
};


// ////////////////////////////////////////////////////////////////////
//
// Настройка локального сервера Browser-sync с "живой" перезагрузкой
//
// // /////////////////////////////////////////////////////////////////

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

 // ///////////////////////////////////////////////////////////////
//
// делаем sprite из svg иконок и кладем его в папку назначения 
//
// // /////////////////////////////////////////////////////////////

gulp.task('sprites', function () {
    return gulp.src(paths.images.sprites)
        .pipe(svgSprite())
        .pipe(gulp.dest(paths.images.dest));
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


 ghpages.publish('build', function(err) {});

// ///////////////////////////////////////////////////////
//
// Задача watch
// Отслеживает любые изменения в папках с исходниками
//
// // ////////////////////////////////////////////////////

gulp.task('watch',function(){
    //gulp.watch(paths.styles.src, gulp.series('styles')); //так не работает перезагрузка страницы
    gulp.watch(paths.styles.src, gulp.series('styles')).on("change", reload); // а так работает
    gulp.watch(paths.templates.src, gulp.series('templates'));
    gulp.watch(paths.images.src, gulp.series('images'));
    gulp.watch(paths.images.sprites, gulp.series('sprites'));
    gulp.watch(paths.scripts.src, gulp.series('scripts'));
});



gulp.task('default', gulp.series(
    'clean',
    //'styles',
    //'templates',
    //'images',
    //'sprites',
    //'scripts',
    gulp.parallel('styles', 'templates', 'images', 'sprites', 'scripts'),
    gulp.parallel('watch', 'server')
));