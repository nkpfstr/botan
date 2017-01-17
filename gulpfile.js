'use strict'

// Import dependencies
const gulp = require('gulp')
const markdown = require('gulp-markdown')
const pug = require('gulp-pug')
const config = require('./config')

// Turn Markdown into content
gulp.task('markdown', () => {
  return gulp.src('_content/**/*.md')
    .pipe(markdown())
    .pipe(gulp.dest('./docs'))
})

// Turn Pug into HTML
gulp.task('templates', () => {
  return gulp.src('_templates/**/*.pug')
     .pipe(pug({
       data: config,
       pretty: true
     }))
     .pipe(gulp.dest('./docs'))
})

gulp.task('default', ['markdown', 'templates'])
