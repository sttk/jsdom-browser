## WindowConfig class

extends [ClassConfigBase](https://github.com/sttk/class-config-base)

**WindowConfig** is the class to configure the object simulating [Window](https://www.w3.org/TR/cssom-view-1/#extensions-to-the-window-interface) in HTML DOM.

This class has structured properties to determine appearance and behaviors of a frame/popup window.

### The full structure of WindowConfig properties

* **WIndowConfig**
    * **screen** [Screen]
    * **top** [number] 
    * **left** [number]
    * **width** [number]
    * **height** [number]
    * **frame**
        * **edgeSize**
            * **top** [number]
            * **left** [number]
            * **right** [number]
            * **bottom** [number]
        * **minSize**
            * **width** [number]
            * **height** [number]
        * **minOpeningSize**
            * **width** [number]
            * **height** [number]
        * **minResizableSize**
            * **width** [number]
            * **height** [number]
        * **openingShift**
            * **x** [number]
            * **y** [number]
    * **popup**
        * **edgeSize**
            * **top** [number]
            * **left** [number]
            * **right** [number]
            * **bottom** [number]
        * **minSize**
            * **width** [number]
            * **height** [number]
        * **minOpeningSize**
            * **width** [number]
            * **height** [number]
        * **minResizableSize**
            * **width** [number]
            * **height** [number]
        * **openingShift**
            * **x** [number]
            * **y** [number]

    * **zoom** [number]
    * **minZoom** [number]
    * **maxZoom** [number]
        