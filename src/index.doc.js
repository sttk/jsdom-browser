/**

Creates a new instance of this class.

@constructor Browser
@param initConfig {object | Browser} An object to initialize an instance of this class.

@classdesc

This is a class which represents a Web browser.
The instance of this class can opens and manages multiple windows.

@public
*/
/*

@prop windowManager {WindowManager} Manages windows created in this browser.
@prop contentManager {ContentManager} Manages page contents associated with URLs.
@prop windowConfig {WindowConfig} The base object of {@link WindowConfig}.
@prop screenConfig {ScreenConfig} The config object of the screen which is shared by windows.

*/

/**

@method Browser#getConfig
@param object {Any} An configured object like a {@link Window} object or a {@link Screen} object.
@return {object} A config object like a {@link WindowConfig} object or a {@link ScreenConfig} object.
@desc

Gets the config object which is associated with the specified object.

@public
*/

/**

@method Browser#addContent
@param url {string} An URL string which is mapped to the `content`.
@param content {object|string} A page content. This is an object which contains a content HTML/XML string and its properties, or a HTML/XML string.
@return {Void}

@public
*/

/**

@method Browser#newWindow
@return {Window} A new winow which has a blank page.
@desc

Creats a new blank window.

@public
*/

/**

@method Browser#openWindow
@param url {strng} A URL string.
@return {Window} A new window which promises to load the page content mapped to the `url`.
@desc

Creatss a new window and loads the page content mapped to the specified URL with `{@link Browser#addContent}`.

Loading content is processed asynchronously. The event of completion of loading is able to caught by {@link WindowConfig#on} or {@link WindowConfig#once}.

@public
*/
