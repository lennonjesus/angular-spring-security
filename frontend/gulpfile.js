var
  gulp            = require('gulp'),
  clean           = require('gulp-clean'),
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
  url             = require('url')
;

var basePaths = {
  src: 'app/',
  dest: 'dist/'
}

gulp.task('clean', function () {
  return gulp
    .src(basePaths.dest)
    .pipe(clean());
});

gulp.task('copy', ['clean'], function () {
  return gulp
    .src(basePaths.src + '**/*')
    .pipe(gulp.dest(basePaths.dest));
});

gulp.task('wiredep', ['copy'], function () {
  return gulp
    .src(basePaths.src + 'index.html')
    .pipe(
      wiredep({
        optional: 'configuration',
        goes: 'here'
      })
    ).pipe(gulp.dest(basePaths.dest));
});

gulp.task('usemin', ['wiredep'], function() {
  return gulp.src(basePaths.src + '/index.html')
    .pipe(usemin({
      css: [ autoprefixer(), minifyCss() ],
      vendorcss: [ minifyCss() ],
      html: [ minifyHtml({ empty: true }) ],
      js: [ uglify() ],
      vendorjs: [ uglify() ],
      inlinejs: [ uglify() ],
      inlinecss: [ minifyCss(), 'concat' ]
    }))
    .pipe(gulp.dest(basePaths.dest));
});

gulp.task('default', ['copy'], function () {
  gulp.start('wiredep', 'usemin');
});


gulp.task('server', ['usemin'], function () {

  var proxyOptions = url.parse('http://localhost:8080/angular-spring-security/api');
  proxyOptions.route = '/angular-spring-security/api';

  browserSync.init({
    port: 9000,
    server: {
      baseDir: basePaths.dest,
      middleware: [proxy(proxyOptions)]
    }
  });

  gulp.watch(basePaths.dest + '**/*').on('change', browserSync.reload);

  gulp.watch(basePaths.src + '**/*.js').on('change', function (event) {
    console.log('LINT -->> ' + event.path);
    gulp
      .src(event.path)
      .pipe(jshint())
      .pipe(jshint.reporter(jshintStylish));
  });
});
