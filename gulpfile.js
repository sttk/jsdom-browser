'use strict'

const gulp = require('gulp')
const fun = require('gulp-fun-style')
const eslint = require('gulp-eslint')
const plumber = require('gulp-plumber')
const mocha = require('gulp-spawn-mocha')

const jsdiff = require('diff')
const fs = require('fs')
const path = require('path')


let srcfiles = ['src/**/*.js']
let jsonfiles = ['src/**/*.json']
let testfiles = ['test/**/*.js']

fun.lint = () =>
  gulp.src([].concat(srcfiles, testfiles))
      .pipe(plumber())
      .pipe(eslint())
      .pipe(eslint.format())

fun.lint.description = 'Lint js source files.'


fun.test = () =>
  gulp.src(testfiles)
      .pipe(plumber())
      .pipe(mocha())

fun.test.description = 'Run the unit tests.'


fun.coverage = () =>
  gulp.src(testfiles)
      .pipe(plumber())
      .pipe(mocha({ istanbul: true }))

fun.coverage.description = 'Measure the coverage of the unit tests.'


fun.watch = {
  watch: [].concat(srcfiles, jsonfiles, testfiles),
  call: [['lint', 'coverage']]
}

fun.watch.description = 'Watch file changes, then lint and test'


fun.patch = () => {
  const opts = { encoding: 'utf-8' }
  const targetFile = './node_modules/jsdom/lib/jsdom.js'
  const sourceFile = './node_modules/jsdom/lib/jsdom.js.orig'
  fs.renameSync(targetFile, sourceFile)

  const patchFile = './patch/jsdom.patch'
  const source = fs.readFileSync(sourceFile, opts)
  const patch = jsdiff.parsePatch(fs.readFileSync(patchFile, opts))
  const result = jsdiff.applyPatch(source, patch)
  fs.writeFileSync(targetFile, result, opts)
}
fun.patch.description = 'Patch for jsdom.'
