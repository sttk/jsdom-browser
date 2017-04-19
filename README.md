# [jsdom-browser][repo-url] [![NPM][npm-img]][npm-url] [![MIT Licenses][mit-img]][mit-url] [![Build Status][travis-img]][travis-url] [![Build Status][appveyor-img]][appveyor-url] [![Coverage Status][coverage-img]][coverage-url]

Web browser simulator with jsdom.

---

**NOTE:** *Because of the issue ＃1720 in jsdom, jsdom cannot configure the properties of `Window` object. 
As a temporary treatment, you can resolve this issue by modifying `lib/jsdom.js` in jsdom as follows:*

```
(jsdom/lib/jsdom.js)
132   const documentImpl = idlUtils.implForWrapper(window.document);
133   documentFeatures.applyDocumentFeatures(documentImpl, options.features);
134
135   if (options.created) {
136     options.created(null, window.document.defaultView);
137   }
```
 　　　　　　　　　　　　↓
 
```
132   if (options.created) {
133     options.created(null, window.document.defaultView);
134   }
135
136   const documentImpl = idlUtils.implForWrapper(window.document);
137   documentFeatures.applyDocumentFeatures(documentImpl, options.features);
```

---

## Install

```js
npm install sttk/jsdom-browser --save-dev
```


## Usage

For simulating default browser's behaviors,

```js
const jsdom = require('jsdom')
const Browser = require('jsdom-browser')

const browser = new Browser()
const window = jsdom('', {
  created(err, window) {
    browser.simulate(window)
  }
}).defaultView
```

If you want to simulate a browser that you configure,

```js
const jsdom = require('jsdom')
const Browser = require('jsdom-browser')

// Create your browser configurations
const browserConfig = {
  screenConfig: { ... },
}

const browser = new Browser(browserConfig)

const window = jsdom('', {
  created(err, window) {
    browser.simulate(window)
  }
}).defaultView
```

## Configuring

`Browser` can be configured with its constructor's argument, which is a plain object or a `Browser` object. The format of the plain objec and it is as follows:

* **screenConfig** [object] : An object to configure a `Screen` object.
    * **width** [number] : Width of the screen.
    * **height** [number] : Height of the screen.
    * **availTop** [number] : Available position from top side of the screen.
    * **availLeft** [number] : Available position from left side of the screen.
    * **availRight** [number] : Available position from right side of the screen.
    * **availBottom** [number] : Available position from bottom side of the screen.

Following code is an example of configuring a `Browser` object:

```js
const browserConfig =  {
  screenConfig: {
    width: 2048, height: 1024,
    availTop: 4, availLeft: 5, availRight: 5, availBottom: 40,
  },
}

const browser = new Browser(browserConfig)
```

### Configuring the `window.screen`

The properties of `browser.screenConfig` is same with **screenConfig** above.
Though the properties of `window.screen` are read only, you can change their values with `browser.screenConfig`.

```js
window.screen.width // => 2048
window.screen.height // => 1024

browser.screenConfig.width = 1280
browser.screenConfig.height = 1000

window.screen.width // => 1280
window.screen.height // => 1000
```

## API

### <u>*constructor* ([ browserConfig ])</u>

Constructs a `Browser` instance.

**Parameters:**

* **browserConfig** [ object ] : A plain object  or a `Browser` object of which the properties are needed to simulate a target browser. (optional)

### <u>simulate (window) => Void</u>

Configures a `Window` object and its descendant objects to simulate a Web browser.

**Parameters:**

* **window** [object] : A `Window` object created by **jsdom**.

## Progress

- [Window](https://www.w3.org/TR/cssom-view-1/#extensions-to-the-window-interface)
    - screen &#x2713;
    - *innerWidth, innerHeight, outerWidth, outerHeight, screenX, screenY,
      devicePixelRatio (Not yet)*
    - *scrollX, scrollY, pageXOffset, pageYOffset (Not yet)*
    - *moveTo, moveBy, resizeTo, resizeBy (Not yet)*
    - *scroll, scrollTo, scrollBy (Not yet)*
    - *matchMedia (Not yet)*

## References

- [CSSOM View Modules](https://www.w3.org/TR/cssom-view-1)
- [HTML Living Standard](https://html.spec.whatwg.org/multipage/)


## License

Copyright (C) 2017 Takayuki Sato

This program is free software under [MIT][mit-url] License.
See the file LICENSE in this distribution for more details.


[repo-url]: https://github.com/sttk/jsdom-browser/
[npm-img]: https://img.shields.io/badge/npm-v0.2.0-blue.svg
[npm-url]: https://www.npmjs.org/package/jsdom-browser/
[mit-img]: https://img.shields.io/badge/license-MIT-green.svg
[mit-url]: https://opensource.org/licenses.MIT
[travis-img]: https://travis-ci.org/sttk/jsdom-browser.svg?branch=master
[travis-url]: https://travis-ci.org/sttk/jsdom-browser
[appveyor-img]: https://ci.appveyor.com/api/projects/status/github/sttk/jsdom-browser?branch=master&svg=true
[appveyor-url]: https://ci.appveyor.com/project/sttk/jsdom-browser
[coverage-img]: https://coveralls.io/repos/github/sttk/jsdom-browser/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/sttk/jsdom-browser?branch=master

