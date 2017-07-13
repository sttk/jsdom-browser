/**
@function configureOpening
@param window {Window} A Window object to be configured about opening/closing.
@param browser {Browser} An object which represents a Web browser and has a base {@link WindowConfig} object, a {@link WindowManager} object, a {@link ContentManager} object and {@link BrowserOptions} as its properties.
@return Void
@desc
This function configures a Window object to attach `window.open` and `window.close` methods.
*/

/**
@function newWindow
@param browser {Browser} An object which represents a Web browser and has a base {@link WindowConfig} object, a {@link WindowManager} object, a {@link ContentManager} object and {@link BrowserOptions} as its properties.
@return Window
@desc
This function creates a new blank window.
And this function creates a {@link WindowConfig} object, associates it with the window, and enters them to a {@link WindowManager} object.
*/

/**
@function openWindow
@param url {string} An URL string. A page content to be loaded is gotten from a {@link ContentManager} object in `managerSet` by this URL.
@param browser {Browser} An object which represents a Web browser and has a base {@link WindowConfig} object, a {@link WindowManager} object, a {@link ContentManager} object and {@link BrowserOptions} as its properties.
@return Window
@desc
This function creates a new window and load a page content into the window.
And this function creates a {@link WindowConfig} object, associates it with the window, and enters them to a {@link WindowManager} object.
*/
