var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var tailwindcss = require('tailwindcss');

gulp.task('bs', ['css'], function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(["index.html", "tailwindcss-config.js"], ['css', 'html-watch']);
});

gulp.task('html-watch', function (done) {
    browserSync.reload();
    done();
});

// Example https://tailwindcss.com/docs/installation#gulp

gulp.task('css', function () {
    return gulp.src('src.css')
        // ...
        .pipe(postcss([
            // ...
            tailwindcss('./tailwindcss-config.js'),
            // ...
        ]))
        // ...
        .pipe(rename(function (path) {
            path.basename = "style";
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('default', ['bs']);