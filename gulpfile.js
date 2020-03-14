const path         = require('path');
const gulp         = require('gulp');
const concat       = require('gulp-concat');
const gulpif       = require('gulp-if');
const jshint       = require('gulp-jshint');
const sourcemaps   = require('gulp-sourcemaps');
const uglify       = require('gulp-uglify');
const ngAnnotate   = require('gulp-ng-annotate');

const config = {
  entry: ['src/**/*.js'],
  output: 'dist/angular-slick.js',
  output_min: 'dist/angular-slick.min.js',
  source_dir: 'src/',
  output_dir: 'dist/',
};

/**
 * Process Scripts
 *
 * @param min
 * @returns {*}
 */
const processScripts = function(min) {

  return gulp.src(config.entry)
    .pipe(gulpif(!min, sourcemaps.init()))
    .pipe(ngAnnotate())
    .pipe(gulpif(!min, concat(path.parse(config.output).base)))
    .pipe(gulpif(min, concat(path.parse(config.output_min).base)))
    .pipe(gulpif(min, uglify({compress: {drop_debugger: min}})))
    .pipe(gulpif(!min, sourcemaps.write('.', {sourceRoot: config.source_dir})))
    .pipe(gulp.dest(config.output_dir));
};


// ## Gulp tasks
// Run `gulp -T` for a task summary
// `gulp scripts` - Build script
gulp.task('scripts', function() {
  return processScripts();
});

// `gulp scripts_min` - Build script min
gulp.task('scripts_min', function() {
  return processScripts(true);
});

// ### JSHint
// `gulp jshint` - Lints configuration JSON and project JS.
gulp.task('jshint', function() {

  return gulp.src(['package.json', 'gulpfile.js'].concat(config.entry), {allowEmpty: true})
    .pipe(jshint())
    .pipe(jshint.reporter('fail'));
});

// ### Scripts
// `gulp scripts` - Runs JSHint then compiles, combines, and optimizes Bower JS
// and project JS.
gulp.task('scripts', gulp.series('jshint', 'scripts', 'scripts_min'));

// ### Clean
// `gulp clean` - Deletes the build folder entirely.
gulp.task('clean', require('del').bind(null, [config.output_dir]));

// ### Build
// `gulp build` - Run all the build tasks but don't clean up beforehand.
// Generally you should be running `gulp` instead of `gulp build`.
gulp.task(
  'build',
  gulp.series('scripts', 'scripts_min')
);

// ### Gulp
// `gulp` - Run a complete build. To compile for production run `gulp`.
gulp.task('default', gulp.series('clean', 'build'));
