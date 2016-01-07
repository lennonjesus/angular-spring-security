var
  gulp            = require('gulp'),
  del             = require('del'),
  browserSync     = require('browser-sync').create(),
  proxy           = require('proxy-middleware'),
  wiredep         = require('wiredep').stream,
  usemin          = require('gulp-usemin'),
  minifyCss       = require('gulp-minify-css'),
  minifyHtml      = require('gulp-minify-html'),
  uglify          = require('gulp-uglify'),
  jshint          = require('gulp-jshint'),
  jshintStylish   = require('jshint-stylish'),
  autoprefixer    = require('gulp-autoprefixer'),
  url             = require('url'),
  inject          = require('gulp-inject');
;

var basePaths = {
  src: 'app/',
  dest: 'dist/',
  tmp: 'tmp/'
}

gulp.task('clean', function () {
  return del([basePaths.dest + '**', basePaths.tmp + '**']);
});

gulp.task('copy', ['clean'], function () {
  return gulp
    .src(basePaths.src + '**/*')
    .pipe(gulp.dest(basePaths.tmp));
});

gulp.task('wiredep', ['copy', /*'inject'*/], function () {
  return gulp
    .src(basePaths.tmp + 'index.html')
    .pipe(
      wiredep({
        optional: 'configuration',
        goes: 'here'
      })
    ).pipe(gulp.dest(basePaths.tmp));
});

// gulp.task('inject', ['copy'], function () {
//
//   return
//     gulp
//       .src('app/**/index.html')
//       .pipe(inject(
//         gulp.src(['app/**/*.js']))
//       )
//       .pipe(gulp.dest('app'));
//
// });

gulp.task('usemin', ['wiredep'], function() {
  return gulp.src(basePaths.tmp + 'index.html')
    .pipe(usemin({
      css: [ autoprefixer(), minifyCss() ],
      vendorcss: [ minifyCss() ],
      html: [ minifyHtml({ empty: true }) ],
      js: [ uglify() ],
      vendorjs: [ uglify() ],
      inlinejs: [ uglify() ],
      inlinecss: [ minifyCss(), 'concat' ]
    }))
    .pipe(gulp.dest(basePaths.tmp));
});

gulp.task('jshint', function () {
  return gulp
    .src(basePaths.src + '**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(jshintStylish));
});

gulp.task('change-src', ['usemin'], function () {
  browserSync.reload();
});

gulp.task('default', [], function () {
  gulp.start('jshint', 'usemin');
});


gulp.task('server', ['usemin'], function () {

  var proxyOptions = url.parse('http://localhost:8080/angular-spring-security/api');
  proxyOptions.route = '/angular-spring-security/api';

  browserSync.init({
    port: 9000,
    server: {
      baseDir: basePaths.tmp,
      middleware: [proxy(proxyOptions)]
    }
  });

  gulp.watch(basePaths.src + '**/*', ['change-src']);


});
