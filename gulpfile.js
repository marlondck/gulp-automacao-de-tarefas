const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const htmlreplace = require('gulp-html-replace');
const uglify = require('gulp-uglify');
const usemin = require('gulp-usemin');
const cssmin = require('gulp-cssmin');

gulp.task('default', ['copy'], () => {
  gulp.start(['build-img', 'usemin']);
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

// gulp.task('build-js', () => {
//  gulp.src(['dist/js/jquery.js', 'dist/js/home.js', 'dist/js/produtos.js'])
//   .pipe(concat('all.js'))
//   .pipe(uglify())
//   .pipe(gulp.dest('dist/js'))
// });

// // html-replace utiliza atraves de comentario <!--build:js --> inserido no index.html para funcionar
// gulp.task('build-html', () => {
//   gulp.src('dist/**/*.html')
//     .pipe(htmlreplace({
//       js: 'js/all.js'
//     }))
//     .pipe(gulp.dest('dist'))
// });

gulp.task('usemin', () => {
  gulp.src('dist/**/*.html')
    .pipe(usemin({
      'js': [uglify],
      'css': [cssmin]
    }))
    .pipe(gulp.dest('dist'))
});

