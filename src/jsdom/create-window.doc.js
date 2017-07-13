/**
@function createBlankWindow
@param name {string} The window name. (default is '')
@param opts {object|Window} An object which has properties `.referrer` and `.userAgent`, or an opener window.
@return {Window} A new Window object
@desc
Create a blank window of which URL is 'about:blank'.

If *name* is neither a string nor nullish, the window name become a string by *String(name)*.

If the 2nd argument is an {@link Window} object, its URL, userAgent and itself is set to referrer, userAgent and opener of the new window.
*/

