// Requis
var gulp = require("gulp");

// Include plugins
var plugins = require("gulp-load-plugins")(); // tous les plugins de package.json

// Variables de chemins
var source = "./app"; // dossier de travail
var node_modules = "./node_modules"; // dossier node_modules
var destination = "./dist"; // dossier à livrer

// Tâche "css" = SCSS + autoprefixer + CSScomb + beautify (source -> destination)
gulp.task("css", function() {
  return gulp
    .src(source + "/scss/main.scss")
    .pipe(plugins.sass())
    .pipe(plugins.csscomb())
    .pipe(plugins.cssbeautify({ indent: "  " }))
    .pipe(plugins.autoprefixer())
    .pipe(gulp.dest(destination));
});

gulp.task("printcss", function() {
  return gulp
    .src(source + "/scss/print.scss")
    .pipe(plugins.sass())
    .pipe(plugins.csscomb())
    .pipe(plugins.cssbeautify({ indent: "  " }))
    .pipe(plugins.autoprefixer())
    .pipe(gulp.dest(destination));
});

// Tâche "js" = concat des js + copie (source -> destination)
gulp.task("js", function() {
  return gulp
    .src([
      // node_modules + '/angular/angular.js',
      // node_modules + '/angular-route/angular-route.js',
      source + "/angular/app.js",
      source + "/angular/controllers/*.js",
      source + "/angular/controllers/panel/*.js",
      source + "/angular/services/*.js"
    ])
    .pipe(plugins.concat("bundle.js"))
    .pipe(gulp.dest(destination));
});

// Tâche "index" = copie de index (source -> destination)
gulp.task("index", function() {
  return gulp.src(source + "/index.html").pipe(gulp.dest(destination));
});

// Tâche "views" = copie des views (source -> destination)
gulp.task("views", function() {
  return gulp
    .src(source + "/views/*.html")
    .pipe(gulp.dest(destination + "/views"));
});

// Tâche "includes" = copie des includes (source -> destination)
gulp.task("includes", function() {
  return gulp
    .src(source + "/includes/*.html")
    .pipe(gulp.dest(destination + "/includes"));
});

// Tâche "sources" = copie des sources (source -> destination)
gulp.task("sources", function() {
  return gulp
    .src(source + "/sources/**/*")
    .pipe(gulp.dest(destination + "/sources"));
});

// Tâche "minifycss" = minification CSS (destination -> destination)
gulp.task("minifycss", function() {
  return gulp
    .src(destination + "/main.css")
    .pipe(plugins.csso())
    .pipe(
      plugins.rename({
        suffix: "-min"
      })
    )
    .pipe(gulp.dest(destination));
});

// Tâche "minifyjs" = minification JS (destination -> destination)
gulp.task("minifyjs", function() {
  return gulp
    .src(destination + "/bundle.js")
    .pipe(plugins.minify())
    .pipe(gulp.dest(destination));
});

// Tâche "build"
gulp.task("build", [
  "js",
  "css",
  "printcss",
  "index",
  "includes",
  "views",
  "sources"
]);

// Tâche "prod" = Build + minify
gulp.task("prod", ["build", "minifycss", "minifyjs"]);

// Tâche "watch"
gulp.task("watch", function() {
  gulp.watch(
    [
      source + "/scss/*.scss",
      source + "/angular/app.js",
      source + "/angular/controllers/*.js",
      source + "/angular/services/*.js",
      source + "/views/*.html",
      source + "/includes/*.html",
      source + "/index.html"
    ],
    ["build"]
  );
});

// Tâche par défaut
gulp.task("default", ["build"]);
