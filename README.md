# [jsdom-browser][repo-url] [![MIT Licenses][mit-img]][mit-url]
===========================

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
const browser = require('jsdom-browser')

let document = jsdom('', {
  created(err, window) {
    browser.simulate(window)
  }
})
```

If you want to simulate a browser you configure,

```js
const jsdom = require('jsdom')
const browser = require('jsdom-browser')

// Create your browser configurations
let browserConfig = new browser.BrowserConfig({
  window: ...
})

let document = jsdom('', {
  created(err, window) {
    browser.simulate(window, browserConfig)
  }
})
```

## Progress

- [Window](https://www.w3.org/TR/cssom-view-1/#extensions-to-the-window-interface)
    - screen &#x2713;
    - *innerWidth, innerHeight, outerWidth, outerHeight, screenX, screenY,
      devicePixelRatio (Not yet)*
    - *scrollX, scrollY, pageXOffset, pageYOffset (Not yet)*
    - *moveTo, moveBy, resizeTo, resizeBy (Not yet)*
    - *scroll, scrollTo, scrollBy (Not yet)*
    - *matchMedia (Not yet)*


## API

#### <u>*browser***.simulate(window [, browserConfig])**</u>

Is the function that attaches properties and functions to HTML elements for simulating the behaviors of a Web browser.

**Parameters:**

* window [Window] : A [Window](https://www.w3.org/TR/cssom-view-1/#extensions-to-the-window-interface) object.
* browserConfig [object] : A [BrowserConfig](#id-BrowserConfig) object. (optional)

<a name="id-BrowserConfig"></a>
#### <u>*browser***.BrowserConfig**</u>

Is the class to configure HTML elements.
This class binds all configuring objects corresponding with HTML elements.

**Properties:**

* **windowConfig** [WindowConfig] : A [WindowConfig](#id-WindowConfig) object.

**Functions:**

* *constructor*({ windowConfig })


<a name="id-WindowConfig"></a>
#### <u>*browser***.WindowConfig**</u>

Is the class to configure the behaviors of a Window object.

**Properties:**

* **screenConfig** [ScreenConfig] : A [ScreenConfig](#id-ScreenConfig) object.
* **screen** [Screen] : A [Screen](https://www.w3.org/TR/cssom-view-1/#screen) object.

**Functions:**

* *constructor*({ screenConfig, screen })

* **getPropertyDescriptors()**

    Is the function that returns name-descriptor map about Window's properties.

    **Returns:** [object]
    
    An object which maps between property names and property descriptors about Window object.


<a name="id-ScreenConfig"></a>
#### <u>*browser***.ScreenConfig**</u>

Is the class to configure the behaviors of a Screen object.

**Properties:**

* **width** [number] : The full width of the screen. [px]
* **height** [number] : The full height of the screen. [px]
* **availWidth** [number] : The available width of the screen. [px]
* **availHeight** [number] : The available height of the screen. [px]
* **availLeft** [number] : The available left position of the screen. [px]
* **availTop** [number] : The available top position of the screen. [px]

**Functions:**

* *constructor*()

* **getPropertyDescrptors()**

    Is the function that returns name-descriptor map about Screen's properties.

    **Returns:** [object]
    
    An object which maps between property names and property descriptors about Screen object.

## References

- [CSSOM View Modules](https://www.w3.org/TR/cssom-view-1)
- [HTML Living Standard](https://html.spec.whatwg.org/multipage/)


## License

Copyright (C) 2017 Takayuki Sato

This program is free software under [MIT][mit-url] License.
See the file LICENSE in this distribution for more details.


[repo-url]: https://github.com/sttk/jsdom-browsers/
[mit-img]: https://img.shields.io/badge/license-MIT-green.svg
[mit-url]: https://opensource.org/licenses.MIT
[travis-img]: https://travis-ci.org/sttk/jsdom-browser.svg?branch=master
[travis-url]: https://travis-ci.org/sttk/jsdom-browser
[appveyor-img]: https://ci.appveyor.com/api/projects/status/github/sttk/jsdom-browser?branch=master&svg=true
[appveyor-url]: https://ci.appveyor.com/project/sttk/jsdom-browser
[coverage-img]: https://coveralls.io/repos/github/sttk/jsdom-browser/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/sttk/jsdom-browser?branch=master
