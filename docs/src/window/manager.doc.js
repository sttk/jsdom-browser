/**
@constructor WindowManager
@desc
Creates a new instance of this class.

@classdesc
This class manages Window objects and WindowConfig objects.

This class has maps of Windows and WindowConfigs, which make possible to get a Window with a WindowConfig and to get a WindowConfig with a Window.

This class also has an array of Windows, and a map of names and Windows. So it is possible to get a Window with entry index, and to get a Window with its name.

@prop count {number} The number of Windows stored in this object.
*/

/**
@method WindowManager#get
@param key {number | string | WindowConfig } A key to get a Window.
@return {Window} A Window object indentified by *key*.
@desc
This method gets a Window stored in this manager object.

If *key* is a number, this method regards it as a order of Window entry which is 0 origin. If *key* is a string, this method regards it as a Window name. And if *key* is a WindowConfig object, this method finds a Window associated with the WindowConfig object.

If there is no Window identified by *key*, this method returns a nullish.
*/

/**
@method WindowManager#getConfig
@param window {Window} A Window object to be wanted to get its WindowConfig object.
@return {WindowConfig} A WindowConfig object associated with the specified Window object.
@desc
This method gets a WindowConfig object which is associated with the Window object specified as the argument.
*/

/**
@method WindowManager#set
@param window {Window} A Window object to be entered.
@param config {WindowConfig} A WindowConfig object to be entered.
@return {Void}
@desc
This method stores a mapping of a Window object and a WindowConfig object into this manager object.
*/
