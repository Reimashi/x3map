var gulp = require('gulp');

gulp.task('download-deps', function (callback) {
  var tsd = require('gulp-tsd');
  tsd({
        command: 'reinstall',
        config: './tsd.json'
    }, callback);
});

var compileTypescript = function(scriptname, projectdir) {
    var ts = require('gulp-typescript');
    var concat = require('gulp-concat');
    var sourcemaps = require('gulp-sourcemaps');

    var tsresult = gulp.src(projectdir + '/**/*.ts')
         .pipe(sourcemaps.init())
         .pipe(ts({
            target: 'ES5',
            sortOutput: true
         }));

    return tsresult.js
        .pipe(concat(scriptname))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build'));
}

gulp.task('compilets-script', function () {
  compileTypescript("xut.js", 'script');
});

gulp.watch('script/**/*.ts', ['compilets-script']);

gulp.task('compilets-angular', function () {
  compileTypescript("xut-angular.js", 'webapp/angular');
});

gulp.watch('webapp/angular/**/*.ts', ['compilets-script']);

gulp.task('default', ['compilets-script', 'compilets-angular']);
