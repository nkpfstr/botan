'use strict'

// Import dependencies
const gulp = require('gulp')
const fs = require('fs-extra')
const yaml = require('js-yaml')
const metalsmith = require('metalsmith')
const collections = require('metalsmith-collections')
const markdown = require('metalsmith-markdown')
const permalinks = require('metalsmith-permalinks')
const layouts = require('metalsmith-layouts')
const sitemap = require('metalsmith-mapsite')
const rss = require('metalsmith-feed')

// Import configuration file
const data = yaml.safeLoad(fs.readFileSync('./botan.yml', 'utf-8'))

// Build site pages and content
function content (done) {
  metalsmith(__dirname)
    .metadata(data) // Add site config to metadata
    .source('_content') // Process files in this folder
    .destination('docs') // Output files in this folder
    .clean(true) // Empty destination folder before building files
    .use(collections({ // Group related content for easy access later
      blog: 'blog/*.md',
      projects: 'projects/*.md'
    }))
    .use(markdown({ // Process Markdown files
      smartypants: true
    }))
    .use(permalinks({ // Add pretty permalinks
      relative: false
    }))
    .use(layouts({ // Wrap content with Handlebars templates
      engine: 'handlebars',
      default: 'default.hbs',
      directory: './_templates',
      partials: './_templates/partials'
    }))
    .use(sitemap(data.site.url)) // Generate a sitemap
    .use(rss({ // Generate RSS feeds for collections
      collection: 'blog'
    }))
    .build(err => {
      if (err) throw err
    })

  // Signal async completion
  done()
}

// Define build process
let botan = gulp.series(content)

// Bingo, bingo, you win the prize!
gulp.task('default', botan)
