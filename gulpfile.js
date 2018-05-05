'use strict'

const gulp = require('gulp')
const eslint = require('gulp-eslint')
const plumber = require('gulp-plumber')
const mocha = require('gulp-spawn-mocha')
const jsdoc = require('gulp-jsdoc3')
const ghelp = require('gulp-showhelp')

var srcs = ['src/**/*.js', 'test/**/*.js']
var tests = srcs.concat(['src/**/*.json'])
var docs = ['docs/**/*.js', 'README.md']

gulp.task('help', done => {
  ghelp.show()
  done()
}).help = 'Show help message.'

gulp.task('lint', () => {
  return gulp.src(srcs)
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
}).help = 'Lint js source files.'

gulp.task('mkdoc', done => {
  gulp.src(docs)
    .pipe(plumber())
    .pipe(jsdoc(require('./.jsdoc.json'), done))
}).help = 'Create API document.'

gulp.task('test', () => {
  return gulp.src(tests)
    .pipe(plumber())
    .pipe(mocha())
}).help = 'Run the unit tests.'

gulp.task('coverage', () => {
  return gulp.src(tests)
    .pipe(plumber())
    .pipe(mocha({ istanbul: true }))
}).help = 'Measure the coverage of the unit tests.'


function watch_for_test() {
  return gulp.watch(srcs, gulp.series('lint', 'test'))
}

function watch_for_doc() {
  return gulp.watch(docs, gulp.series('mkdoc'))
}

gulp.task('watch', gulp.parallel(watch_for_test, watch_for_doc))
  .help = 'Watch file changes, then lint, test or jsdoc'


gulp.task('default', gulp.series('lint', 'coverage', 'mkdoc'))
  .help = 'Default task: lint & coverage & mkdoc'
