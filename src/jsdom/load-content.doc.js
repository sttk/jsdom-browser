/**
@function promiseToLoadContent
@param window {Window} The Window object which will load the content.
@param url {string} The URL string of the loaded content.
@param content {string | object} A content string or a content object.
@return {Promise} A Promise object for an acynchronous load operation.
@desc
Loads a content into the specified window.

The 3rd argument *content* can be specified either a string or a plain object of which properties is as follows:

- `contentData` {string} A content string.
- `lastModified` {string} A date string of which format is 'MM/dd/yyyy HH24:mm:ss'.
- `contentType` {string} A content MIME type. (default is 'text/html')
- `encoding` {string} An encoding of a content string. (default is 'UTF-8')

This function returns a Promise object which represents an asynchronous operation of success or failure of loading a content. If the loading is success, the Promise executes *resolve* function with no argument by its `then` method. Otherwise, the Promise executes *reject* function with an Error object as an argument by its `catch` method.
*/
