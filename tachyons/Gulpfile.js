var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var postcss = require('gulp-postcss');
var replace = require('gulp-replace');
var stripCssComments = require('gulp-strip-css-comments');
var csso = require('gulp-csso');

gulp.task('bs', ['css'], function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(["src/*.css", "index.html"], ['css', 'html-watch']);
});

gulp.task('html-watch', function (done) {
    browserSync.reload();
    done();
});

gulp.task('css', function () {
    return gulp.src('src/style.css')
        .pipe(postcss())
        .pipe(uncss({ html: ['index.html'] }))
        // Maximum optimization
        .pipe(csso())
        .pipe(gulp.dest('dist/'));
});

gulp.task('css-dev', function () {
    return gulp.src('src/style.css')
        .pipe(postcss())
        // .pipe(uncss({ html: ['index.html'] }))
        // Minimum optimization
        .pipe(stripCssComments())
        .pipe(replace(/\n\n*/g, '\n'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['bs']);