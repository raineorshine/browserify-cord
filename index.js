/* A module for generating multiple browserify bundles.
({
  entries: any[],
  dest: string,
  src: string,
  extname?: string,
  plugin?: any[],
  log?: () => string,
}) => { update: () => void }
*/

const browserify = require('browserify')
const gulp = require('gulp')
const path = require('path')
const rename = require('gulp-rename')
const source = require('vinyl-source-stream')

const invoke = f => f()

module.exports = options => {
  options = options || {}
  options.extname = options.extname || '.bundle.js'
  options.log = options.log || console.log.bind(console)

  const bundlers = options.entries.map(entry => {

    function bundle() {
      return b.bundle()
        .on('error', options.log)
        .pipe(source(path.basename(entry)))
        .pipe(rename({ extname: options.extname }))
        .pipe(gulp.dest(path.join(options.dest, path.dirname(entry))))
    }

    const b = browserify({
      entries: [path.join(options.src, entry)],
      cache: {},
      packageCache: {},
      plugin: options.plugin
    })
      .on('update', bundle)
      .on('log', options.log)

    return bundle
  })

  return {
    update() {
      bundlers.forEach(invoke)
    }
  }
}
