var gulp = require('gulp'), // Подключаем Gulp
	//autoprefixer = require('gulp-autoprefixer'),
	sass = require('gulp-sass')(require('sass')); //Подключаем Sass пакет

gulp.task('sass', function () { // Создаем таск "sass"
	return gulp.src('*.scss') // Берем все sass файлы из папки sass и дочерних, если таковые будут
		.pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
		// .pipe(autoprefixer({
		// 	overrideBrowserslist: ['last 8 versions'],
		// 	browsers: [
		// 		'Android >= 4',
		// 		'Chrome >= 20',
		// 		'Firefox >= 24',
		// 		'Explorer >= 11',
		// 		'iOS >= 6',
		// 		'Opera >= 12',
		// 		'Safari >= 6',
		// 	],}))
		.pipe(gulp.dest('css')) // Выгружаем результата в папку /css
});

gulp.task('watch', function () {
	console.log('Let is start, my friend:');
	console.log('  gulp ... ready!');
	console.log('  gulp-autoprefixer... ready!');
	console.log('  gulp-sass... ready!');
	gulp.watch('*.scss', gulp.parallel('sass')); // Наблюдение за sass файлами в папке sass
});
