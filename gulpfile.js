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

    var tsProject = ts.createProject(projectdir + '/tsconfig.json');

    var tsresult = tsProject.src(projectdir + '/**/*.ts')
         .pipe(sourcemaps.init())
         .pipe(ts(tsProject));

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

gulp.watch('webapp/angular/**/*.ts', ['compilets-angular']);

gulp.task('compilehtml', function() {
  var swig = require('gulp-swig');
  var htmlmin = require('gulp-htmlmin');

  gulp.src('webapp/views/index.html')
    .pipe(swig({ defaults: { cache: false}}))
    /*.pipe(htmlmin({
      collapseWhitespace: true
    }))*/
    .pipe(gulp.dest('build'))
});

gulp.watch('webapp/views/**/*.html', ['compilehtml']);

gulp.task('default', ['compilets-script', 'compilets-angular', 'compilehtml']);
