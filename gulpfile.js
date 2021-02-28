'use strict';

var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var browserSync = require('browser-sync').create();

var nunjucks = require('nunjucks');
nunjucks.configure('./_resource/_layouts', {
  noCache: true
});

gulp.task('nunjucks', (done) => {
  gulp.src([
    '_resource/_layout/**/*.html',
    '!_resource/_layout/**/_*.html'
  ])
  .pipe(nunjucksRender({path: '_resource/_layout/'}))
  .pipe(gulp.dest('./html'))
  done();
});

gulp.task('browser-sync', (done) => {
  browserSync.init({
    server: {
      baseDir: './html/',
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
  gulp.watch('_resource/_layout/**/*.html', gulp.task('nunjucks'));
  gulp.watch('./html/', gulp.task('browser-reload'));
  done();
});

gulp.task('default', gulp.series(gulp.parallel('watch-files', 'browser-sync', 'nunjucks'), (done) => {
  done();
}));

