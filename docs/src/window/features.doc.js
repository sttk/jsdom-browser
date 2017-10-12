/**
@function parseFeatures
@param features {string} A string of features which is a set of name-value pairs.
@return {object} A plain object which has properties of parsed features.
@desc
Parses a string of features.

A string of features is same with the 3rd argument of `window.open`, and is a set of name-value pairs associated with '=', and these pairs are concatenated with ','.

The value of each feature is always a number. If a value is 'yes' or 'no' in a string of the argument, it is converted to 1 or 0.
*/

/**
@function applyFeatures
@param windowConfig {WindowConfig} A WindowConfig object to be applied the features
@param features {object} A plain object which contains the features.
@param isNewWindow {boolean} True if the window associated with the specified WindowConfig object is created newly.
@return {Void}
@desc
Applys features to a `WindowConfig` object.

This features is a plain object parsed a string which is same with the 3rd argument of `window.open`.
*/
