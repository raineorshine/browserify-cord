/* A module for generating multiple browserify bundles.
({
  entries: any[],
  dest: string,
  extname?: string,
  log?: () => string
}) => { update: () => void }
*/

const browserify = require('browserify')
const gulp = require('gulp')
const path = require('path')
const rename = require('gulp-rename')
const source = require('vinyl-source-stream')
const watchify = require('watchify')

const invoke = f => f()

module.exports = options => {
  options = options || {}
  options.extname = options.extname || '.bundle.js'
  options.log = options.log || console.log.bind(console)

  const bundlers = options.entries.map(entry => {

    function bundle() {
      b.bundle()
      .on('error', options.log)
      .pipe(source(path.basename(entry)))
      .pipe(rename({ extname: options.extname }))
      .pipe(gulp.dest(options.dest))
    }

    const b = browserify({
      entries: [entry],
      cache: {},
      packageCache: {},
      plugin: [watchify]
    })
    b.on('update', bundle)
    b.on('log', options.log)

    return bundle
  })

  return {
    update() {
      bundlers.forEach(invoke)
    }
  }
}
