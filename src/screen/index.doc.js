/**

Creates a new instance of this class.

@constructor Screen
@param screenConfig {ScreenConfig} A configuration object for a new instance of this class.

@classdesc

This is the class which simulates [Screen](https://www.w3.org/TR/cssom-view-1/#screen) in HTML DOM.

Screen represents information about the screen of the monitor device.

@prop availTop {number} The available top position of the rendering surface of the monitor device, in CSS pixels. This property is not specified in [CSSOM View Module](https://www.w3.org/TR/cssom-view-1/#screen), but is supported by most browsers.
@prop availLeft {number} The available left position of the rendering surface of the monitor device, in CSS pixels. This property is not specified in [CSSOM View Module](https://www.w3.org/TR/cssom-view-1/#screen), but is supported by most browsers.
@prop availWidth {number} The available width of the rendering surface of the monitor device, in CSS pixels.
@prop availHeight {number} The available height of the rendering surface of the monitor device, in CSS pixels.
@prop width {number} The width of the monitor device, in CSS pixels.
@prop height {number} The height of the monitor device, in CSS pixels.
@prop colorDepth {number} This value is always 24. This is useless but are included for compatiility.
@prop pixelDepth {number} This value is always 24. This is useless but are included for compatiility.

@public
*/

