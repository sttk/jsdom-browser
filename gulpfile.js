'use strict'

const gulp = require('gulp')
const fun = require('gulp-fun-style')
const eslint = require('gulp-eslint')
const plumber = require('gulp-plumber')
const mocha = require('gulp-spawn-mocha')
const jsdoc = require('gulp-jsdoc3')

fun.lint = () =>
  gulp.src(['src/**/*.js', '!src/**/*.doc.js'])
      .pipe(plumber())
      .pipe(eslint())
      .pipe(eslint.format())

fun.lint.description = 'Lint js source files.'


fun.jsdoc = done =>
  gulp.src(['src/**/*.doc.js', 'README.md'])
      .pipe(plumber())
      .pipe(jsdoc(require('./.jsdoc.json'), done))

fun.jsdoc.description = 'Create API document.'


fun.test = () =>
  gulp.src(['src/**/*.test.js'])
      .pipe(plumber())
      .pipe(mocha())

fun.test.description = 'Run the unit tests.'


fun.coverage = () =>
  gulp.src(['src/**/*.test.js'])
      .pipe(plumber())
      .pipe(mocha({ istanbul: true }))

fun.coverage.description = 'Measure the coverage of the unit tests.'


fun.watch_test = {
  watch: ['src/**/*.js', '!src/**/*.doc.js', 'src/**/*.json'],
  call: [['lint', 'coverage']]
}


fun.watch_doc = {
  watch: ['src/**/*.doc.js', 'README.md'],
  call: [['jsdoc']]
}


fun.watch = ['watch_test', 'watch_doc']

fun.watch.description = 'Watch file changes, then lint, test or jsdoc'

