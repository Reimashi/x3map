var gulp = require('gulp');

var script_name = "x3map.js";

gulp.task('download-deps', function (callback) {
  var tsd = require('gulp-tsd');
  tsd({
        command: 'reinstall',
        config: './tsd.json'
    }, callback);
});

gulp.task('compilets', function () {
    var ts = require('gulp-typescript');
    var concat = require('gulp-concat');
    var sourcemaps = require('gulp-sourcemaps');

    var tsresult = gulp.src('script/**/*.ts')
         .pipe(sourcemaps.init())
         .pipe(ts({
            target: 'ES5',
            sortOutput: true
         }));

    return tsresult.js
        .pipe(concat(script_name))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build'));
});

gulp.watch('script/**/*.ts', ['compilets']);

gulp.task('default', ['compilets']);
