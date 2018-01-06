var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var postcss = require('gulp-postcss');
var uncss = require('gulp-uncss');
var rename = require('gulp-rename');
var csso = require('gulp-csso');

gulp.task('bs', ['css'], function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(["src.css", "index.html", "tailwindcss-config.js"], ['css', 'html-watch']);
});

gulp.task('html-watch', function (done) {
    browserSync.reload();
    done();
});

// Example https://tailwindcss.com/docs/installation#gulp

gulp.task('css', function () {
    return gulp.src('src.css')
        .pipe(postcss([
            require('postcss-import')
        ]))

        .pipe(uncss({
            html: ['index.html']
        }))
        .pipe(csso())
        .pipe(rename(function (path) {
            path.basename = "style";
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('default', ['bs']);