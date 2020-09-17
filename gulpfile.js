let gulp = require("gulp"),
  sass = require("gulp-sass"),
  rename = require("gulp-rename"),
  browserSync = require("browser-sync"),
  autoprefixer = require("gulp-autoprefixer"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  fileInclude = require("gulp-file-include"),
  fontConverter = require("gulp-ttf2woff2"),
  cssmin = require("gulp-cssmin");



gulp.task("sass", function () {
  return gulp.src("app/scss/**/*.scss")
    .pipe(sass({
      outputStyle: "compressed"
    }))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(autoprefixer({
      overrideBrowserslist: ["last 8 versions"]
    }))
    .pipe(gulp.dest("app/css"))
    .pipe(gulp.dest("./build/css"))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task("scripts", function () {
  return gulp.src([
      // "node_modules/magnific-popup/dist/jquery.magnific-popup.js",
      // "node_modules/mixitup/dist/mixitup.js",
      // "node_modules/rateyo/src/jquery.rateyo.js",
      // "node_modules/ion-rangeslider/js/ion.rangeSlider.js",
      "node_modules/swiper/swiper-bundle.js"
    ])
    .pipe(concat("libs.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("app/js"))
    .pipe(gulp.dest("./build/js"));
});

gulp.task("styles", function () {
  return gulp.src([
      "node_modules/normalize.css/normalize.css",
      // "node_modules/rateyo/src/jquery.rateyo.css",
      // "node_modules/magnific-popup/dist/magnific-popup.css",
      // "node_modules/ion-rangeslider/css/ion.rangeSlider.css",
      "node_modules/swiper/swiper-bundle.css",
      "node_modules/hamburgers/dist/hamburgers.css",
    ])
    .pipe(concat("libs.min.css"))
    .pipe(cssmin())
    .pipe(gulp.dest("app/css"))
    .pipe(gulp.dest("./build/css"));
});

// gulp.task("html", function(){
//   return gulp.src("app/*.html")
//             .pipe(browserSync.reload({stream: true}))
// });

gulp.task('html', function () {
  return gulp.src(['app/*.html', '!app/parts/**/*.html'])
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task("js", function () {
  return gulp.src("app/js/main.js")
    // .pipe(uglify())
    // .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest("./build/js"))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: "build/"
    }
  })
});

gulp.task("fonts", function () {
  return gulp.src('app/fonts/*.ttf')
    .pipe(fontConverter({
      clone: true
    }))
    .pipe(gulp.dest('app/fonts'))
    .pipe(gulp.dest("./build/fonts"));
});

gulp.task("images", function () {
  return gulp.src('app/images/**/*')
    .pipe(gulp.dest('./build/images'));
});

gulp.task("watch", function () {
  gulp.watch("app/scss/**/*.scss", gulp.parallel("sass"));
  gulp.watch("app/*.html", gulp.parallel("html"));
  gulp.watch("app/js/*.js", gulp.parallel("js"));
  gulp.watch("app/images/*", gulp.parallel("images"));
});

gulp.task("default", gulp.parallel("js", "sass", "images", "html", "fonts", "browser-sync", "watch", "scripts", "styles"))