'use strict';

var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');
var fs = require('fs');
var browserSync = require('browser-sync').create();

gulp.task('nunjucks', (done) => {
  gulp.src([
    '_resource/**/*.html',
    '_resource/_layout/**/',
    '!_resource/_layout/_*/**',
    '!_resource/_layout/**/_*.html'
  ])
  .pipe(data(function(file) {
    return JSON.parse(fs.readFileSync('./_resource/_layout/news.json'));
  }))
  .pipe(nunjucksRender({path: '_resource/_layout'}))
  .pipe(gulp.dest('./html'))
  done();
});

gulp.task('browser-sync', (done) => {
  browserSync.init({
    files: 'html/**/*.html',
    server: {
      baseDir: 'html',
      index: 'index.html',
    },
  });
  done();
});
gulp.task('browser-reload', (done) => {
  browserSync.reload();
  done();
});

gulp.task('watch-files', (done) => {
  gulp.watch('_resource/**/*.json', gulp.task('nunjucks'));
  gulp.watch('_resource/**/*.html', gulp.task('nunjucks'));
  gulp.watch('./html/', gulp.task('browser-reload'));
  done();
});

gulp.task('default', gulp.series(gulp.parallel('watch-files', 'browser-sync', 'nunjucks'), (done) => {
  done();
}));

