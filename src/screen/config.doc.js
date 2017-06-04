/**

Creates a new instance of this class.

@constructor ScreenConfig
@param initConfig {object | ScreenConfig} An object to initialize a new
  instance.

@classdesc

<b>extends [ClassConfigBase](https://github.com/sttk/class-config-base.git)</b>

This is the class to configure an object which simulates [Screen](https://www.w3.org/TR/cssom-view-1/#screen) in HTML DOM.

An instance of this class represents a configuration of a monitor device on which a Web browser is displayed.

@prop width {number} Full width of a monitor device.
@prop height {number} Full height of a monitor device.
@prop availTop {number} Top position of available area from top side of a monitor device.
@prop availLeft {number} Left position of available area from left side of a monitor device.
@prop availRight {number} Right position of available area from right side of a monitor device.
@prop availBottom {number} Bottom position of available area from bottom side of a monitor device.

@public
*/

/**

Configures a Screen object and associates it with this object.

@method ScreenConfig#configure
@param screen {Screen} a screen object to be configured.
@return {Void}

@public
*/
