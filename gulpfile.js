const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const htmlreplace = require('gulp-html-replace');
const uglify = require('gulp-uglify');

gulp.task('default', ['copy'], () => {
  // estas tasks são assincronas e não são dependentes entre si
  gulp.start(['build-img', 'build-js', 'build-html']);
});

gulp.task('copy', ['clean'], () => {
  return gulp.src('src/**/*')
    .pipe(gulp.dest('dist'))
});

gulp.task('clean', () => {
  return gulp.src('dist')
    .pipe(clean());
});

gulp.task('build-img', () => {
  gulp.src('dist/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

gulp.task('build-js', () => {
 gulp.src(['dist/js/jquery.js', 'dist/js/home.js', 'dist/js/produtos.js'])
  .pipe(concat('all.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'))
});

// html-replace utiliza atraves de comentario <!--build:js --> inserido no index.html para funcionar
gulp.task('build-html', () => {
  gulp.src('dist/**/*.html')
    .pipe(htmlreplace({
      js: 'js/all.js'
    }))
    .pipe(gulp.dest('dist'))
});

