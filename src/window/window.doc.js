/**
@public
@class Window
@desc
This Window object is created using by [JSDOM](https://github.com/tmpvar/jsdom), and attached the properties and the methods related to opening, closing, resizing and moving.

To open a new window, use {@link Browser#newWindow} or {@link Browser#openWindow}.

@classdesc
This is the class which simulates [Window](https://www.w3.org/TR/cssom-view-1/#extensions-to-the-window-interface`) in HTML DOM.

@prop screen {Screen} A {@link Screen} object.
@prop innerWidth {number} The inner width of this window about the window edge.
@prop innerHeight {number} The inner height of this window about the window edge.
@prop scrollX {number} The horizontal scroll position of the page in this window.
@prop scrollY {number} The vertical scroll position of the page in this window.
@prop pageXOffset {number} The horizontal scroll position of the page in this window.
@prop pageYOffset {number} The vertical scroll position of the page in this window.
@prop screenX {number} The horizontal window position.
@prop screenY {number} The vertical window position.
@prop outerWidth {number} The full width of this window.
@prop outerHeight {number} The full height of this window.
@prop devicePixelRatio {number} The zooming ratio of the page in this window.
@prop closed {boolean} The flag which is true if this window is closed.
@prop name {string} The window name.
*/

/**
@public
@method Window#moveTo
@param x {number} The horizontal position of this window after moving.
@param y {number} The vertical position of this window after moving.
@return {Void}
@desc

Moves this window position.
This method is effective when this window is a popup.
*/

/**
@public
@method Window#moveBy
@param dx {number} The horizontal moving size of this window.
@param dy {number} The vertical moving size of this window.
@return {Void}
@desc
Moves this window by relative position from the current position of this window.
This method is effective when this window is a popup.
*/

/**
@public
@method Window#resizeTo
@param w {number} The width of this window after resizing. 
@param h {number} The height of this window after resizing.
@return {Void}
@desc
Resizes this window size.
This method is effective when this window is a popup.
*/

/**
@public
@method Window#resizeBy
@param dw {number} The resizing width of this window.
@param dh {number} The resizing height of this window.
@return {Void}
@desc
Resizes this window size by relative size from the current size of this window.
This method is effective when this window is a popup.
*/

/**
@public
@method Window#scroll
@param x {number} The horizontal scroll position after scrolling.
@param y {number} The vertical scroll position after scrolling.
@return {Void}
@desc
Scrolls the page in this window.
*/

/**
@public
@method Window#scrollTo
@param x {number} The horizontal scroll position after scrolling.
@param y {number} The vertical scroll position after scrolling.
@return {Void}
@desc
Scrolls the page in this window.
*/

/**
@public
@method Window#scrollBy
@param dx {number} The horizontal scrolling size.
@param dy {number} The vertical scrolling size.
@return {Void}
@desc
Scrolls the page in this window. The scroll size is relative position from the current scroll position.
*/

/**
@public
@method Window#close
@return {Void}
@desc
Closes this window.
*/

/**
@public
@method Window#open
@param url {string} An URL string of a page content.
@param target {string} A window name or a keyword which is either `_blank`, `_self`, `_parent` or `_top`.
@param features {string} A set of comma separated strings which specify position, size and styles of a new window.
@return {Window} A window which is created or selected.
@desc
Opens a window which is indicated by `target` or a new window.

In addition, loads the page content indicated by `url` if `url` is not empty.
*/
