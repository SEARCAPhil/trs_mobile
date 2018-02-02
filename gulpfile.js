const gulp = require('gulp')


gulp.task('copyingassets',()=>{
	return gulp.src(['./src/**/*.html'])
    .pipe(gulp.dest('./www'))
})

gulp.task('default',['copyingassets']);
