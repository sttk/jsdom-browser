# [jsdom-browser][repo-url] [![Github.io][io-image]][io-url] [![NPM][npm-img]][npm-url] [![MIT Licenses][mit-img]][mit-url] [![Build Status][travis-img]][travis-url] [![Build Status][appveyor-img]][appveyor-url] [![Coverage Status][coverage-img]][coverage-url]

This module simulates behaviors of a Web browser with [jsdom](https://github.com/tmpvar/jsdom), and will provides implementations about layouts of view elements and windows.

> This module simulates Chrome on macOS for the time being, but is implemented so as to be configurable and extendable to other browsers.

## Install

```sh
$ npm install jsdom-browser --save-dev
```

## Usage

### Create a browser

```js
const Browser = require('jsdom-browser')
const browser = new Browser()
```

### Open a blank window

```js
const window0 = browser.newWindow()

window0.name = 'win0'
```

### Get a window config

```js
const windowConfig0 = browser.getConfig(window0)
windowConfig0.top = 200
windowConfig0.left = 300

window0.screenX // => 300
window0.screenY // => 200
```

### Get a window already opened

```js
window0 === browser.getWindow(0)  // by index
window0 === browser.getWidnow('win0') // by name
window0 === browser.getWindow(windowConfig0) // by window config
```

### Open a window with loading a page content

```js
browser.addContent('http://www.example.com', '<p>Hello!</p>')

const window1 = browser.openWindow('http://www.example.com')

window1.addEventListener('load', event => {
  // Called after loading content.
})

const config1 = browser.getConfig(window1)
config1.on('load', (err, win, cfg) => {
  // Called after loading content.
})
```

### Open a child window

```js
browser.addContent('http://sample.net', '<html> ... </html>')

const window2 = window.open('http://sample.net', '_blank', 'top=100,left=200,height=300,width=400')

window2.addEventListener('load', event => {
  // Called after loading content.
})

const config2 = browser.getConfig(window2)
config2.on('load', (err, win, cfg) => {
  // Called after loading content.
})
```

## Progress

- [Screen](https://www.w3.org/TR/cssom-view-1/#screen) &#x2713;
- [ScreenOrientation](https://www.w3.org/TR/screen-orientation/) *(Not yet)*
- [Window](https://www.w3.org/TR/cssom-view-1/#extensions-to-the-window-interface)
    - screen &#x2713;
    - innerWidth, innerHeight, outerWidth, outerHeight, screenX, screenY,
      devicePixelRatio &#x2713;
    - scrollX, scrollY, pageXOffset, pageYOffset &#x2713;
    - moveTo, moveBy, resizeTo, resizeBy &#x2713;
    - scroll, scrollTo, scrollBy  &#x2713;
    - open, close  &#x2713;
    - *matchMedia (Not yet)*
- And planning more HTMLElements ...

## References

- [CSSOM View Modules](https://www.w3.org/TR/cssom-view-1)
- [HTML Living Standard](https://html.spec.whatwg.org/multipage/)

## License

Copyright (C) 2017 Takayuki Sato

This program is free software under [MIT][mit-url] License.
See the file LICENSE in this distribution for more details.


[repo-url]: https://github.com/sttk/jsdom-browser/
[io-image]: http://img.shields.io/badge/HP-github.io-ff99cc.svg
[io-url]: https://sttk.github.io/jsdom-browser/
[npm-img]: https://img.shields.io/badge/npm-v0.5.1-blue.svg
[npm-url]: https://www.npmjs.org/package/jsdom-browser/
[mit-img]: https://img.shields.io/badge/license-MIT-green.svg
[mit-url]: https://opensource.org/licenses.MIT
[travis-img]: https://travis-ci.org/sttk/jsdom-browser.svg?branch=master
[travis-url]: https://travis-ci.org/sttk/jsdom-browser
[appveyor-img]: https://ci.appveyor.com/api/projects/status/github/sttk/jsdom-browser?branch=master&svg=true
[appveyor-url]: https://ci.appveyor.com/project/sttk/jsdom-browser
[coverage-img]: https://coveralls.io/repos/github/sttk/jsdom-browser/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/sttk/jsdom-browser?branch=master
