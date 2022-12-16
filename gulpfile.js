
const path = require('path');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const extractMediaQuery = require('postcss-extract-media-query');


function clean() {
    return gulp.src(path.join(__dirname, 'assets/style/*'))
        .pipe($.deleteFile({
            deleteMatch: true
        }));
}


function css() {
    return gulp.src(path.join(__dirname, 'assets/style/*.css'))
        .pipe($.postcss())
        .pipe(gulp.dest(path.join(__dirname, 'assets/style/')));
}

gulp.task('default', gulp.series(
    // clean,
    // css
));