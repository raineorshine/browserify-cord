# browserify-cord
[![npm version](https://img.shields.io/npm/v/browserify-cord.svg)](https://npmjs.org/package/browserify-cord)

A module for generating multiple browserify bundles with gulp.

## Install

```sh
$ npm install --save-dev browserify-cord
```

## Usage

```js
import * as Cord from 'browserify-cord'

const cord = Cord({
  entries: ['public/main.js'], // relative to 'src'
  src: 'src'
  dest: 'app',
  plugin: [watchify, tsify]
})

gulp.task('js', done => {
  cord.update()
  done()
})
```

## License

ISC © [Raine Revere](https://github.com/raineorshine)
