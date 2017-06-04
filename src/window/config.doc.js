/**

@constructor WindowConfig
@param initConfig {object | WindowConfig} An object to initialize a new instance.
@desc

Creates a new instance of this class.

@classdesc

This is the class to configure a Window object provided by [jsdom](https://github.com/tmpvar/jsdom).

This class provides the properties and the methods for positioning, resizing, opening and closing to a Window object.

@prop screen {Screen} A `window.screen` object.
@prop width {number} The width of the window associated with this object.
@prop height {number} The height of the window associated with this object.
@prop frame.edgeSize.top {number} The top edge size if the associated window is a frame.
@prop frame.edgeSize.left {number} The left edge size if the associated window is a frame
@prop frame.edgeSize.right {number} The right edge size if the associated window is a frame.
@prop frame.edgeSize.bottom {number} The bottom edge size if the associated window is a frame.
@prop frame.minSize.width {number} The minimum width if the associated window is a frame.
@prop frame.minSize.height {number} The minimum height if the associated window is a frame.
@prop frame.minOpeningSize.width {number} The minimum width when a frame window opens.
@prop frame.minOpeningSize.height {number} The mininum height when a frame window opens.
@prop frame.minResizableSize.width {number} The minimum resizable width if the associated window is a frame.
@prop frame.minResizableSize.height {number} The minimum resizable height if the associated window is a frame.
@prop frame.openingShift.x {number} The horizontal shift size when a frame window opens.
@prop frame.openingShift.y {number} The vertical shift size when a frame window opens.
@prop popup.edgeSize.top {number} The top edge size if the associated window is a popup.
@prop popup.edgeSize.left {number} The left edge size if the associated window is a popup.
@prop popup.edgeSize.right {number} The right edge size if the associated window is a popup.
@prop popup.edgeSize.bottom {number} The bottom edge size if the associated window is a popup.
@prop popup.minSize.width {number} The minimum width if the associated window is a popup.
@prop popup.minSize.height {number} The minimum height if the associated window is a popup.
@prop popup.minOpeningSize.width {number} The minimum width when a popup window opens.
@prop popup.minOpeningSize.height {number} The minimum height when a popup window opens.
@prop popup.minResziableSize.width {number} The minimum resizable width if the associated window is a popup.
@prop popup.minResziableSize.height {number} The minimum resizable height if the associated window is a popup.
@prop popup.openingShift.x {number} The horizontal shift size when a popup window opens.
@prop popup.openingShift.y {number} The vertical shift size when a popup window opens.
@prop zoom {number} The zoom ratio of the associated window.
@prop minZoom {number} The minimum zoom ratio of the associated window.
@prop maxZoom {number} The maximum zoom ratio of the associated window.
@prop name {string} The name of the window associated with this object.
@prop closed {boolean} The closed flag of the window associated with this object.
@prop isFrameWindow {boolean} The flag to specify that the associated window is a frame or a popup.

@prop edgeSize.width {number} The horizontal edge size of the window associated with this object. This property switches the value by frame or popup.
@prop edgeSize.height {number} The vertical edge size of the window associated with this object. This property switches the value by frame or popup.
@prop minSize.width {number} The minimum width of the window associated with this object. This property switches the value by frame or popup.
@prop minSize.height {number} The minimum height of the window associated with this object. This property switches the value by frame or popup.
@prop minResizableSize.width {number} The minimum resizable width of the window associated with this object. This property switches the value by frame or popup.
@prop minResizableSize.height {number} The minimum resizable height of the window associated with this object. This property switches the value by frame or popup.
@prop minOpeningSize.width {number} The minimum width of the window associated with this object when opening. This property switches the value by frame or popup.
@prop minOpeningSize.height {number} The minimum height of the window associated with this object when opening. This property switches the value by frame or popup.
@prop isMovableByScript {boolean} The flag to specify that the window associated with this object is movable by script.
@prop isResizableByScript {boolean} The flag to specify that the window associated with this object is resizable by script.

@public
*/

/**

@method WindowConfig#on
@param eventName {string} A event name.
@param listener {function} A event listener.
@desc

Adds an event listener called as executing the specified window operation.

@public
*/

/**

@method WindowConfig#once
@param eventName {string} A event name.
@param listener {function} A event listener.
@desc

Adds an event listener called once as executing the specified window operation.

@public
*/

/**

@method WindowConfig#configure
@param window {Window} A Window object to be configured by this object.
@desc

Configures a Window object.

@public
*/
