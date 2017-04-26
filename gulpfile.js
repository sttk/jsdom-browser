'use strict'

const gulp = require('gulp')
const fun = require('gulp-fun-style')
const eslint = require('gulp-eslint')
const plumber = require('gulp-plumber')
const mocha = require('gulp-spawn-mocha')

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

