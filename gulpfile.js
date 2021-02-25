'use strict';

var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');

gulp.task('nunjucks', function () {
  return gulp.src([
    '_resource/_layout/**/*.html',
    '!_resource/_layout/**/_*.html'
  ])
    .pipe(nunjucksRender({
      path: ['_resource/_layout/']
    }))
    .pipe(gulp.dest('./html'));
});