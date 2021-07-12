const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');

gulp.task('copy', ['clean'], () => {
  return gulp.src('src/**/*')
    .pipe(gulp.dest('dist'))
});

gulp.task('clean', () => {
  return gulp.src('dist')
    .pipe(clean());
});

gulp.task('build-img', ['copy'], () => {
  gulp.src('dist/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});


