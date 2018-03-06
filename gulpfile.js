const gulp = require('gulp')
const runSequence = require('run-sequence')
const cleanCSS = require('gulp-clean-css')
const htmlmin = require('gulp-minifier')


//production
if(process.env.NODE_ENV=='production'){
	gulp.task('copying html',()=>{
		return gulp.src(['./src/**/*.html'])
		.pipe(htmlmin({minify: true,
	    minifyHTML: {
	      collapseWhitespace: true,
	      conservativeCollapse: true,
	      removeComments:true,
	      minifyCSS: true
	    }}))
	    .pipe(gulp.dest('./www'))
	})

	gulp.task('copying css',()=>{
		return gulp.src(['./src/**/*.css'])
		.pipe(cleanCSS())
	    .pipe(gulp.dest('./www'))
	})

}else{
	//html without minfying
	gulp.task('copying html',()=>{
		return gulp.src(['./src/**/*.html'])
	    .pipe(gulp.dest('./www'))
	})

	gulp.task('copying css',()=>{
		return gulp.src(['./src/**/*.css'])
	    .pipe(gulp.dest('./www'))
	})
}


gulp.task('copying images',()=>{
	return gulp.src(['./src/img/**/*'])
    .pipe(gulp.dest('./www/img'))
})

gulp.task('copying node_module dependency',()=>{
	return gulp.src(['./node_modules/bootstrap/**/*.*'])
    .pipe(gulp.dest('./www/node_modules/bootstrap'))
})
gulp.task('copying fonts',()=>{
	return gulp.src(['./src/fonts/**/*'])
    .pipe(gulp.dest('./www/fonts'))
})

gulp.task('copying res',()=>{
	return gulp.src(['./src/res/**/*'])
    .pipe(gulp.dest('./www/res'))
})


gulp.task('default',()=>{
	runSequence('copying html', 'copying css', 'copying node_module dependency', 'copying images', 'copying fonts', 'copying res');
})
