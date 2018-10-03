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

}else{
	//html without minfying
	gulp.task('copying html',()=>{
		return gulp.src(['./src/**/*.html'])
	    .pipe(gulp.dest('./www'))
	})
}



gulp.task('copying node_module dependency',()=>{
	return gulp.src(['./node_modules/bootstrap/**/*.*'])
    .pipe(gulp.dest('./www/node_modules/bootstrap'))
})


gulp.task('copying res',()=>{
	return gulp.src(['./src/res/**/*'])
    .pipe(gulp.dest('./www/res'))
})


gulp.task('default',()=>{
	runSequence('copying html', 'copying node_module dependency',  'copying res');
})
