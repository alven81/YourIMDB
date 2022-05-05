# How to install gulp for new project

- Install dependencies:

``` JS
npm i -g gulp                       //install GULP package globaly
npm init                            //creating package.json
//npm i --save-dev gulp-autoprefixer  //install autoprefixer - not used in this project
npm i gulp-sass                     //install gulp-sass package
npm i -D sass                       //install sass package
npm ls --depth=0                    //to see what installed
```

- Creating `gulpfile.js`:

``` JS
// plug Gulp
var gulp = require('gulp'),
    //plug autoprefixer
    //autoprefixer = require('gulp-autoprefixer'),
    //plug Sass package
	sass = require('gulp-sass')(require('sass'));

gulp.task('sass', function(){
    // take .sass files from parent folder /sass and child folders, if they are there
	return gulp.src('*.scss')
        .pipe(sass().on('error', sass.logError))
        // .pipe(autoprefixer({
		// 	overrideBrowserslist: ['last 8 versions'],
		// 	browsers: [
		// 	  'Android >= 4',
		// 	  'Chrome >= 20',
		// 	  'Firefox >= 24',
		// 	  'Explorer >= 11',
		// 	  'iOS >= 6',
		// 	  'Opera >= 12',
		// 	  'Safari >= 6',
		// 	],
		//   }))
        // folder where put .css file
		.pipe(gulp.dest('css'))
});

gulp.task('watch', function() {
	gulp.watch('*.scss', gulp.parallel('sass'));
});
```

- For once compilation use:

``` js
gulp sass
```

- For continuous parsing use:

``` js
gulp watch
```

- For termination `-gulp watch use`:

```
ctrl+c
```

---

# How to install npm dependencies in a new folder:

- put in parent folder:

```
gulpfile.js
package.json
```

- install all dependencies from `package.json`:

```
-npm up
```

---

# Use sintaksis for functions:

- _`showMessage(..)`_     // show message
- _`getAge(..)`_          // return age value
- _`calcSum(..)`_         // calculate and return summ
- _`createForm(..)`_      // create form (and usually return it)
- _`checkPermission(..)`_ // check permirrion, and return true/false

---

_Sourse:_

- [https://abcinblog.blogspot.com](https://abcinblog.blogspot.com/2018/04/npm-gulp-sass.html)

- [https://webdesign-master.ru](https://webdesign-master.ru/blog/tools/2016-06-04-sass.html)

- [https://habr.com](https://habr.com/ru/post/560894/)

- [https://learn.javascript.ru](https://learn.javascript.ru/modifying-document/)

- [https://punkapi.com/](https://punkapi.com/documentation/v2)

https://github.com/billythekid/PunkApi/blob/master/README.md

https://www.openbrewerydb.org/documentation/01-listbreweries


https://github.com/openbrewerydb/openbrewerydb-gatsby/blob/master/content/documentation/01-listbreweries.md

https://rapidapi.com/SAdrian/api/data-imdb1/
---

##### © Aliaksandr Kot