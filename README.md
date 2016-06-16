# browserify-cord
[![npm version](https://img.shields.io/npm/v/browserify-cord.svg)](https://npmjs.org/package/browserify-cord)
[![Build Status](https://travis-ci.org/raineorshine/browserify-cord.svg?branch=master)](https://travis-ci.org/raineorshine/browserify-cord)

A module for generating multiple browserify bundles with gulp.'

## Install

```sh
$ npm install --save-dev browserify-cord
```

## Usage

```js
import * as Cord from 'browserify-cord'

const cord = Cord({
  entries: ['./src/public/main.js'],
  dest: './app/public/scripts'
})

gulp.task('js', done => {
  cord.update()
  done()
})
```

## License

ISC © [Raine Revere](https://github.com/raineorshine)
