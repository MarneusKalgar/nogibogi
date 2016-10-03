'use strict'

/**************************************************/
/*                   plugins                      */
/**************************************************/

//plugins for development
var gulp = require('gulp'),
		jade = require('gulp-jade'),
		stylus = require('gulp-stylus'),
		nib = require('nib'),
		rupture = require('rupture'),
		prefix = require('gulp-autoprefixer'),
		plumber = require('gulp-plumber'),
		htmlmin = require('gulp-htmlmin'),
		concat = require('gulp-concat'),
		maps = require('gulp-sourcemaps'),
		browserSync = require('browser-sync').create();

//plugins for build
var purify = require('gulp-purifycss'),
		uglify = require('gulp-uglify'),
		imagemin = require('gulp-imagemin'),
		rename = require('gulp-rename'),		
		csso = require('gulp-csso'),
		clean = require('gulp-rimraf');

//variables for directories
var buildDir = 'build/';
var outputDir = 'dist/';


/**************************************************/
/*                     tasks                      */
/**************************************************/

//compiling jade
gulp.task('jade', function() {
	return gulp.src([ buildDir + 'jade/**/*.jade', '!' + buildDir + 'jade/**/_*.jade'])
		.pipe(plumber())
		.pipe(jade({pretty:true}))
		.pipe(gulp.dest(buildDir))
		.pipe(browserSync.stream());
});

//compiling stylus
gulp.task('stylus', function() {
	return gulp.src([ buildDir + 'stylus/**/*.styl', '!' + buildDir + 'stylus/**/_*.styl'])
		.pipe(plumber())
		.pipe(stylus({
				use: [nib(), rupture()]
			}))
		.pipe(prefix({
			browsers: ['last 4 versions'],
			cascade: true
			}))
		.pipe(gulp.dest(buildDir + 'css/'))
		.pipe(browserSync.stream());
});

//js concat
gulp.task('jsConcat', function() {
	return gulp.src(buildDir + 'js/assets/*.js')
		//.pipe(maps.init())
		.pipe(concat('main.js'))
		//.pipe(maps.write())
		.pipe(gulp.dest(buildDir + 'js/'))
		.pipe(browserSync.stream());
});

//watching files
gulp.task('watch', function() {
	gulp.watch(buildDir + 'jade/**/*.jade', ['jade']);
	gulp.watch(buildDir + 'stylus/**/*.styl', ['stylus']);
	gulp.watch(buildDir + 'js/**/*.js', ['jsConcat']);
});

// BrowserSync Task
gulp.task('browserSync', function() {
		browserSync.init({
				port: 3000,
				server: {
					baseDir: buildDir
				}
		});
});


/**********************************************/
/* Production
/**********************************************/

//cleaning dist directory
gulp.task('clean', function() {
	return gulp.src(outputDir, { read: false })
		.pipe(clean());
});

//optimize & copy html
gulp.task('htmlBuild', function() {
	return gulp.src(buildDir + '*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest(outputDir))
});

//optimize & copy css
gulp.task('cssBuild', function() {
	return gulp.src(buildDir + 'css/*.css')
		.pipe(csso())
		.pipe(gulp.dest(outputDir + 'css/'))
});

//minify & copy js
	gulp.task('jsBuild', function() {
	return gulp.src(buildDir + 'js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest(outputDir + 'js/'))
});

//minify & copy images
gulp.task('imgBuild', function() {
	return gulp.src(buildDir + 'img/**/*')
		.pipe(imagemin({progressive: true}))
		.pipe(gulp.dest(outputDir + 'img/'))
});

//copy fonts
gulp.task('fontsBuild', function() {
	return gulp.src(buildDir + 'fonts/*')
		.pipe(gulp.dest(outputDir + 'fonts/'))
});

//build task
gulp.task('build', ['browserSync', 'watch', 'jade', 'stylus', 'jsConcat']);

//production task
gulp.task('product', ['htmlBuild', 'cssBuild', 'jsBuild', 'imgBuild', 'fontsBuild']);

gulp.task('default', ['clean', 'build'] );