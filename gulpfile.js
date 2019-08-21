const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const cssnano = require('cssnano');
const glob = require('glob');
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const pump = require('pump');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

const theme_path = './src/'; // change this to the path of your theme. this variable is referenced in the rest of the paths

function sassTask(done) {
    const sassOptions = {
        errLogToConsole: true,
        outputStyle: 'compressed'
    };
    const plugins = [
        autoprefixer()
    ];

    return gulp.src(theme_path + 'styles.scss')
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(postcss(plugins))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css'))
}

function sassProdTask(done) {
    const sassOptions = {
        errLogToConsole: true,
        outputStyle: 'compressed'
    };
    const plugins = [
        autoprefixer(),
        cssnano()
    ];
    return gulp.src(theme_path + 'styles.scss')
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./public/css'))
}

// end grunticon

function babelTask() {
  return gulp.src(theme_path + 'js/sticky-observer.js')
  .pipe(babel())
  .pipe(gulp.dest('./public/js'));
}

function uglifyTask() {
  return gulp.src(theme_path + 'js/sticky-observer.js')
  .pipe(babel())
  .pipe(uglify())
  .pipe(gulp.dest('./public/js'));
}

function watchTask() {
    "use strict";
    gulp.watch(theme_path + 'styles.scss', sassTask);
    gulp.watch(theme_path + 'js/sticky-observer.js', babelTask);
}

gulp.task('sass', sassTask); // dev css; includes sourcemap
gulp.task('sassProd', sassProdTask); // prod css; excludes sourcemap, includes cssnano
gulp.task('babel', babelTask);
gulp.task('uglify', uglifyTask);

gulp.task('default', gulp.parallel('sass', 'babel')); // dev sass and babel
gulp.task('prod', gulp.parallel('sassProd', 'uglify')); // prod  sass and babel
gulp.task('watch', gulp.series('default', watchTask)); // watch; includes dev sass and babel