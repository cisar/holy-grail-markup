var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var postcss = require('gulp-postcss');
var uncss = require('gulp-uncss');
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
        .pipe(postcss([
            require('postcss-import'),
            require('postcss-cssnext')({
                features: {
                    customProperties: {
                        preserve: true,
                    },
                },
                warnForDuplicates: false,
            }),
            require('postcss-unprefix'),
            require('autoprefixer'),
        ]))

        .pipe(uncss({
            html: ['index.html']
        }))
        .pipe(stripCssComments())
        .pipe(replace(/\n\n*/g, '\n'))
        // .pipe(csso())
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['bs']);