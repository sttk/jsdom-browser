/**
@function createBlankWindow
@param name {string} The window name. (optional, default is '')
@param opener {Window} An opener window (optional)
@param opts {object} An JSDOM options. (optional)
@return {Window} A new Window object
@desc
Create a blank window of which URL is 'about:blank'.

If *name* is neither a string nor nullish, the window name become a string by *String(name)*.

The 2nd argument is an opener window and its `location.href` and `document.referrer` are used for constructing JSDOM. But if it is not a Window object and the 3rd argument is not specified, it is dealt as a JSDOM options.
*/

