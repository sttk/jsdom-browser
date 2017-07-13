/*
When the options `runScripts` of JSOM is specified, the properties of Window
such as `innerWidth`, `screenX`, etc. cannot be configured though their
property descriptors are configurable and writable.

This cause is due to processes as following codes:

```
(src/jsdom/api.js)
class JSDOM {
  constructor(input, options = {}) {
    this[window] = new Window(options.windowOptions);
  }
  get window () {
    return this[window]._globalProxy;
  }
}

(src/jsdom/lib/jsdom/browser/Window.js)
function Window(options) {
  this._runScripts = options.runScripts;
  if (this.runScripts === "outside-only" || this._runScripts === "dangerously") {
    contextifyWindow(this);
  }

  define(this, {
    name: "nodejs",
    innerWidth: 1024,
    ...
  });
}

(src/jsdom/lib/jsdom/browser/documentfeatures.js)
exports.contextifyWindow = window => {
  documentImpl._defaultView = window._globalProxy = vm.runInContext("this", window);
};
```

A published window object is not a window itself but its proxy object.
So if properties are defined into a window object which is not a proxy, they
cannot be configured from its proxy object.

To solve this issue, this module omits to define their properties into a window object itself.
*/
