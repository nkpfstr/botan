'use strict'

// Import dependencies
const gulp = require('gulp')
const markdown = require('gulp-markdown')

// Turn Markdown into content
gulp.task('markdown', () => {
  return gulp.src('_content/**/*.md')
    .pipe(markdown())
    .pipe(gulp.dest('./docs'))
})

gulp.task('default', ['markdown'])
