/**

@constructor ContentManager
@desc

Creates a new instnaceof this class.

@classdesc

This class manages page contents to be loaded by windows.

This class has a map of URLs and page contents so as to be able to get a page content by a URL.

*/

/**

@method ContentManager#add
@param url {string} An URL string.
@param content {object|string} A plain object which has informations about a page content, or a HTML/XML string of page content.
@return {Void}
@desc

Adds a page content associated with a URL.

*/

/**

@method ContentManager#get
@param url {string} An URL string.
@return {object} A plain object which has informations of a page content
@desc

Gets a page content associated with the specified URL.

*/
