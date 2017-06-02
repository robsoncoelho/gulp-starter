// require gulp
var gulp = require('gulp');

// require other packages
var concat = require('gulp-concat');
var cssmin = require('gulp-minify-css');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var browserSync = require('browser-sync').create();

// default task
gulp.task('default', ['scripts', 'styles', 'html', 'watch', 'images', 'fonts', 'clean:dist']);

// clean dist task
gulp.task('clean:dist', function() {
  return del.sync('dist');
})

// browser reload
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

// images task
gulp.task('images', function(){
  	return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
  		.pipe(imagemin())
  		.pipe(cache(imagemin({
  			interlaced: true
   		})))
  		.pipe(gulp.dest('dist/images'))
});

// fonts
gulp.task('fonts', function() {
  	return gulp.src('app/fonts/**/*')
  		.pipe(gulp.dest('dist/fonts'))
})

// scripts task
gulp.task('scripts', function() {
	return gulp.src('./app/js/*.js')
	    .pipe(concat('app.js'))
	    .pipe(gulp.dest('./dist/js/'))
	    .pipe(uglify())
	    .pipe(rename({
	      suffix: '.min'
	    }))
	    .pipe(gulp.dest('./dist/js/'))
	    .pipe(browserSync.reload({
	      	stream: true
	    }))
});

// styles task
gulp.task('styles', function() {
	return gulp.src('./app/scss/*.scss')
	    .pipe(sass())
	    .pipe(useref())
	    .pipe(gulp.dest('./app/css/'))
	    .pipe(cssmin())
	    .pipe(rename({
	      suffix: '.min'
	    }))
	    .pipe(gulp.dest('./dist/css/'))
	    .pipe(browserSync.reload({
	      	stream: true
	    }))
});

// html task
gulp.task('html', function() {
	return gulp.src('./app/*.html')
	    .pipe(useref())
	    .pipe(gulp.dest('./dist'))
	    .pipe(browserSync.reload({
	      	stream: true
	    }))
});

// watch task
gulp.task('watch', ['browserSync', 'html', 'styles', 'scripts'], function() {
  	gulp.watch('./app/js/*.js', ['scripts']);
  	gulp.watch('./app/scss/*.scss', ['styles']);
  	gulp.watch('./app/*.html', ['html']); 
});

