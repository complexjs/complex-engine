"use strict";

/**
 * @class cxComponent
 */
module.exports = class cxComponent {
    constructor () {
        /**
         * @property tag
         * @type {String}
         */
        this.tag = null;
    }

    /**
     * get tag
     * @method getTag
     * @return {String}
     */
    getTag () {
        return this.tag;
    }
}
