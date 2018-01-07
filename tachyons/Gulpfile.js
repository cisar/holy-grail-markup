var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var postcss = require('gulp-postcss');
var uncss = require('gulp-uncss');
// var rename = require('gulp-rename');
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

// Example https://tailwindcss.com/docs/installation#gulp

gulp.task('css', function () {
    return gulp.src('src/style.css')
        .pipe(postcss([
            require('postcss-import'),
            // require('postcss-unprefix'),
            // require('autoprefixer')
        ]))

        // .pipe(uncss({
        //     html: ['index.html']
        // }))
        // .pipe(csso())
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['bs']);